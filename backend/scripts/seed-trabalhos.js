require("dotenv").config();

const pool = require("../src/config/database");

async function seedTrabalhos() {
    try {
        const memberEmail = process.env.SEED_MEMBER_EMAIL;

        if (!memberEmail) {
            throw new Error("SEED_MEMBER_EMAIL não está definido no .env.");
        }

        const userResult = await pool.query(
            "SELECT id FROM usuarios WHERE email = $1",
            [memberEmail]
        );

        if (userResult.rows.length === 0) {
            throw new Error(
                `Usuário ${memberEmail} não encontrado. Execute seed-users.js primeiro.`
            );
        }

        const userId = userResult.rows[0].id;

        const trabalhos = [
            {
                titulo: "Annealing térmico em filmes de Nb2O5",
                autores: "Monteiro, L. H.; Oliveira, P. S.; Bortoleto, J. R.",
                ano: 2026,
                tipo: "congresso",
                arquivo: "congresso-2026-CBrAVIC.pdf"
            },
            {
                titulo: "Sistema hipims aplicado a plasma",
                autores: "Monteiro, L. H.; Oliveira, P. S.; Bortoleto, J. R.",
                ano: 2025,
                tipo: "congresso",
                arquivo: "congresso-2025-CIC.pdf"
            }
        ];

        for (const trabalho of trabalhos) {
            const existing = await pool.query(
                `SELECT id
                 FROM trabalhos
                 WHERE titulo = $1 AND ano = $2`,
                [trabalho.titulo, trabalho.ano]
            );

            if (existing.rows.length > 0) {
                console.log(
                    `Trabalho "${trabalho.titulo}" já existe. Ignorando.`
                );
                continue;
            }

            await pool.query(
                `INSERT INTO trabalhos
                    (titulo, autores, ano, tipo, arquivo, created_by)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    trabalho.titulo,
                    trabalho.autores,
                    trabalho.ano,
                    trabalho.tipo,
                    trabalho.arquivo,
                    userId
                ]
            );

            console.log(`Trabalho "${trabalho.titulo}" criado.`);
        }

        console.log("Seed de trabalhos concluído.");
    } catch (error) {
        console.error("Erro ao criar trabalhos:", error.message);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

seedTrabalhos();