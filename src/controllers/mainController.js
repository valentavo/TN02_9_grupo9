module.exports = {
    index: async (req, res) => {

        console.log(req);

        return res.render('index.ejs');
        
    },
    about: (req, res) => {

        return res.render('aboutUs.ejs');

    }
}