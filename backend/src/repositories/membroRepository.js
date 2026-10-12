const pool = require("../config/database");

async function findAll() {
    const result = await pool.query(`
        SELECT
            id,
            nome,
            tipo,
            situacao,
            imagem,
            lattes,
            orcid,
            email,
            created_at,
            updated_at
        FROM membros
        ORDER BY id ASC
    `);

    return result.rows;
}

async function findById(id) {
    const result = await pool.query(
        `
        SELECT
            id,
            nome,
            tipo,
            situacao,
            imagem,
            lattes,
            orcid,
            email,
            created_at,
            updated_at
        FROM membros
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0] || null;
}

async function create({
    nome,
    tipo,
    situacao,
    imagem,
    lattes,
    orcid,
    email
}) {
    const result = await pool.query(
        `
        INSERT INTO membros (
            nome,
            tipo,
            situacao,
            imagem,
            lattes,
            orcid,
            email
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        [
            nome,
            tipo,
            situacao,
            imagem || null,
            lattes || null,
            orcid || null,
            email || null
        ]
    );

    return result.rows[0];
}

async function update(
    id,
    {
        nome,
        tipo,
        situacao,
        imagem,
        lattes,
        orcid,
        email
    }
) {
    const result = await pool.query(
        `
        UPDATE membros
        SET
            nome = $1,
            tipo = $2,
            situacao = $3,
            imagem = $4,
            lattes = $5,
            orcid = $6,
            email = $7,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING *
        `,
        [
            nome,
            tipo,
            situacao,
            imagem || null,
            lattes || null,
            orcid || null,
            email || null,
            id
        ]
    );

    return result.rows[0] || null;
}

async function remove(id) {
    const result = await pool.query(
        `
        DELETE FROM membros
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0] || null;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};