const mainControllers = {
    home: (req, res) => res.send('Router a Homepage desde el controlador'),
    contact: (req, res) => res.send('Router a Contact,'),
    about: (req, res) => res.send('Router a About'),
    faqs: (req, res) => res.send('Router a FAQs')
}

module.exports = mainControllers;