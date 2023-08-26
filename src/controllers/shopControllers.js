const ItemsService = require('../services/itemServices');

const shopControllers = {
    shopView: async (req, res) => {
        const items = await ItemsService.getAllItems();
        const { data } = items;
        res.render('../views/shop/shop', {
            view: {
                title: "Shop | Funkoshop"
            },
            items: data
        });
    },
    itemView: async (req, res) => {
        const id = req.params.id;
        const item = await ItemsService.getItem(id);
        const { data } = item;

        res.render('./shop/item', {
            view: {
                title: "Items | Funkoshop"
            },
            item: data[0],
            enableGlide: true
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