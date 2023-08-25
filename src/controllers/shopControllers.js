const shopControllers = {
    shop: (req, res) => res.send('Route a página Shop'),
    item: (req, res) => res.send(`Route a un producto por su ID:${req.params.id}`),
    addToCart: (req, res) => res.send('Route agregar un producto al carrito'),
    cart: (req, res) => res.send('Route a página de carrito'),
    checkout: (req, res) => res.send('Route para ir al checkout')
}

module.exports = shopControllers;