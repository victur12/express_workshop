const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');

/*
Verbos HTTP
GET - obtener recursos
POST - almacenar recursos 
PUT - modificar un recurso
PATCH - modificar un una parte de un recurso
DELETE - borrar un recurso
*/
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) =>{
    return res.status(200).json({code: 1, message: "bienvenido al Pokedex"});
});

app.use("/pokemon", pokemon);
app.use("/user", user);

app.use((req,res,next) => {
    return res.status(404).json({code : 404, message: "URL no encontrado"});
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log('server is running...');
});