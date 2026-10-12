const agendamentoRepository = require("../repositories/agendamentoRepository");
const logger = require("../utils/logger");
const notificacaoService = require("../services/notificacaoService");

function idValido(id) {
    const numero = Number(id);
    return Number.isInteger(numero) && numero > 0;
}

function dataValida(data) {
    return /^\d{4}-\d{2}-\d{2}$/.test(data || "");
}

function horaValida(hora) {
    return /^\d{2}:\d{2}$/.test(hora || "");
}

async function list(req, res) {
    try {
        const agendamentos =
            await agendamentoRepository.findAll();

        return res.status(200).json({
            success: true,
            data: agendamentos
        });
    } catch (error) {
        logger.error("AGENDAMENTO_LIST_INTERNAL_ERROR", {
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
            maquina_id,
            nome,
            instituicao,
            resumo,
            data,
            hora
        } = req.body;

        if (
            !idValido(maquina_id) ||
            typeof nome !== "string" ||
            !nome.trim() ||
            typeof instituicao !== "string" ||
            !instituicao.trim() ||
            !dataValida(data) ||
            !horaValida(hora)
        ) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Preencha corretamente os dados do agendamento."
                }
            });
        }

        const agora = new Date();

        const dataHoraAgendamento = new Date(
            `${data}T${hora}:00`
        );

        if (
            Number.isNaN(dataHoraAgendamento.getTime()) ||
            dataHoraAgendamento <= agora
        ) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "INVALID_DATE",
                    message: "O agendamento deve ser feito para uma data e horário futuros."
                }
            });
        }

        const conflito =
            await agendamentoRepository.findConflict(
                maquina_id,
                data,
                hora
            );

        if (conflito) {
            return res.status(409).json({
                success: false,
                error: {
                    code: "SCHEDULE_CONFLICT",
                    message: "Já existe um agendamento para esse equipamento nesse horário."
                }
            });
        }

        /*
         * 1. Salva o agendamento no PostgreSQL.
         */
        const agendamento =
            await agendamentoRepository.create({
                maquinaId: maquina_id,
                usuarioId: req.user.id,
                nome: nome.trim(),
                instituicao: instituicao.trim(),
                resumo: resumo?.trim() || null,
                data,
                hora
            });

        /*
         * 2. Busca novamente o agendamento para obter
         * também os dados da máquina, como maquina_nome.
         */
        const agendamentoCompleto =
            await agendamentoRepository.findById(
                agendamento.id
            );

        /*
         * 3. Tenta enviar a notificação.
         *
         * Se o e-mail falhar, o agendamento NÃO é perdido,
         * pois ele já foi salvo no banco.
         */
        try {
            await notificacaoService.notificarNovoAgendamento(
                agendamentoCompleto
            );
        } catch (notificationError) {
            logger.error(
                "AGENDAMENTO_NOTIFICATION_ERROR",
                {
                    agendamentoId: agendamento.id,
                    message: notificationError.message
                }
            );
        }

        logger.info("AGENDAMENTO_CREATED", {
            agendamentoId: agendamento.id,
            maquinaId: maquina_id,
            userId: req.user.id
        });

        return res.status(201).json({
            success: true,
            data: agendamento
        });
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                error: {
                    code: "SCHEDULE_CONFLICT",
                    message: "Já existe um agendamento para esse equipamento nesse horário."
                }
            });
        }

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                error: {
                    code: "INVALID_MACHINE",
                    message: "Equipamento inválido."
                }
            });
        }

        logger.error(
            "AGENDAMENTO_CREATE_INTERNAL_ERROR",
            {
                error: error.message,
                userId: req.user?.id
            }
        );

        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Erro interno do servidor."
            }
        });
    }
}

async function listMine(req, res) {
    try {
        const agendamentos =
            await agendamentoRepository.findByUsuarioId(
                req.user.id
            );

        return res.status(200).json({
            success: true,
            data: agendamentos
        });
    } catch (error) {
        logger.error(
            "AGENDAMENTO_LIST_MINE_INTERNAL_ERROR",
            {
                error: error.message,
                userId: req.user?.id
            }
        );

        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Erro interno do servidor."
            }
        });
    }
}

async function updateStatus(req, res) {
    try {
        if (!idValido(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "ID de agendamento inválido."
                }
            });
        }

        const { status } = req.body;

        if (
            ![
                "PENDENTE",
                "APROVADO",
                "CANCELADO"
            ].includes(status)
        ) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Status inválido."
                }
            });
        }

        const agendamento =
            await agendamentoRepository.updateStatus(
                req.params.id,
                status
            );

        if (!agendamento) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "Agendamento não encontrado."
                }
            });
        }

        logger.info("AGENDAMENTO_STATUS_UPDATED", {
            agendamentoId: agendamento.id,
            status,
            userId: req.user.id
        });

        return res.status(200).json({
            success: true,
            data: agendamento
        });
    } catch (error) {
        logger.error(
            "AGENDAMENTO_UPDATE_INTERNAL_ERROR",
            {
                error: error.message,
                userId: req.user?.id
            }
        );

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
    listMine,
    create,
    updateStatus
};