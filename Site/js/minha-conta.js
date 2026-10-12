let agendamentosAtuais = [];
let adminAgendamentosAtuais = [];
let sessaoAtual = null;

document.addEventListener("DOMContentLoaded", async () => {
  sessaoAtual = usuarioLogado();

  if (!sessaoAtual) {
    window.location.replace(
      "login.html?redirect=minha-conta.html"
    );
    return;
  }

  preencherDadosConta();

  if (sessaoAtual.perfil === "ADMIN") {
    await carregarAgendamentosAdmin();
    await iniciarPainelNotificacoes();
  }

  await carregarMeusAgendamentos();

  document.addEventListener("languagechange", () => {
    preencherDadosConta();
    renderizarAgendamentos();

    if (sessaoAtual?.perfil === "ADMIN") {
      renderizarAgendamentosAdmin();
    }
  });
});

function preencherDadosConta() {
  if (!sessaoAtual) {
    return;
  }

  const nome = document.getElementById("conta-nome");
  const email = document.getElementById("conta-email");
  const perfil = document.getElementById("conta-perfil");

  const nomesPerfil = {
    USUARIO: t("account.roleUser"),
    MEMBRO: t("account.roleMember"),
    ADMIN: t("account.roleAdmin")
  };

  if (nome) {
    nome.textContent = sessaoAtual.nome;
  }

  if (email) {
    email.textContent = sessaoAtual.email;
  }

  if (perfil) {
    perfil.textContent =
      nomesPerfil[sessaoAtual.perfil] ||
      sessaoAtual.perfil;
  }
}

async function carregarMeusAgendamentos() {
  const carregando =
    document.getElementById("agendamentos-carregando");

  const vazio =
    document.getElementById("agendamentos-vazio");

  const erro =
    document.getElementById("agendamentos-erro");

  try {
    const response = await fetch(
      `${API_BASE_URL}/agendamentos/me`,
      {
        headers: {
          Authorization: `Bearer ${obterToken()}`
        }
      }
    );

    if (response.status === 401) {
      logout();

      window.location.replace(
        "login.html?redirect=minha-conta.html"
      );

      return;
    }

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.error?.message ||
        t("account.schedulesError")
      );
    }

    agendamentosAtuais = result.data;

    carregando.hidden = true;
    erro.hidden = true;

    if (!agendamentosAtuais.length) {
      vazio.hidden = false;
      return;
    }

    vazio.hidden = true;

    renderizarAgendamentos();
  } catch (error) {
    console.error(
      "Erro ao carregar agendamentos:",
      error
    );

    carregando.hidden = true;
    erro.textContent = t("account.schedulesError");
    erro.hidden = false;
  }
}

function renderizarAgendamentos() {
  const lista =
    document.getElementById("lista-agendamentos");

  if (!lista) {
    return;
  }

  lista.innerHTML = "";

  agendamentosAtuais.forEach((agendamento) => {
    lista.appendChild(
      criarCardAgendamento(agendamento)
    );
  });
}

function criarCardAgendamento(agendamento) {
  const card = document.createElement("article");

  card.className = "agendamento-card";

  const data = formatarData(agendamento.data);
  const hora = formatarHora(agendamento.hora);

  const titulo = document.createElement("h3");

  titulo.textContent =
    agendamento.maquina_nome ||
    t("account.equipment");

  const dataHora = document.createElement("p");

  const dataHoraLabel =
    document.createElement("strong");

  dataHoraLabel.textContent =
    `${t("account.dateTime")} `;

  dataHora.appendChild(dataHoraLabel);

  dataHora.append(
    `${data} ${t("account.at")} ${hora}`
  );

  const instituicao = document.createElement("p");

  const instituicaoLabel =
    document.createElement("strong");

  instituicaoLabel.textContent =
    `${t("account.institution")} `;

  instituicao.appendChild(instituicaoLabel);

  instituicao.append(
    agendamento.instituicao || "—"
  );

  const status = document.createElement("p");

  const statusLabel =
    document.createElement("strong");

  statusLabel.textContent =
    `${t("account.status")} `;

  const statusValor =
    document.createElement("span");

  statusValor.className =
    `agendamento-status status-${agendamento.status.toLowerCase()}`;

  const statusTraduzido = {
    PENDENTE: t("account.statusPending"),
    APROVADO: t("account.statusApproved"),
    CANCELADO: t("account.statusCanceled")
  };

  statusValor.textContent =
    statusTraduzido[agendamento.status] ||
    agendamento.status;

  status.appendChild(statusLabel);
  status.appendChild(statusValor);

  card.appendChild(titulo);
  card.appendChild(dataHora);
  card.appendChild(instituicao);
  card.appendChild(status);

  if (agendamento.resumo) {
    const resumo = document.createElement("p");

    const resumoLabel =
      document.createElement("strong");

    resumoLabel.textContent =
      `${t("account.reason")} `;

    resumo.appendChild(resumoLabel);
    resumo.append(agendamento.resumo);

    card.appendChild(resumo);
  }

  return card;
}

