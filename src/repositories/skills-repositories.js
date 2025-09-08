// src/repositories/skills-repositories.js
const sql = require('../db');

exports.getAllSkills = async () => {
    return await sql`SELECT * FROM skills`;
};

exports.getSkillById = async (id) => {
    const [skill] = await sql`
        SELECT * FROM skills WHERE id = ${id};
    `;
    return skill;
};

exports.createSkill = async (skillData) => {
    const { title, description, image_url } = skillData;
    const [newSkill] = await sql`
        INSERT INTO skills (title, description, image_url)
        VALUES (${title}, ${description}, ${image_url})
        RETURNING *;
    `;
    return newSkill;
};

exports.updateSkill = async (id, skillData) => {
    const { title, description, image_url } = skillData;
    const [updatedSkill] = await sql`
        UPDATE skills
        SET
            title = COALESCE(${title}, title),
            description = COALESCE(${description}, description),
            image_url = COALESCE(${image_url}, image_url)
        WHERE id = ${id}
        RETURNING *;
    `;
    return updatedSkill;
};

exports.deleteSkill = async (id) => {
    const result = await sql`
        DELETE FROM skills WHERE id = ${id} RETURNING id;
    `;
    return result.length > 0;
};