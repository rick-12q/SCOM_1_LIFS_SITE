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

module.exports = {
    findByEmail,
    findById
};