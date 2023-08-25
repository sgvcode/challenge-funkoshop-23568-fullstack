const adminControllers = {

    adminView: (req, res) => res.send("Route de página admin"),
    createView: (req, res) => res.send("Route de página create"),
    createItem: (req, res) => res.send("Nuevo item a agregar a la bd"),
    editView: (req, res) => res.send(`Route de página edit de ID:${req.params.id}`),
    editItem: (req, res) => res.send("Nuevo item a agregar a la bd"),
    deleteItem: (req, res) => res.send("Borra item de la bd"),
    loginView: (req, res) => res.send("Route de página login"),
    loginUser: (req, res) => res.send("Recibe los datos login"),
    registerView: (req, res) => res.send("Route de pagina register"),
    registerUser: (req, res) => res.send("Recibe los datos de registro")

}

module.exports = adminControllers;