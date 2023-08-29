const cart = [];

const CartService = {
    addToCart: (item) => {
        cart.push(item);
    },
    getCart: () => {
        return cart;
    },
    // Otros métodos relacionados con el carrito
};

module.exports = CartService;