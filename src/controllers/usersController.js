const fs = require('fs');
const path = require('path');

//Designando la ruta de los datos
const usersPath = path.resolve(__dirname, '../database/users.json');

//Parseando los datos
const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

module.exports = {
    login: (req, res) =>{
        return res.render('./users/login.ejs');
    },
    register: (req, res) =>{
        return res.render('./users/register.ejs');
    },
    registerProcess: (req, res) =>{

        const newUser = {
            id: usersData.length + 1,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            img: "",
            access: "personal",
            erased: false
        };

        usersData.push(newUser);

        fs.writeFileSync(usersPath, JSON.stringify(usersData, null, 2), 'utf-8');

        return res.render('./users/register.ejs');
    },
    edit: (req, res) =>{
        
        const user = usersData.find(row => row.id == req.params.userId);

        return res.render('./users/editUser.ejs', {user: user});
    },
    editProcess: (req, res) =>{
        return res.send('funciono por PUT');
    },
    delete: (req, res) =>{
        return res.render('./users/register.ejs');
    }
};