const authService = require("../services/authService");

function authenticate(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            success: false,
            error: {
                code: "UNAUTHORIZED",
                message: "Token de autenticação não fornecido."
            }
        });
    }

    const parts = authorization.split(" ");

    if (
        parts.length !== 2 ||
        parts[0] !== "Bearer" ||
        !parts[1]
    ) {
        return res.status(401).json({
            success: false,
            error: {
                code: "UNAUTHORIZED",
                message: "Token de autenticação inválido."
            }
        });
    }

    try {
        const decoded = authService.verifyToken(parts[1]);

        req.user = {
            id: decoded.id,
            perfil: decoded.perfil
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: {
                code: "UNAUTHORIZED",
                message: "Token inválido ou expirado."
            }
        });
    }
}

function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: {
                    code: "UNAUTHORIZED",
                    message: "Usuário não autenticado."
                }
            });
        }

        if (!allowedRoles.includes(req.user.perfil)) {
            return res.status(403).json({
                success: false,
                error: {
                    code: "FORBIDDEN",
                    message: "Você não possui permissão para esta operação."
                }
            });
        }

        next();
    };
}

module.exports = {
    authenticate,
    authorize
};