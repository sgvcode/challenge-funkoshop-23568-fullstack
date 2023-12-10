const ItemsService = require('../services/itemServices');

const shopControllers = {
    shopView: async (req, res) => {
        try {
            const { page = 1, limit = 9 } = req.query;

            // Obtener los datos paginados
            const paginatedItems = await ItemsService.getPaginated(page, limit);
            const { data, totalPages } = paginatedItems;

            res.render('../views/shop/shop', {
                view: {
                    title: "Shop | Funkoshop"
                },
                items: data,
                totalPages,
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

            // Filtra los items para incluir solo aquellos de la misma licencia que el item individual
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
            // Lógica para obtener el carrito (puedes almacenarlo en la sesión o en localStorage)
            const cart = req.session.cart || []; // Utilizando sesión como ejemplo

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

    // shopControllers.js
    addToCart: async (req, res) => {
        try {
            const productId = req.params.id;
            const quantity = req.body.quantity || 1;

            // Lógica para agregar el producto al carrito
            req.session.cart = req.session.cart || [];
            const cartItemIndex = req.session.cart.findIndex(item => String(item.product_id) === String(productId));

            console.log('Antes de la lógica de agregado:', req.session.cart);

            if (cartItemIndex !== -1) {
                // Si el producto ya está en el carrito, actualiza la cantidad y el total
                req.session.cart[cartItemIndex].quantity += parseInt(quantity);
                req.session.cart[cartItemIndex].total = req.session.cart[cartItemIndex].price * req.session.cart[cartItemIndex].quantity;
            } else {
                // Aquí, ajustamos la estructura del objeto que se agrega al carrito
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

            console.log('Después de la lógica de agregado:', req.session.cart);

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


    deleteCart: async (req, res) => {
        try {
            const productId = req.params.id;

            // Lógica para eliminar el producto del carrito
            req.session.cart = req.session.cart || [];
            req.session.cart = req.session.cart.filter(item => item.productId !== productId);

            res.redirect('/shop/cart'); // Redireccionar a la página del carrito después de eliminar
        } catch (error) {
            console.error('Error en deleteCart:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    updateQuantity: (req, res) => {
        try {
            const productId = req.params.productId;
            const action = req.params.action;

            // Aquí debes implementar la lógica para actualizar la cantidad en el carrito
            // Puedes acceder al carrito a través de req.session.cart o donde lo tengas almacenado

            // Después de actualizar la cantidad, puedes enviar una respuesta al cliente
            res.json({ success: true, message: 'Cantidad actualizada exitosamente' });
        } catch (error) {
            console.error('Error en updateQuantity:', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
    },

    checkout: (req, res) => {

        const data = req.body;
        res.send(data);
    }
};

module.exports = shopControllers;
