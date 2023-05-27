const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));

app.listen(3030, () => {
    console.log("El servidor esta corriendo en el puerto 3030")
} )

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "/views/index.html"))
} )

app.get("/  ", (req, res) =>{
    res.sendFile(path.join(__dirname, "/views/login.html"))
} )

app.get("/carrito", (req, res) =>{
    res.sendFile(path.join(__dirname, "/views/productCart.html"))
} )

app.get("/detalle-del-producto", (req, res) =>{
    res.sendFile(path.join(__dirname, "/views/productDetail.html"))
} )

app.get("/registro", (req, res) =>{
    res.sendFile(path.join(__dirname, "/views/register.html"))
} )