// src/repositories/technologies-repositories.js
const sql = require('../db');

exports.getAllTechnologies = async () => {
    return await sql`SELECT name FROM technologies`;
};

exports.getTechnologyById = async (id) => {
    const [technology] = await sql`
        SELECT * FROM technologies WHERE id = ${id};
    `;
    return technology;
};

exports.createTechnology = async (technologyData) => {
    const [newTechnology] = await sql`
        INSERT INTO technologies (name) VALUES (${technologyData.name}) RETURNING *;
    `;
    return newTechnology;
};

exports.updateTechnology = async (id, technologyData) => {
    const [updatedTechnology] = await sql`
        UPDATE technologies
        SET name = ${technologyData.name}
        WHERE id = ${id}
        RETURNING *;
    `;
    return updatedTechnology;
};

exports.deleteTechnology = async (id) => {
    const result = await sql`
        DELETE FROM technologies WHERE id = ${id} RETURNING id;
    `;
    return result.length > 0;
};