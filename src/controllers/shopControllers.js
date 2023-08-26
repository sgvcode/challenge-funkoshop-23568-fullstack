const ItemsService = require('../services/itemServices');

const shopControllers = {
    shopView: async (req, res) => {
        const items = await ItemsService.getAllItems()
        res.render('../views/shop/shop', {
            view: {
                title: "Shop | Funkoshop"
            },
            items
        });
    },
    itemView: async (req, res) => {
        const id = req.params.id;
        const item = await ItemsService.getItem(id);
        res.render('../views/shop/item', {
            view: {
                title: "Items | Funkoshop"
            },
            item
        });
    },

    addToCart: (req, res) => res.send('Route agregar un producto al carrito'),
    cart: (req, res) => res.send('Route a página de carrito'),

    checkout: (req, res) => {

        const data = req.body;
        res.send(data);

    }
}

module.exports = shopControllers;