function formatarData(valor) {
  if (!valor) {
    return "—";
  }

  const data = new Date(valor);

  return data.toLocaleDateString(
    getLanguage() === "en" ? "en-US" : "pt-BR",
    {
      timeZone: "UTC"
    }
  );
}

function formatarHora(valor) {
  if (!valor) {
    return "—";
  }

  return valor.slice(0, 5);
}

async function carregarAgendamentosAdmin() {
  const painel =
    document.getElementById("painel-admin-agendamentos");

  const carregando =
    document.getElementById("admin-agendamentos-carregando");

  const vazio =
    document.getElementById("admin-agendamentos-vazio");

  const erro =
    document.getElementById("admin-agendamentos-erro");

  if (!painel) {
    return;
  }

  painel.hidden = false;

  try {
    const response = await fetch(
      `${API_BASE_URL}/agendamentos`,
      {
        headers: {
          Authorization: `Bearer ${obterToken()}`
        }
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(t("adminSchedules.error"));
    }

    adminAgendamentosAtuais = result.data;

    carregando.hidden = true;
    erro.hidden = true;

    if (!adminAgendamentosAtuais.length) {
      vazio.hidden = false;
      return;
    }

    vazio.hidden = true;

    renderizarAgendamentosAdmin();
  } catch (error) {
    console.error(error);

    carregando.hidden = true;
    erro.textContent = t("adminSchedules.error");
    erro.hidden = false;
  }
}

function renderizarAgendamentosAdmin() {
  const lista =
    document.getElementById("admin-lista-agendamentos");

  if (!lista) {
    return;
  }

  lista.innerHTML = "";

  adminAgendamentosAtuais.forEach((agendamento) => {
    lista.appendChild(
      criarCardAgendamentoAdmin(agendamento)
    );
  });
}

function criarCardAgendamentoAdmin(agendamento) {
  const card = document.createElement("article");

  card.className = "agendamento-card";

  const titulo = document.createElement("h3");

  titulo.textContent =
    agendamento.maquina_nome ||
    t("account.equipment");

  const usuario = document.createElement("p");

  const usuarioLabel =
    document.createElement("strong");

  usuarioLabel.textContent =
    `${t("adminSchedules.user")} `;

  usuario.appendChild(usuarioLabel);

  usuario.append(
    agendamento.nome || "—"
  );

  const instituicao = document.createElement("p");

  const instituicaoLabel =
    document.createElement("strong");

  instituicaoLabel.textContent =
    `${t("account.institution")} `;

  instituicao.appendChild(instituicaoLabel);

  instituicao.append(
    agendamento.instituicao || "—"
  );

  const dataHora = document.createElement("p");

  const dataHoraLabel =
    document.createElement("strong");

  dataHoraLabel.textContent =
    `${t("account.dateTime")} `;

  dataHora.appendChild(dataHoraLabel);

  dataHora.append(
    `${formatarData(agendamento.data)} ` +
    `${t("account.at")} ` +
    `${formatarHora(agendamento.hora)}`
  );

  const status = document.createElement("p");

  const statusLabel =
    document.createElement("strong");

  statusLabel.textContent =
    `${t("account.status")} `;

  const statusValor =
    document.createElement("span");

  statusValor.className =
    `agendamento-status status-${agendamento.status.toLowerCase()}`;

  const statusTraduzido = {
    PENDENTE: t("account.statusPending"),
    APROVADO: t("account.statusApproved"),
    CANCELADO: t("account.statusCanceled")
  };

  statusValor.textContent =
    statusTraduzido[agendamento.status] ||
    agendamento.status;

  status.appendChild(statusLabel);
  status.appendChild(statusValor);

  card.appendChild(titulo);
  card.appendChild(usuario);
  card.appendChild(instituicao);
  card.appendChild(dataHora);
  card.appendChild(status);

  if (agendamento.resumo) {
    const resumo = document.createElement("p");

    const resumoLabel =
      document.createElement("strong");

    resumoLabel.textContent =
      `${t("account.reason")} `;

    resumo.appendChild(resumoLabel);
    resumo.append(agendamento.resumo);

    card.appendChild(resumo);
  }

  const actions =
    document.createElement("div");

  actions.className = "form-actions";

  if (agendamento.status !== "APROVADO") {
    const aprovar =
      document.createElement("button");

    aprovar.type = "button";
    aprovar.className = "btn btn-primary";
    aprovar.textContent =
      t("adminSchedules.approve");

    aprovar.addEventListener(
      "click",
      () => alterarStatusAgendamento(
        agendamento.id,
        "APROVADO"
      )
    );

    actions.appendChild(aprovar);
  }

  if (agendamento.status !== "CANCELADO") {
    const cancelar =
      document.createElement("button");

    cancelar.type = "button";
    cancelar.className = "btn btn-secondary";
    cancelar.textContent =
      t("adminSchedules.cancel");

    cancelar.addEventListener(
      "click",
      () => alterarStatusAgendamento(
        agendamento.id,
        "CANCELADO"
      )
    );

    actions.appendChild(cancelar);
  }

  card.appendChild(actions);

  return card;
}

async function alterarStatusAgendamento(
  agendamentoId,
  novoStatus
) {
  const erro =
    document.getElementById("admin-agendamentos-erro");

  erro.hidden = true;

  try {
    const response = await fetch(
      `${API_BASE_URL}/agendamentos/${agendamentoId}/status`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obterToken()}`
        },

        body: JSON.stringify({
          status: novoStatus
        })
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        t("adminSchedules.updateError")
      );
    }

    const agendamento =
      adminAgendamentosAtuais.find(
        (item) => item.id === agendamentoId
      );

    if (agendamento) {
      agendamento.status = novoStatus;
    }

    renderizarAgendamentosAdmin();

    /*
     * Caso o ADMIN esteja vendo também um agendamento
     * pertencente à própria conta, atualiza a seção
     * "Meus agendamentos".
     */
    const meuAgendamento =
      agendamentosAtuais.find(
        (item) => item.id === agendamentoId
      );

    if (meuAgendamento) {
      meuAgendamento.status = novoStatus;
      renderizarAgendamentos();
    }
  } catch (error) {
    console.error(error);

    erro.textContent =
      t("adminSchedules.updateError");

    erro.hidden = false;
  }
}

async function iniciarPainelNotificacoes() {
  const painel =
    document.getElementById("painel-admin-notificacoes");

  const form =
    document.getElementById("form-notificacoes");

  const email =
    document.getElementById("notificacao-email");

  const emailAtivo =
    document.getElementById("notificacao-email-ativo");

  const erro =
    document.getElementById("notificacao-erro");

  const sucesso =
    document.getElementById("notificacao-sucesso");

  if (!painel || !form) {
    return;
  }

  painel.hidden = false;

  try {
    const response = await fetch(
      `${API_BASE_URL}/notificacoes/config`,
      {
        headers: {
          Authorization: `Bearer ${obterToken()}`
        }
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        t("notifications.loadError")
      );
    }

    email.value =
      result.data.email_destino || "";

    emailAtivo.checked =
      Boolean(result.data.email_ativo);
  } catch (error) {
    console.error(error);

    erro.textContent =
      t("notifications.loadError");

    erro.hidden = false;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    erro.hidden = true;
    sucesso.hidden = true;

    const dados = {
      email_destino:
        email.value.trim() || null,

      email_ativo:
        emailAtivo.checked
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/notificacoes/config`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${obterToken()}`
          },

          body: JSON.stringify(dados)
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          t("notifications.saveError")
        );
      }

      sucesso.textContent =
        t("notifications.success");

      sucesso.hidden = false;
    } catch (error) {
      console.error(error);

      erro.textContent =
        t("notifications.saveError");

      erro.hidden = false;
    }
  });
}

document.addEventListener("languagechange", () => {
  const sucesso =
    document.getElementById("notificacao-sucesso");

  if (sucesso && !sucesso.hidden) {
    sucesso.textContent =
      t("notifications.success");
  }
});