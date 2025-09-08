// src/repositories/about-me-repositories.js
const sql = require('../db');

exports.getAboutMe = async () => {
    const [aboutMe] = await sql`SELECT * FROM about_me ORDER BY id LIMIT 1;`;
    return aboutMe;
};

exports.updateAboutMe = async (aboutMeData) => {
    const { full_name, bio, github_link, linkedin_link, email, phone, location } = aboutMeData;
    const [updatedAboutMe] = await sql`
        UPDATE about_me
        SET
            full_name = COALESCE(${full_name}, full_name),
            bio = COALESCE(${bio}, bio),
            github_link = COALESCE(${github_link}, github_link),
            linkedin_link = COALESCE(${linkedin_link}, linkedin_link),
            email = COALESCE(${email}, email),
            phone = COALESCE(${phone}, phone),
            location = COALESCE(${location}, location)
        WHERE id = (SELECT id FROM about_me LIMIT 1)
        RETURNING *;
    `;
    return updatedAboutMe;
};