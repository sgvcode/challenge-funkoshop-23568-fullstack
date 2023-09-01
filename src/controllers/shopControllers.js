const ItemsService = require('../services/itemServices');
const CartService = require('../services/cartService');

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

    addToCart: async (req, res) => {
        const id = req.params.id;
        const item = await ItemsService.getItem(id);
        console.log(item); // Agrega este console.log

        if (item.data.length > 0) {
            CartService.addToCart(item.data[0]);
            res.send(`Item ${item.data[0].name} agregado al carrito.`);
        } else {
            res.send('No se encontró el item para agregar al carrito.');
        }
    },

    cart: (req, res) => {
        res.render('../views/shop/cart', {
            view: {
                title: "Carrito | Funkoshop"
            },
            cart: CartService.getCart()
        });
    },

    checkout: (req, res) => {

        const data = req.body;
        res.send(data);
    }
};

module.exports = shopControllers;