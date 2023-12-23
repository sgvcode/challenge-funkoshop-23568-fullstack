const ItemsService = require('../services/itemServices');
const LicenceService = require('../services/licenceService');
const itemModel = require('../models/itemModel');

const shopControllers = {
    shopView: async (req, res) => {
        try {
            // Definir los parametros de consulta
            const { page = 1, limit = 9 } = req.query;

            // Obtener la licencia seleccionada desde la consulta
            const selectedLicence = req.query.licence;

            let items; // Variable que almacena la cantidad de productos
            let totalPages; // Variable para almacenar el número total de páginas

            if (selectedLicence) {
                // Si hay una licencia seleccionada, obtener productos filtrados por licencia
                const licencedItems = await itemModel.getAllItemsLicences(selectedLicence);
                items = licencedItems.data;
            } else {
                // Si no hay licencia seleccionada, obtener datos paginados de todos los productos
                const paginatedItems = await ItemsService.getPaginated(page, limit);
                items = paginatedItems.data;
                totalPages = paginatedItems.totalPages;
            }

            // Obtener todas las licencias para mostrar en el formulario de búsqueda
            const licences = await LicenceService.getAllItemsLicences();

            // Renderizar la página con los productos y las licencias
            res.render('../views/shop/shop', {
                view: {
                    title: "Shop | Funkoshop"
                },
                items,
                licences: licences.data,
                totalPages: totalPages || 1,
                currentPage: parseInt(page),
            });
        } catch (error) {
            console.error('Error en shopView:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    itemView: async (req, res) => {
        try {
            const id = req.params.id;
            const itemResponse = await ItemsService.getItem(id);
            const allItemsResponse = await ItemsService.getAllItems();

            const { data: item } = itemResponse;
            const { data: allItems } = allItemsResponse;

            // Verificar si el item está definido
            if (!item || !item[0]) {
                console.error(`Error: No se encontró el producto con ID ${id}`);
                res.status(404).send('Producto no encontrado');
                return;
            }

            // Filtrar los items para incluir solo aquellos de la misma licencia que el item individual
            const relatedItems = allItems.filter(i => i.licence_id === item[0].licence_id && i.product_id !== item[0].product_id);

            res.render('./shop/item', {
                view: {
                    title: "Items | Funkoshop"
                },
                item: item[0],
                enableGlide: true,
                sliderTitle: 'Productos Relacionados',
                items: relatedItems
            });
        } catch (error) {
            console.error('Error en itemView:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    cart: async (req, res) => {
        try {
            // Lógica para obtener el carrito
            const cart = req.session.cart || [];

            res.render('../views/shop/cart', {
                view: {
                    title: "Carrito de Compras | Funkoshop"
                },
                cart,
            });
        } catch (error) {
            console.error('Error en cart:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    getCart: async (req, res) => {
        try {
            // Obtener productos en el carrito junto con su información
            const userId = req.session.userId; // Asume que tienes la información del usuario en la sesión
            const [rows] = await conn.query('SELECT product.*, cart.quantity FROM product JOIN cart ON product.product_id = cart.product_id WHERE cart.user_id = ?;', [userId]);

            const response = {
                isError: false,
                data: rows
            };

            res.render('../views/shop/cart', {
                view: {
                    title: "Carrito de Compras | Funkoshop"
                },
                cart: response.data,
            });
        } catch (error) {
            console.error('Error en getCart:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    addToCart: async (req, res) => {
        try {
            const productId = req.params.id;
            const quantity = req.body.quantity || 1;

            // Lógica para agregar el producto al carrito
            req.session.cart = req.session.cart || [];
            const cartItemIndex = req.session.cart.findIndex(item => String(item.product_id) === String(productId));

            if (cartItemIndex !== -1) {
                // Si el producto ya está en el carrito, actualiza la cantidad y el total
                req.session.cart[cartItemIndex].quantity += parseInt(quantity);
                req.session.cart[cartItemIndex].total = req.session.cart[cartItemIndex].price * req.session.cart[cartItemIndex].quantity;
            } else {

                const itemResponse = await ItemsService.getItem(productId);

                if (!itemResponse || !itemResponse.data || itemResponse.data.length === 0) {
                    console.error(`Error: No se encontró el producto con ID ${productId}`);
                    res.status(404).send('Producto no encontrado');
                    return;
                }

                const item = itemResponse.data[0];

                const newItem = {
                    product_id: item.product_id,
                    image_front: item.image_front,
                    product_name: item.product_name,
                    licence_name: item.licence_name,
                    price: item.price,
                    quantity: parseInt(quantity),
                    total: item.price * parseInt(quantity)
                };

                req.session.cart.push(newItem);
            }

            // Redireccionar a la página del carrito después de agregar
            console.log('Redireccionando...');
            res.json({ redirectUrl: '/shop/cart' });
        } catch (error) {
            console.error('Error en addToCart:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    getCartCount: (req, res) => {
        try {
            const cart = req.session.cart || [];
            const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

            res.json({ cartCount });
        } catch (error) {
            console.error('Error en getCartCount:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    updateQuantity: async (req, res) => {
        try {
            const productId = req.params.productId;
            const action = req.params.action; // 'add' o 'subtract'

            // Obtener la cantidad actual del producto en el carrito (puedes obtener esto de la sesión o localStorage)
            const cart = req.session.cart || [];
            const cartItem = cart.find(item => String(item.product_id) === String(productId));

            if (!cartItem) {
                console.error(`Error: No se encontró el producto con ID ${productId} en el carrito`);
                res.status(404).send('Producto no encontrado en el carrito');
                return;
            }

            // Actualizar la cantidad en función de la acción (sumar o restar)
            if (action === 'add') {
                cartItem.quantity += 1;
            } else if (action === 'subtract' && cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            }

            // Actualizar la cantidad y el total en el carrito (no olvides actualizar también en la sesión o localStorage)
            cartItem.total = cartItem.price * cartItem.quantity;
            res.json({ success: true, cart, cartItem });

        } catch (error) {
            console.error('Error en updateQuantity:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    deleteCart: async (req, res) => {
        try {
            const productId = req.params.id;

            // Filtrar el producto del carrito (puedes obtener esto de la sesión o localStorage)
            const cart = req.session.cart || [];
            req.session.cart = cart.filter(item => String(item.product_id) !== String(productId));

            // Redirigir o responder según sea necesario
            res.json({ success: true, cart, deletedProductId: productId });
        } catch (error) {
            console.error('Error en deleteCart:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    checkout: (req, res) => {

        const data = req.body;
        res.send(data);
    }
};

module.exports = shopControllers;

