const mainControllers = {
    homeView: (req, res) => res.send('Route a Homepage desde el controlador'),
    contactView: (req, res) => res.send('Route a Contact,'),
    aboutView: (req, res) => res.send('Route a About'),
    faqsView: (req, res) => res.send('Route a FAQs')
}

module.exports = mainControllers;