const LicenceService = require('../services/licenceService');
const ItemsService = require('../services/itemServices');

const mainControllers = {
    homeView: async (req, res) => {
        try {
            const licences = await LicenceService.getAllItemsLicences();

            // Obtenemos los productos con etiqueta 'nuevo'
            const newItems = await ItemsService.getNewItems();

            res.render('home', {
                view: {
                    title: "Home | Funkoshop"
                },
                collections: licences.data,
                sliderTitle: 'Ultimos lanzamientos',
                enableGlide: true,
                items: newItems.data,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener datos para la vista principal');
        }
    },

    sliderView: async (req, res) => {
        try {
            // Obtenemos los productos con etiqueta 'nuevo' para el slider
            const newItems = await ItemsService.getNewItems();

            res.render('partials/sliders', {
                view: {},
                items: res.locals.newItems.data,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener elementos para el slider');
        }
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
