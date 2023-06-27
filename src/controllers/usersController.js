const fs = require('fs');
const path = require('path');

const jsonPaths = require('../modules/jsonPaths.js');

//Parseando los datos
const usersPath = '../database/users.json';
const usersData = jsonPaths.read(usersPath);

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

        jsonPaths.write(usersPath, usersData);

        return res.render('./users/register.ejs');
    },
    edit: (req, res) =>{

        const user = usersData.find(row => row.id == req.params.userId);

        return res.render('./users/editUser.ejs', {user: user});
    },
    editProcess: (req, res) =>{

        const currentUser = usersData.find(row => row.id == req.params.userId);

        for (let property in req.body) {
            currentUser[property] = req.body[property];
        }

        // Validation for the correct password content information
        req.body.password ? currentUser.password = currentUser.password[0]: '';

        //Reescribiendo la base de datos con los archivos actualizados
        jsonPaths.write(usersPath, usersData);

        return res.redirect('/user/login');
    },
    delete: (req, res) =>{

        const currentUser = usersData.find(row => row.id == req.params.userId);

        currentUser.erased = true;

        //Reescribiendo la base de datos con los archivos actualizados
        jsonPaths.write(usersPath, usersData);
        
        return res.redirect('/user/login');
    }
};