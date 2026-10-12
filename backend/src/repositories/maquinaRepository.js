const pool = require("../config/database");

async function findAll() {
    const result = await pool.query(`
        SELECT
            id,
            nome,
            fabricante,
            modelo,
            imagem,
            local,
            descricao,
            disponivel,
            created_at,
            updated_at
        FROM maquinas
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
            fabricante,
            modelo,
            imagem,
            local,
            descricao,
            disponivel,
            created_at,
            updated_at
        FROM maquinas
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0] || null;
}

async function create({
    nome,
    fabricante,
    modelo,
    imagem,
    local,
    descricao,
    disponivel
}) {
    const result = await pool.query(
        `
        INSERT INTO maquinas (
            nome,
            fabricante,
            modelo,
            imagem,
            local,
            descricao,
            disponivel
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        [
            nome,
            fabricante || null,
            modelo || null,
            imagem || null,
            local || null,
            descricao || null,
            disponivel ?? true
        ]
    );

    return result.rows[0];
}

async function update(
    id,
    {
        nome,
        fabricante,
        modelo,
        imagem,
        local,
        descricao,
        disponivel
    }
) {
    const result = await pool.query(
        `
        UPDATE maquinas
        SET
            nome = $1,
            fabricante = $2,
            modelo = $3,
            imagem = $4,
            local = $5,
            descricao = $6,
            disponivel = $7,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING *
        `,
        [
            nome,
            fabricante || null,
            modelo || null,
            imagem || null,
            local || null,
            descricao || null,
            disponivel ?? true,
            id
        ]
    );

    return result.rows[0] || null;
}

async function remove(id) {
    const result = await pool.query(
        `
        DELETE FROM maquinas
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