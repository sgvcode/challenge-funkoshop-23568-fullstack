const ItemsService = require('../services/itemServices');

const shopControllers = {
    shopView: async (req, res) => {
        const { page = 1, limit = 12 } = req.query;

        try {
            const itemsResponse = await ItemsService.getPaginated(page, limit);

            if (itemsResponse.isError) {
                console.error('Error en shopView - itemsResponse:', itemsResponse);
                return res.status(500).send('Error interno del servidor');
            }

            const { data: items, totalPages } = itemsResponse;

            if (!items) {
                console.error('Error en shopView: La lista de productos es undefined');
                return res.status(500).send('Error interno del servidor');
            }

            res.render('../views/shop/shop', {
                view: {
                    title: "Shop | Funkoshop"
                },
                items,
                currentPage: parseInt(page),
                totalPages
            });
        } catch (error) {
            console.error(`Error en shopView: ${error}`);
            res.status(500).send('Error interno del servidor');
        }
    },

    itemView: async (req, res) => {
        const id = req.params.id;
        const itemResponse = await ItemsService.getItem(id);
        const allItemsResponse = await ItemsService.getAllItems();

        const { data: item } = itemResponse;
        const { data: allItems } = allItemsResponse;

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
    },

    addToCart: async (req, res) => {
        const id = req.params.id;
        const item = await ItemsService.getItem(id);
        // console.log(item);

        if (item.data.length > 0) {
            // Agrega el item al carrito directamente en el controlador
            req.session.cart = req.session.cart || [];
            req.session.cart.push(item.data[0]);

            res.send(`Item ${item.data[0].product_name} agregado al carrito.`);
        } else {
            res.send('No se encontró el item para agregar al carrito.');
        }
    },

    cart: (req, res) => {
        // Renderiza la página cart.ejs con los elementos del carrito almacenados en la sesión
        const cartItems = req.session.cart || [];

        res.render('../views/shop/cart', {
            view: {
                title: "Carrito | Funkoshop"
            },
            cart: cartItems
        });
    },

    checkout: (req, res) => {

        const data = req.body;
        res.send(data);
    }
};

module.exports = shopControllers;
