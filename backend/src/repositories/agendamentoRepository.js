const pool = require("../config/database");

async function findAll() {
    const result = await pool.query(`
        SELECT
            a.id,
            a.maquina_id,
            a.usuario_id,
            a.nome,
            a.instituicao,
            a.resumo,
            a.data,
            a.hora,
            a.status,
            a.created_at,
            a.updated_at,
            m.nome AS maquina_nome
        FROM agendamentos a
        INNER JOIN maquinas m
            ON m.id = a.maquina_id
        ORDER BY a.data ASC, a.hora ASC
    `);

    return result.rows;
}

async function findById(id) {
    const result = await pool.query(
        `
        SELECT
            a.id,
            a.maquina_id,
            a.usuario_id,
            a.nome,
            a.instituicao,
            a.resumo,
            a.data,
            a.hora,
            a.status,
            a.created_at,
            a.updated_at,
            m.nome AS maquina_nome
        FROM agendamentos a
        INNER JOIN maquinas m
            ON m.id = a.maquina_id
        WHERE a.id = $1
        `,
        [id]
    );

    return result.rows[0] || null;
}

async function findConflict(maquinaId, data, hora) {
    const result = await pool.query(
        `
        SELECT id
        FROM agendamentos
        WHERE maquina_id = $1
          AND data = $2
          AND hora = $3
          AND status <> 'CANCELADO'
        LIMIT 1
        `,
        [maquinaId, data, hora]
    );

    return result.rows[0] || null;
}

async function create({
    maquinaId,
    usuarioId,
    nome,
    instituicao,
    resumo,
    data,
    hora
}) {
    const result = await pool.query(
        `
        INSERT INTO agendamentos (
            maquina_id,
            usuario_id,
            nome,
            instituicao,
            resumo,
            data,
            hora
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        [
            maquinaId,
            usuarioId,
            nome,
            instituicao,
            resumo || null,
            data,
            hora
        ]
    );

    return result.rows[0];
}

async function updateStatus(id, status) {
    const result = await pool.query(
        `
        UPDATE agendamentos
        SET
            status = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
        `,
        [status, id]
    );

    return result.rows[0] || null;
}

async function findByUsuarioId(usuarioId) {
    const result = await pool.query(
        `
        SELECT
            a.id,
            a.maquina_id,
            a.nome,
            a.instituicao,
            a.resumo,
            a.data,
            a.hora,
            a.status,
            a.created_at,
            m.nome AS maquina_nome
        FROM agendamentos a
        INNER JOIN maquinas m
            ON m.id = a.maquina_id
        WHERE a.usuario_id = $1
        ORDER BY a.data DESC, a.hora DESC
        `,
        [usuarioId]
    );

    return result.rows;
}

module.exports = {
    findAll,
    findById,
    findByUsuarioId,
    findConflict,
    create,
    updateStatus
};