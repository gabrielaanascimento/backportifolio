// src/repositories/projects-repositories.js
const sql = require('../db');

exports.getAllProjects = async () => {
    const projects = await sql`
        SELECT
            p.id,
            p.title,
            p.description,
            p.link,
            p.image_url,
            c.name AS category
        FROM projects AS p
        JOIN projects_categories AS c ON p.category_id = c.id;
    `;
    const projectsWithTech = await Promise.all(projects.map(async (project) => {
        const technologies = await sql`
            SELECT t.name
            FROM technologies AS t
            JOIN projects_technologies AS pt ON t.id = pt.technology_id
            WHERE pt.project_id = ${project.id};
        `;
        return {
            ...project,
            technologies: technologies.map(t => t.name)
        };
    }));
    return projectsWithTech;
};

exports.getProjectById = async (id) => {
    const [project] = await sql`
        SELECT
            p.id,
            p.title,
            p.description,
            p.link,
            p.image_url,
            c.name AS category
        FROM projects AS p
        JOIN projects_categories AS c ON p.category_id = c.id
        WHERE p.id = ${id};
    `;
    if (!project) return null;
    const technologies = await sql`
        SELECT t.name
        FROM technologies AS t
        JOIN projects_technologies AS pt ON t.id = pt.technology_id
        WHERE pt.project_id = ${project.id};
    `;
    return {
        ...project,
        technologies: technologies.map(t => t.name)
    };
};

exports.createProject = async (projectData) => {
    const { title, description, link, image_url, category, technologies } = projectData;

    const [categoryResult] = await sql`
        SELECT id FROM projects_categories WHERE name = ${category};
    `;
    if (!categoryResult) {
        throw new Error('Category not found');
    }

    const [newProject] = await sql`
        INSERT INTO projects (title, description, link, image_url, category_id)
        VALUES (${title}, ${description}, ${link}, ${image_url}, ${categoryResult.id})
        RETURNING id, title, description, link, image_url;
    `;

    if (technologies && technologies.length > 0) {
        await linkTechnologies(newProject.id, technologies);
    }
    return newProject;
};

exports.updateProject = async (id, projectData) => {
    const { title, description, link, image_url, category, technologies } = projectData;

    let categoryId = null;
    if (category) {
        const [categoryResult] = await sql`
            SELECT id FROM projects_categories WHERE name = ${category};
        `;
        if (!categoryResult) {
            throw new Error('Category not found');
        }
        categoryId = categoryResult.id;
    }

    await sql`
        UPDATE projects
        SET
            title = COALESCE(${title}, title),
            description = COALESCE(${description}, description),
            link = COALESCE(${link}, link),
            image_url = COALESCE(${image_url}, image_url),
            category_id = COALESCE(${categoryId}, category_id)
        WHERE id = ${id};
    `;

    if (technologies) {
        await sql`
            DELETE FROM projects_technologies WHERE project_id = ${id};
        `;
        if (technologies.length > 0) {
            await linkTechnologies(id, technologies);
        }
    }

    return this.getProjectById(id);
};

exports.deleteProject = async (id) => {
    const result = await sql`
        DELETE FROM projects WHERE id = ${id} RETURNING id;
    `;
    return result.length > 0;
};

const linkTechnologies = async (projectId, technologies) => {
    const techIds = await Promise.all(technologies.map(async (techName) => {
        const [tech] = await sql`
            SELECT id FROM technologies WHERE name = ${techName};
        `;
        if (tech) {
            return tech.id;
        } else {
            const [newTech] = await sql`
                INSERT INTO technologies (name) VALUES (${techName}) RETURNING id;
            `;
            return newTech.id;
        }
    }));

    const links = techIds.map(techId => ({
        project_id: projectId,
        technology_id: techId
    }));

    if (links.length > 0) {
        await sql`
            INSERT INTO projects_technologies ${sql(links)};
        `;
    }
};