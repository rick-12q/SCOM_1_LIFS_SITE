document.addEventListener("DOMContentLoaded", () => {
  const API_MAQUINAS = `${API_BASE_URL}/maquinas`;

  const container = document.getElementById("lista-maquinas");

  // Agendamento
  const modal = document.getElementById("modal-agendamento");
  const modalImagem = document.getElementById("modal-imagem");
  const imagemAmpliada = document.getElementById("imagem-ampliada");
  const form = document.getElementById("form-agendamento");
  const btnCancelar = document.getElementById("cancelar-modal");
  const inputMaquinaId = document.getElementById("maquina-id");

  // Administração
  const painelAdmin = document.getElementById("painel-admin-maquinas");
  const btnAdicionar = document.getElementById("adicionar-maquina");
  const modalAdmin = document.getElementById("modal-admin-maquina");
  const formAdmin = document.getElementById("form-admin-maquina");
  const btnCancelarAdmin = document.getElementById("cancelar-admin-maquina");
  const tituloModalAdmin = document.getElementById(
    "titulo-modal-admin-maquina"
  );
  const erroAdmin = document.getElementById("erro-admin-maquina");

  const adminId = document.getElementById("admin-maquina-id");
  const adminNome = document.getElementById("admin-maquina-nome");
  const adminFabricante = document.getElementById(
    "admin-maquina-fabricante"
  );
  const adminModelo = document.getElementById("admin-maquina-modelo");
  const adminImagem = document.getElementById("admin-maquina-imagem");
  const adminLocal = document.getElementById("admin-maquina-local");
  const adminDescricao = document.getElementById(
    "admin-maquina-descricao"
  );
  const adminDisponivel = document.getElementById(
    "admin-maquina-disponivel"
  );

  let maquinas = [];

  function usuarioEhAdmin() {
    const sessao = usuarioLogado();
    return sessao?.perfil === "ADMIN";
  }

  async function getMaquinas() {
    const response = await fetch(API_MAQUINAS);

    if (!response.ok) {
      throw new Error("Não foi possível carregar as máquinas.");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error("Não foi possível carregar as máquinas.");
    }

    return result.data;
  }

  function escaparHtml(valor) {
    return String(valor ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getMachineName(machine) {
    return machine.nome || "";
  }

  function getMachineDescription(machine) {
    if (machine.descricao) {
      return machine.descricao;
    }

    const keys = {
      1: "machines.r1Description",
      2: "machines.r2Description",
      3: "machines.afmDescription",
      4: "machines.uvvisDescription",
      5: "machines.probeDescription",
      6: "machines.rfDescription"
    };

    if (!keys[machine.id]) {
      return "";
    }

    return t(keys[machine.id]) || "";
  }

  function getMachineManufacturer(machine) {
    if (!machine.fabricante) {
      return "";
    }

    if (
      machine.fabricante === "Fabricação própria do laboratório"
    ) {
      return t("machines.labManufactured");
    }

    return machine.fabricante;
  }

  function atualizarPainelAdmin() {
    if (!painelAdmin) {
      return;
    }

    painelAdmin.hidden = !usuarioEhAdmin();
  }

  async function renderMaquinas() {
    if (!container) {
      return;
    }

    try {
      maquinas = await getMaquinas();
    } catch (error) {
      console.error(error);

      container.innerHTML = `
        <p class="form-error">
          Não foi possível carregar os equipamentos.
        </p>
      `;

      return;
    }

    const admin = usuarioEhAdmin();

    container.innerHTML = maquinas
      .map((m) => {
        const nome = escaparHtml(getMachineName(m));
        const local = escaparHtml(m.local || "");
        const fabricante = escaparHtml(
          getMachineManufacturer(m)
        );
        const modelo = escaparHtml(m.modelo || "");
        const descricao = escaparHtml(
          getMachineDescription(m)
        );
        const imagem = escaparHtml(m.imagem || "");
        const id = Number(m.id);

        return `
          <article class="card-maquina">
            <div class="maquina-conteudo">

              ${
                imagem
                  ? `
                    <img
                      class="imagem-maquina"
                      src="${imagem}"
                      alt="${nome}"
                    >
                  `
                  : ""
              }

              <div class="maquina-info">
                <h3>${nome}</h3>

                <p class="text-muted">${local}</p>

                <p class="text-muted">
                  ${fabricante}
                  ${
                    modelo && modelo !== "--"
                      ? " — " + modelo
                      : ""
                  }
                </p>

                <p class="maquina-descricao">
                  ${descricao}
                </p>

                <span
                  class="status ${
                    m.disponivel
                      ? "disponivel"
                      : "indisponivel"
                  }"
                >
                  <span class="status-dot"></span>

                  ${
                    m.disponivel
                      ? t("machines.available")
                      : t("machines.inUse")
                  }
                </span>

                <div class="card-actions">
                  <button
                    class="btn btn-primary btn-agendar"
                    data-id="${id}"
                  >
                    ${t("machines.schedule")}
                  </button>

                  ${
                    admin
                      ? `
                        <button
                          class="btn btn-secondary btn-editar-maquina"
                          data-id="${id}"
                          type="button"
                        >
                          ${t("machines.edit")}
                        </button>
                                          
                        <button
                          class="btn btn-secondary btn-excluir-maquina"
                          data-id="${id}"
                          type="button"
                        >
                          ${t("machines.delete")}
                        </button>
                      `
                      : ""
                  }
                </div>
              </div>

            </div>
          </article>
        `;
      })
      .join("");

    vincularEventos();
  }

  function vincularEventos() {
    document.querySelectorAll(".btn-agendar").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!usuarioLogado()) {
          window.location.href =
            "login.html?redirect=maquinas.html";
          return;
        }
      
        inputMaquinaId.value = btn.dataset.id;
        modal.showModal();
      });
    });

    document.querySelectorAll(".imagem-maquina").forEach((img) => {
      img.addEventListener("click", () => {
        imagemAmpliada.src = img.src;
        imagemAmpliada.alt = img.alt;
        modalImagem.showModal();
      });
    });

    document
      .querySelectorAll(".btn-editar-maquina")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          abrirEdicaoMaquina(Number(btn.dataset.id));
        });
      });

    document
      .querySelectorAll(".btn-excluir-maquina")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          excluirMaquina(Number(btn.dataset.id));
        });
      });
  }

  function limparFormularioAdmin() {
    formAdmin.reset();

    adminId.value = "";
    adminDisponivel.checked = true;

    if (erroAdmin) {
      erroAdmin.hidden = true;
      erroAdmin.textContent = "";
    }
  }

  function abrirNovaMaquina() {
    limparFormularioAdmin();

    tituloModalAdmin.textContent = t("machines.adminAddTitle");

    modalAdmin.showModal();
  }

  function abrirEdicaoMaquina(id) {
    const maquina = maquinas.find(
      (item) => Number(item.id) === Number(id)
    );

    if (!maquina) {
      return;
    }

    limparFormularioAdmin();

    tituloModalAdmin.textContent = t("machines.adminEditTitle");

    adminId.value = maquina.id;
    adminNome.value = maquina.nome || "";
    adminFabricante.value = maquina.fabricante || "";
    adminModelo.value = maquina.modelo || "";
    adminImagem.value = maquina.imagem || "";
    adminLocal.value = maquina.local || "";
    adminDescricao.value = maquina.descricao || "";
    adminDisponivel.checked = Boolean(maquina.disponivel);

    modalAdmin.showModal();
  }

  async function salvarMaquina(event) {
    event.preventDefault();

    if (!usuarioEhAdmin()) {
      return;
    }

    const id = adminId.value;

    const dados = {
      nome: adminNome.value.trim(),
      fabricante: adminFabricante.value.trim(),
      modelo: adminModelo.value.trim(),
      imagem: adminImagem.value.trim(),
      local: adminLocal.value.trim(),
      descricao: adminDescricao.value.trim(),
      disponivel: adminDisponivel.checked
    };

    if (!dados.nome) {
      erroAdmin.textContent = t("machines.adminNameRequired");
      erroAdmin.hidden = false;
      return;
    }

    const url = id
      ? `${API_MAQUINAS}/${id}`
      : API_MAQUINAS;

    const method = id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obterToken()}`
        },
        body: JSON.stringify(dados)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error?.message ||
            "Não foi possível salvar o equipamento."
        );
      }

      modalAdmin.close();
      limparFormularioAdmin();

      await renderMaquinas();
    } catch (error) {
      console.error(error);

      erroAdmin.textContent = error.message;
      erroAdmin.hidden = false;
    }
  }

  async function excluirMaquina(id) {
    if (!usuarioEhAdmin()) {
      return;
    }

    const maquina = maquinas.find(
      (item) => Number(item.id) === Number(id)
    );

    if (!maquina) {
      return;
    }

    const confirmar = window.confirm(
      `${t("machines.adminDeleteConfirm")} "${maquina.nome}"?`
    );
    if (!confirmar) {
      return;
    }

    try {
      const response = await fetch(
        `${API_MAQUINAS}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${obterToken()}`
          }
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error?.message ||
            "Não foi possível excluir o equipamento."
        );
      }

      await renderMaquinas();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  // Eventos do painel ADMIN
  btnAdicionar?.addEventListener(
    "click",
    abrirNovaMaquina
  );

  btnCancelarAdmin?.addEventListener("click", () => {
    modalAdmin.close();
    limparFormularioAdmin();
  });

  formAdmin?.addEventListener("submit", salvarMaquina);

  // Eventos do agendamento atual
  btnCancelar?.addEventListener("click", () => {
    modal.close();
  });

  modalImagem?.addEventListener("click", () => {
    modalImagem.close();
  });

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const token = obterToken();
  
    if (!token) {
      alert("Você precisa estar logado para realizar um agendamento.");
      return;
    }
  
    const dados = {
      maquina_id: Number(inputMaquinaId.value),
      nome: document.getElementById("nome-agendamento").value.trim(),
      instituicao: document
        .getElementById("instituicao-agendamento")
        .value.trim(),
      resumo: document
        .getElementById("resumo-agendamento")
        .value.trim(),
      data: document.getElementById("data-agendamento").value,
      hora: document.getElementById("hora-agendamento").value
    };
  
    try {
      const response = await fetch(`${API_BASE_URL}/agendamentos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dados)
      });
    
      const resultado = await response.json();
    
      if (!response.ok) {
        if (resultado.error?.code === "SCHEDULE_CONFLICT") {
          alert(t("machines.conflict"));
          return;
        }
      
        if (resultado.error?.code === "INVALID_DATE") {
          alert(resultado.error.message);
          return;
        }
      
        alert(
          resultado.error?.message ||
            "Não foi possível realizar o agendamento."
        );
        return;
      }
    
      modal.close();
      form.reset();
    
      alert(t("machines.success"));
    } catch (error) {
      console.error("Erro ao realizar agendamento:", error);
    
      alert(
        "Não foi possível conectar ao servidor para realizar o agendamento."
      );
    }
  });

  atualizarPainelAdmin();
  renderMaquinas();

  document.addEventListener("languagechange", () => {
    renderMaquinas();
  });
});