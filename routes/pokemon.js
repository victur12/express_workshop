const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

    if (pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)";
        query += ` Values('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;

        const rows = await db.query(query);
        console.log(rows);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Pokemon insertado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({ code: 1, message: pkmn });
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id - 1;
    if (id >= 0 && id <= 722) {
        var sql = "SELECT * FROM pokemon WHERE pok_id = " + id;
        const pkmn = await db.query(sql);
        res.status(200).json({ code: 201, message: pkmn });
    }
    res.status(404).send({ code: 404, message: "pokemon no encontrado" });
});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    var sql = "SELECT * FROM pokemon WHERE pok_name ='" + name + "'";
    const pkmn = await db.query(sql);

    return !(pkmn == 0) ? res.status(200).json({ code: 201, message: pkmn }) : res.status(404).send({ code: 404, message: "pokemon no encontrado" });

});

module.exports = pokemon;