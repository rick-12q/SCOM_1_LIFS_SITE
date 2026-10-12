const notificacaoRepository =
    require("../repositories/notificacaoRepository");

const emailService =
    require("./emailService");

async function notificarNovoAgendamento(agendamento) {
    const config =
        await notificacaoRepository.getConfig();

    if (!config) {
        return;
    }

    if (
        config.email_ativo &&
        config.email_destino
    ) {
        await emailService.enviarNotificacaoAgendamento(
            config.email_destino,
            agendamento
        );
    }

}

module.exports = {
    notificarNovoAgendamento
};