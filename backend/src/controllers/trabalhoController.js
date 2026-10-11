const trabalhoRepository = require("../repositories/trabalhoRepository");
const logger = require("../utils/logger");

async function list(req, res) {
    try {
        const trabalhos = await trabalhoRepository.findAll();

        return res.status(200).json({
            success: true,
            data: trabalhos
        });
    } catch (error) {
        console.error("Erro ao listar trabalhos:", error.message);

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
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "ID inválido."
                }
            });
        }

        const trabalho = await trabalhoRepository.findById(id);

        if (!trabalho) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Trabalho não encontrado."
                }
            });
        }

        return res.status(200).json({
            success: true,
            data: trabalho
        });
    } catch (error) {
        console.error("Erro ao consultar trabalho:", error.message);

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
            titulo,
            autores,
            ano,
            tipo,
            arquivo
        } = req.body;

        if (
            !titulo ||
            !autores ||
            !ano ||
            !tipo
        ) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Título, autores, ano e tipo são obrigatórios."
                }
            });
        }

        const anoNumero = Number(ano);

        if (
            !Number.isInteger(anoNumero) ||
            anoNumero < 1900 ||
            anoNumero > 2100
        ) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Ano inválido."
                }
            });
        }

        const trabalho = await trabalhoRepository.create({
            titulo,
            autores,
            ano: anoNumero,
            tipo,
            arquivo,
            createdBy: req.user.id
        });
        logger.info("TRABALHO_CREATED", {
            trabalhoId: trabalho.id,
            userId: req.user.id,
            perfil: req.user.perfil,
            ip: req.ip
        });
        return res.status(201).json({
            success: true,
            data: trabalho
        });
    } catch (error) {
        logger.error("TRABALHO_CREATE_ERROR", {
        userId: req.user?.id,
        message: error.message,
        stack: error.stack
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
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "ID inválido."
                }
            });
        }

        const existing = await trabalhoRepository.findById(id);

        if (!existing) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Trabalho não encontrado."
                }
            });
        }

        const {
            titulo,
            autores,
            ano,
            tipo,
            arquivo
        } = req.body;

        if (
            !titulo ||
            !autores ||
            !ano ||
            !tipo
        ) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Título, autores, ano e tipo são obrigatórios."
                }
            });
        }

        const anoNumero = Number(ano);

        if (
            !Number.isInteger(anoNumero) ||
            anoNumero < 1900 ||
            anoNumero > 2100
        ) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Ano inválido."
                }
            });
        }

        /*
         * MEMBRO pode alterar apenas trabalhos criados por ele.
         * ADMIN pode alterar qualquer trabalho.
         */
        if (
            req.user.perfil !== "ADMIN" &&
            existing.created_by !== req.user.id
        ) {
            return res.status(403).json({
                success: false,
                error: {
                    code: "FORBIDDEN",
                    message: "Você não possui permissão para editar este trabalho."
                }
            });
        }

        const trabalho = await trabalhoRepository.update(id, {
            titulo,
            autores,
            ano: anoNumero,
            tipo,
            arquivo
        });

        return res.status(200).json({
            success: true,
            data: trabalho
        });
    } catch (error) {
        console.error("Erro ao atualizar trabalho:", error.message);

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
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "ID inválido."
                }
            });
        }

        const existing = await trabalhoRepository.findById(id);

        if (!existing) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Trabalho não encontrado."
                }
            });
        }

        /*
         * MEMBRO pode excluir apenas trabalhos criados por ele.
         * ADMIN pode excluir qualquer trabalho.
         */
        if (
            req.user.perfil !== "ADMIN" &&
            existing.created_by !== req.user.id
        ) {
            return res.status(403).json({
                success: false,
                error: {
                    code: "FORBIDDEN",
                    message: "Você não possui permissão para excluir este trabalho."
                }
            });
        }

        await trabalhoRepository.remove(id);

        return res.status(200).json({
            success: true,
            data: {
                message: "Trabalho excluído com sucesso."
            }
        });
    } catch (error) {
        console.error("Erro ao excluir trabalho:", error.message);

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