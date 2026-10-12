const pool = require("../config/database");

async function findByEmail(email) {
    const result = await pool.query(
        `SELECT
            id,
            nome,
            email,
            senha_hash,
            perfil,
            ativo
         FROM usuarios
         WHERE email = $1`,
        [email]
    );

    return result.rows[0] || null;
}

async function findById(id) {
    const result = await pool.query(
        `SELECT
            id,
            nome,
            email,
            perfil,
            ativo
         FROM usuarios
         WHERE id = $1`,
        [id]
    );

    return result.rows[0] || null;
}

async function create({ nome, email, senhaHash }) {
    const result = await pool.query(
        `
        INSERT INTO usuarios (
            nome,
            email,
            senha_hash,
            perfil
        )
        VALUES ($1, $2, $3, 'USUARIO')
        RETURNING
            id,
            nome,
            email,
            perfil,
            ativo,
            created_at
        `,
        [nome, email, senhaHash]
    );

    return result.rows[0];
}

module.exports = {
    findByEmail,
    findById,
    create
};