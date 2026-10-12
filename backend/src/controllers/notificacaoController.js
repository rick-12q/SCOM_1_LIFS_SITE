const notificacaoRepository =
    require("../repositories/notificacaoRepository");

const logger = require("../utils/logger");

async function getConfig(req, res) {
    try {
        const config =
            await notificacaoRepository.getConfig();

        if (!config) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Configuração de notificação não encontrada."
                }
            });
        }

        return res.status(200).json({
            success: true,
            data: config
        });
    } catch (error) {
        logger.error("NOTIFICACAO_CONFIG_GET_ERROR", {
            error: error.message,
            userId: req.user?.id
        });

        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Erro interno do servidor."
            }
        });
    }
}

async function updateConfig(req, res) {
    try {
        const {
            email_destino,
            email_ativo,
        } = req.body;

        if (
            typeof email_ativo !== "boolean"
        ) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Configuração inválida."
                }
            });
        }

        if (
            email_ativo &&
            (
                typeof email_destino !== "string" ||
                !email_destino.trim()
            )
        ) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Informe o e-mail de destino."
                }
            });
        }

        const config =
            await notificacaoRepository.updateConfig({
                emailDestino:
                    email_destino?.trim() || null,

                emailAtivo:
                    email_ativo,
            });

        if (!config) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Configuração de notificação não encontrada."
                }
            });
        }

        logger.info("NOTIFICACAO_CONFIG_UPDATED", {
            userId: req.user.id
        });

        return res.status(200).json({
            success: true,
            data: config
        });
    } catch (error) {
        logger.error("NOTIFICACAO_CONFIG_UPDATE_ERROR", {
            error: error.message,
            userId: req.user?.id
        });

        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Erro interno do servidor."
            }
        });
    }
}

module.exports = {
    getConfig,
    updateConfig
};