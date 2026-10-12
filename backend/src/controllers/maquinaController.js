const maquinaRepository = require("../repositories/maquinaRepository");
const logger = require("../utils/logger");

function idValido(id) {
    const numero = Number(id);
    return Number.isInteger(numero) && numero > 0;
}

async function list(req, res) {
    try {
        const maquinas = await maquinaRepository.findAll();

        return res.status(200).json({
            success: true,
            data: maquinas
        });
    } catch (error) {
        logger.error("MAQUINA_LIST_INTERNAL_ERROR", {
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
                    message: "ID de máquina inválido."
                }
            });
        }

        const maquina = await maquinaRepository.findById(req.params.id);

        if (!maquina) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Máquina não encontrada."
                }
            });
        }

        return res.status(200).json({
            success: true,
            data: maquina
        });
    } catch (error) {
        logger.error("MAQUINA_GET_INTERNAL_ERROR", {
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
            fabricante,
            modelo,
            imagem,
            local,
            descricao,
            disponivel
        } = req.body;

        if (!nome || !nome.trim()) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Nome da máquina é obrigatório."
                }
            });
        }

        const maquina = await maquinaRepository.create({
            nome: nome.trim(),
            fabricante,
            modelo,
            imagem,
            local,
            descricao,
            disponivel
        });

        logger.info("MAQUINA_CREATED", {
            maquinaId: maquina.id,
            userId: req.user.id
        });

        return res.status(201).json({
            success: true,
            data: maquina
        });
    } catch (error) {
        logger.error("MAQUINA_CREATE_INTERNAL_ERROR", {
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
                    message: "ID de máquina inválido."
                }
            });
        }

        const existente = await maquinaRepository.findById(req.params.id);

        if (!existente) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Máquina não encontrada."
                }
            });
        }

        const {
            nome,
            fabricante,
            modelo,
            imagem,
            local,
            descricao,
            disponivel
        } = req.body;

        if (!nome || !nome.trim()) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Nome da máquina é obrigatório."
                }
            });
        }

        const maquina = await maquinaRepository.update(req.params.id, {
            nome: nome.trim(),
            fabricante,
            modelo,
            imagem,
            local,
            descricao,
            disponivel
        });

        logger.info("MAQUINA_UPDATED", {
            maquinaId: maquina.id,
            userId: req.user.id
        });

        return res.status(200).json({
            success: true,
            data: maquina
        });
    } catch (error) {
        logger.error("MAQUINA_UPDATE_INTERNAL_ERROR", {
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
                    message: "ID de máquina inválido."
                }
            });
        }

        const maquina = await maquinaRepository.remove(req.params.id);

        if (!maquina) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Máquina não encontrada."
                }
            });
        }

        logger.info("MAQUINA_DELETED", {
            maquinaId: maquina.id,
            userId: req.user.id
        });

        return res.status(200).json({
            success: true,
            message: "Máquina excluída com sucesso."
        });
    } catch (error) {
        logger.error("MAQUINA_DELETE_INTERNAL_ERROR", {
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