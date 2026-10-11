const authService = require("../services/authService");
const userRepository = require("../repositories/userRepository");

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Email e senha são obrigatórios."
                }
            });
        }

        const result = await authService.login(email, password);

        if (!result) {
            return res.status(401).json({
                success: false,
                error: {
                    code: "INVALID_CREDENTIALS",
                    message: "Email ou senha inválidos."
                }
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Erro no login:", error.message);

        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Erro interno do servidor."
            }
        });
    }
}

async function me(req, res) {
    try {
        const user = await userRepository.findById(req.user.id);

        if (!user || !user.ativo) {
            return res.status(401).json({
                success: false,
                error: {
                    code: "UNAUTHORIZED",
                    message: "Usuário não autorizado."
                }
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                perfil: user.perfil
            }
        });
    } catch (error) {
        console.error("Erro ao consultar usuário:", error.message);

        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Erro interno do servidor."
            }
        });
    }
}

function logout(req, res) {
    return res.status(200).json({
        success: true,
        data: {
            message: "Logout realizado com sucesso."
        }
    });
}

module.exports = {
    login,
    me,
    logout
};