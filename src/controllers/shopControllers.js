const shopControllers = {
    shopView: (req, res) => res.send('Route a página Shop'),
    itemView: (req, res) => res.send(`Route a un producto por su ID:${req.params.id}`),
    addToCart: (req, res) => res.send('Route agregar un producto al carrito'),
    cart: (req, res) => res.send('Route a página de carrito'),

    checkout: (req, res) => {

        const data = req.body;
        res.send(data);

    }
}

module.exports = shopControllers;