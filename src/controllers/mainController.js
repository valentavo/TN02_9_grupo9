module.exports = {
    index: (req, res) => {

        return res.render('index.ejs');
        
    },
    about: (req, res) => {

        return res.render('aboutUs.ejs');

    }
}