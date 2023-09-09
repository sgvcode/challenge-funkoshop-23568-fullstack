import licenceService from '../services/licenceService';
import itemService from '../services/itemServices';
import categoryService from '../services/categoryService';

// const LicenceService = require('../services/licenceService');

const mainControllers = {
    homeView: async (req, res) => {

        req.session.count = req.session.count ? ++req.session.count : 1;
        // console.log(req.session.count);

        const licences = await licenceService.getLicences();
        const items = await itemService.getItems();
        const categories = await categoryService.getCategories();
        res.render('home', {
            view: {
                title: "Home | Funkoshop"
            },
            collections: licences.data,
<<<<<<< HEAD
            categories: categories.data,
            sliderTitle: 'Últimos lanzamientos',
            items: items.data,
            licences: licences.data,
=======
            sliderTitle: "Ultimos lanzamientos",
>>>>>>> develop
            enableGlide: true
        })
    },

    contactView: (req, res) => {
        res.render('contact', {
            view: {
                title: "Contact | Funkoshop"
            },
        })
    },

    aboutView: (req, res) => res.send('Route a About'),
    faqsView: (req, res) => res.send('Route a FAQs')
}

module.exports = mainControllers;
