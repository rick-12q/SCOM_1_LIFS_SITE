const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRepository = require("../repositories/userRepository");

async function login(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user || !user.ativo) {
        return null;
    }

    const passwordIsValid = await bcrypt.compare(
        password,
        user.senha_hash
    );

    if (!passwordIsValid) {
        return null;
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET não está configurado.");
    }

    const token = jwt.sign(
        {
            id: user.id,
            perfil: user.perfil
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h"
        }
    );

    return {
        token,
        user: {
            id: user.id,
            nome: user.nome,
            email: user.email,
            perfil: user.perfil
        }
    };
}

function verifyToken(token) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET não está configurado.");
    }

    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    login,
    verifyToken
};