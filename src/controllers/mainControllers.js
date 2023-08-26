const LicenceService = require('../services/licenceService');

const mainControllers = {
    homeView: async (req, res) => {
        const licences = await LicenceService.getAllItemsLicences();
        res.render('home', {
            view: {
                title: "Home | Funkoshop"
            },
            collection: licences.data,
            enableGlide: true
        })
    },
    contactView: (req, res) => res.send('Route a Contact,'),
    aboutView: (req, res) => res.send('Route a About'),
    faqsView: (req, res) => res.send('Route a FAQs')
}

module.exports = mainControllers;