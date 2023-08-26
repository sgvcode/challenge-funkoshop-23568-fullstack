const mainControllers = {
    homeView: async (req, res) => {
        res.render('home', {
            view: {
                title: "Home | Funkoshop"
            }
        })
    },
    contactView: (req, res) => res.send('Route a Contact,'),
    aboutView: (req, res) => res.send('Route a About'),
    faqsView: (req, res) => res.send('Route a FAQs')
}

module.exports = mainControllers;