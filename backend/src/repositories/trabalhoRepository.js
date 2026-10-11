const pool = require("../config/database");

async function findAll() {
    const result = await pool.query(
        `SELECT
            t.id,
            t.titulo,
            t.autores,
            t.ano,
            t.tipo,
            t.arquivo,
            t.created_by,
            t.created_at,
            t.updated_at,
            u.nome AS criado_por
         FROM trabalhos t
         INNER JOIN usuarios u
            ON u.id = t.created_by
         ORDER BY t.ano DESC, t.id DESC`
    );

    return result.rows;
}

async function findById(id) {
    const result = await pool.query(
        `SELECT
            t.id,
            t.titulo,
            t.autores,
            t.ano,
            t.tipo,
            t.arquivo,
            t.created_by,
            t.created_at,
            t.updated_at,
            u.nome AS criado_por
         FROM trabalhos t
         INNER JOIN usuarios u
            ON u.id = t.created_by
         WHERE t.id = $1`,
        [id]
    );

    return result.rows[0] || null;
}

async function create({
    titulo,
    autores,
    ano,
    tipo,
    arquivo,
    createdBy
}) {
    const result = await pool.query(
        `INSERT INTO trabalhos
            (titulo, autores, ano, tipo, arquivo, created_by)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING
            id,
            titulo,
            autores,
            ano,
            tipo,
            arquivo,
            created_by,
            created_at,
            updated_at`,
        [
            titulo,
            autores,
            ano,
            tipo,
            arquivo || null,
            createdBy
        ]
    );

    return result.rows[0];
}

async function update(
    id,
    {
        titulo,
        autores,
        ano,
        tipo,
        arquivo
    }
) {
    const result = await pool.query(
        `UPDATE trabalhos
         SET
            titulo = $1,
            autores = $2,
            ano = $3,
            tipo = $4,
            arquivo = $5,
            updated_at = CURRENT_TIMESTAMP
         WHERE id = $6
         RETURNING
            id,
            titulo,
            autores,
            ano,
            tipo,
            arquivo,
            created_by,
            created_at,
            updated_at`,
        [
            titulo,
            autores,
            ano,
            tipo,
            arquivo || null,
            id
        ]
    );

    return result.rows[0] || null;
}

async function remove(id) {
    const result = await pool.query(
        `DELETE FROM trabalhos
         WHERE id = $1
         RETURNING id`,
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