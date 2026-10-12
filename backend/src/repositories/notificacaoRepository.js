const pool = require("../config/database");

async function getConfig() {
    const result = await pool.query(
        `
        SELECT
            id,
            email_destino,
            email_ativo,
            updated_at
        FROM configuracoes_notificacao
        ORDER BY id
        LIMIT 1
        `
    );

    return result.rows[0] || null;
}

async function updateConfig({
    emailDestino,
    emailAtivo
}) {
    const result = await pool.query(
        `
        UPDATE configuracoes_notificacao
        SET
            email_destino = $1,
            email_ativo = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = (
            SELECT id
            FROM configuracoes_notificacao
            ORDER BY id
            LIMIT 1
        )
        RETURNING
            id,
            email_destino,
            email_ativo,
            updated_at
        `,
        [
            emailDestino || null,
            emailAtivo
        ]
    );

    return result.rows[0] || null;
}

module.exports = {
    getConfig,
    updateConfig
};