require("dotenv").config();

const bcrypt = require("bcrypt");
const pool = require("../src/config/database");

async function createUser(nome, email, password, perfil) {
    const existingUser = await pool.query(
        "SELECT id FROM usuarios WHERE email = $1",
        [email]
    );

    if (existingUser.rows.length > 0) {
        console.log(`Usuário ${email} já existe. Ignorando.`);
        return;
    }

    const senhaHash = await bcrypt.hash(password, 10);

    await pool.query(
        `INSERT INTO usuarios (nome, email, senha_hash, perfil)
         VALUES ($1, $2, $3, $4)`,
        [nome, email, senhaHash, perfil]
    );

    console.log(`Usuário ${email} criado com perfil ${perfil}.`);
}

async function seedUsers() {
    try {
        const adminEmail = process.env.SEED_ADMIN_EMAIL;
        const adminPassword = process.env.SEED_ADMIN_PASSWORD;

        const memberEmail = process.env.SEED_MEMBER_EMAIL;
        const memberPassword = process.env.SEED_MEMBER_PASSWORD;

        if (
            !adminEmail ||
            !adminPassword ||
            !memberEmail ||
            !memberPassword
        ) {
            throw new Error(
                "Variáveis SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, " +
                "SEED_MEMBER_EMAIL e SEED_MEMBER_PASSWORD são obrigatórias."
            );
        }

        await createUser(
            "Administrador LIFS",
            adminEmail,
            adminPassword,
            "ADMIN"
        );

        await createUser(
            "Membro LIFS",
            memberEmail,
            memberPassword,
            "MEMBRO"
        );

        console.log("Seed de usuários concluído.");
    } catch (error) {
        console.error("Erro ao criar usuários:", error.message);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

seedUsers();