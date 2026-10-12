const membroRepository = require("../repositories/membroRepository");
const logger = require("../utils/logger");

function idValido(id) {
    const numero = Number(id);
    return Number.isInteger(numero) && numero > 0;
}

function dadosValidos({ nome, tipo, situacao }) {
    return (
        typeof nome === "string" &&
        nome.trim() &&
        typeof tipo === "string" &&
        tipo.trim() &&
        typeof situacao === "string" &&
        ["atual", "egresso"].includes(situacao)
    );
}

async function list(req, res) {
    try {
        const membros = await membroRepository.findAll();

        return res.status(200).json({
            success: true,
            data: membros
        });
    } catch (error) {
        logger.error("MEMBRO_LIST_INTERNAL_ERROR", {
            error: error.message
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

async function getById(req, res) {
    try {
        if (!idValido(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "ID de membro inválido."
                }
            });
        }

        const membro = await membroRepository.findById(req.params.id);

        if (!membro) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Membro não encontrado."
                }
            });
        }

        return res.status(200).json({
            success: true,
            data: membro
        });
    } catch (error) {
        logger.error("MEMBRO_GET_INTERNAL_ERROR", {
            error: error.message
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

async function create(req, res) {
    try {
        const {
            nome,
            tipo,
            situacao,
            imagem,
            lattes,
            orcid,
            email
        } = req.body;

        if (!dadosValidos({ nome, tipo, situacao })) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message:
                        "Nome, tipo e situação válida são obrigatórios."
                }
            });
        }

        const membro = await membroRepository.create({
            nome: nome.trim(),
            tipo: tipo.trim(),
            situacao,
            imagem,
            lattes,
            orcid,
            email: email?.trim() || null
        });

        logger.info("MEMBRO_CREATED", {
            membroId: membro.id,
            userId: req.user.id
        });

        return res.status(201).json({
            success: true,
            data: membro
        });
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                error: {
                    code: "CONFLICT",
                    message: "Já existe um membro com esse e-mail."
                }
            });
        }

        logger.error("MEMBRO_CREATE_INTERNAL_ERROR", {
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

async function update(req, res) {
    try {
        if (!idValido(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "ID de membro inválido."
                }
            });
        }

        const existente = await membroRepository.findById(req.params.id);

        if (!existente) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Membro não encontrado."
                }
            });
        }

        const {
            nome,
            tipo,
            situacao,
            imagem,
            lattes,
            orcid,
            email
        } = req.body;

        if (!dadosValidos({ nome, tipo, situacao })) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message:
                        "Nome, tipo e situação válida são obrigatórios."
                }
            });
        }

        const membro = await membroRepository.update(
            req.params.id,
            {
                nome: nome.trim(),
                tipo: tipo.trim(),
                situacao,
                imagem,
                lattes,
                orcid,
                email: email?.trim() || null
            }
        );

        logger.info("MEMBRO_UPDATED", {
            membroId: membro.id,
            userId: req.user.id
        });

        return res.status(200).json({
            success: true,
            data: membro
        });
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                error: {
                    code: "CONFLICT",
                    message: "Já existe um membro com esse e-mail."
                }
            });
        }

        logger.error("MEMBRO_UPDATE_INTERNAL_ERROR", {
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

async function remove(req, res) {
    try {
        if (!idValido(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "ID de membro inválido."
                }
            });
        }

        const membro = await membroRepository.remove(req.params.id);

        if (!membro) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Membro não encontrado."
                }
            });
        }

        logger.info("MEMBRO_DELETED", {
            membroId: membro.id,
            userId: req.user.id
        });

        return res.status(200).json({
            success: true,
            message: "Membro excluído com sucesso."
        });
    } catch (error) {
        logger.error("MEMBRO_DELETE_INTERNAL_ERROR", {
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
    list,
    getById,
    create,
    update,
    remove
};