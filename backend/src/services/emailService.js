const nodemailer = require("nodemailer");

function criarTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",

        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });
}

async function enviarNotificacaoAgendamento(
    destinatario,
    agendamento
) {
    const transporter = criarTransporter();

    const data = new Date(agendamento.data);

    const dataFormatada = data.toLocaleDateString(
        "pt-BR",
        {
            timeZone: "UTC"
        }
    );

    const hora = String(agendamento.hora).slice(0, 5);

    const texto = `
Novo agendamento realizado no LIFS.

Equipamento: ${agendamento.maquina_nome}
Nome: ${agendamento.nome}
Instituição: ${agendamento.instituicao}
Data: ${dataFormatada}
Horário: ${hora}
Resumo: ${agendamento.resumo || "Não informado"}
Status: ${agendamento.status}

Este e-mail foi enviado automaticamente pelo sistema LIFS.
`.trim();

    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: destinatario,
        subject: `Novo agendamento - ${agendamento.maquina_nome}`,
        text: texto
    });
}

module.exports = {
    enviarNotificacaoAgendamento
};