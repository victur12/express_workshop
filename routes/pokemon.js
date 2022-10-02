const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", (req, res, next) =>{
    return res.status(200).send(req.body)
});

pokemon.get("/", async (req, res, next) =>{
   const pkmn = await db.query("SELECT * FROM pokemon");
   return res.status(200).json(pkmn);
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id - 1;
    if(id >= 0 && id <= 25) {
        var sql = "SELECT * FROM pokemon WHERE pok_id = " + id;
        const pkmn = await db.query(sql);
        res.status(200).json(pkmn);
     } 
        res.status(404).send("Pokemon no encontrado");      
});

pokemon.get('/:name([A-Za-z]+)', async(req, res, next) =>{
    const name = req.params.name;
    var sql = "SELECT * FROM pokemon WHERE pok_name ='" + name + "'";
    const pkmn = await db.query(sql);
    
    return !(pkmn ==0) ? res.status(200).json(pkmn) : res.status(404).send("Pokemon no encontrado") ;
 
}); 

module.exports = pokemon;