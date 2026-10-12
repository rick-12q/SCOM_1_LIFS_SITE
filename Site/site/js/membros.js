document.addEventListener("DOMContentLoaded", () => {
  const API_MEMBROS = `${API_BASE_URL}/membros`;

  const container = document.getElementById("lista-membros");

  const painelAdmin = document.getElementById("painel-admin-membros");
  const btnAdicionar = document.getElementById("adicionar-membro");

  const modalAdmin = document.getElementById("modal-admin-membro");
  const formAdmin = document.getElementById("form-admin-membro");
  const btnCancelarAdmin = document.getElementById("cancelar-admin-membro");

  const tituloModalAdmin = document.getElementById(
    "titulo-modal-admin-membro"
  );

  const erroAdmin = document.getElementById("erro-admin-membro");

  const adminId = document.getElementById("admin-membro-id");
  const adminNome = document.getElementById("admin-membro-nome");
  const adminTipo = document.getElementById("admin-membro-tipo");
  const adminSituacao = document.getElementById("admin-membro-situacao");
  const adminImagem = document.getElementById("admin-membro-imagem");
  const adminLattes = document.getElementById("admin-membro-lattes");
  const adminOrcid = document.getElementById("admin-membro-orcid");
  const adminEmail = document.getElementById("admin-membro-email");

  let membros = [];

  function usuarioEhAdmin() {
    const sessao = usuarioLogado();

    return sessao?.perfil === "ADMIN";
  }

  function escaparHtml(valor) {
    return String(valor ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getMemberType(tipo) {
  const translations = {
    "Docente chefe do grupo": "members.professor",
    "Aluno de iniciação científica": "members.undergraduate",
    "Aluno de mestrado": "members.master",
    "Aluno de doutorado": "members.phd",
    "Aluno de pós-doutorado": "members.postdoc",
    "Aluna de intercâmbio": "members.exchange",
    "Aluno de intercâmbio": "members.exchange"
  };

    return translations[tipo]
      ? t(translations[tipo])
      : tipo;
  }

  async function getMembros() {
    const response = await fetch(API_MEMBROS);

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.error?.message ||
        "Não foi possível carregar os membros."
      );
    }

    return result.data;
  }

  function atualizarPainelAdmin() {
    if (!painelAdmin) return;

    painelAdmin.hidden = !usuarioEhAdmin();
  }

  async function renderMembros() {
    if (!container) return;

    try {
      membros = await getMembros();

      if (membros.length === 0) {
        container.innerHTML = `
          <p class="empty-state">
            ${t("members.emptyCategory")}
          </p>
        `;

        return;
      }

      const admin = usuarioEhAdmin();

      container.innerHTML = membros.map((membro) => {
        const id = Number(membro.id);
        const nome = escaparHtml(membro.nome);
        const tipo = escaparHtml(
          getMemberType(membro.tipo)
        );

        const imagem = escaparHtml(
          membro.imagem || "img/membros/none.jpg"
        );

        const lattes = escaparHtml(membro.lattes);
        const orcid = escaparHtml(membro.orcid);
        const email = escaparHtml(membro.email);

        return `
          <article class="card-membro">
            <div class="membro-conteudo">

              <img
                class="imagem-membro"
                src="${imagem}"
                alt="${t("members.photo")} ${nome}"
              >

              <div class="membro-info">
                <h3>${nome}</h3>

                <p class="text-muted">
                  ${tipo}
                </p>

                <ul class="links-membro">

                  ${membro.lattes ? `
                    <li>
                      <a
                        href="${lattes}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="link-academico"
                      >
                        <img
                          src="img/logos/LOGO_LATTES.png"
                          alt="Lattes"
                        >
                        <span>
                          ${t("members.lattes")}
                        </span>
                      </a>
                    </li>
                  ` : ""}

                  ${membro.orcid ? `
                    <li>
                      <a
                        href="${orcid}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="link-academico"
                      >
                        <img
                          src="img/logos/LOGO_ORCID.png"
                          alt="ORCID"
                        >
                        <span>
                          ${t("members.orcid")}
                        </span>
                      </a>
                    </li>
                  ` : ""}

                  ${membro.email ? `
                    <li class="email-membro">
                      <a href="mailto:${email}">
                        ${email}
                      </a>
                    </li>
                  ` : ""}

                </ul>

                ${admin ? `
                  <div class="acoes-admin-membro">

                    <button
                      class="btn btn-secondary btn-editar-membro"
                      data-id="${id}"
                      type="button"
                    >
                      ${t("members.edit")}
                    </button>

                    <button
                      class="btn btn-secondary btn-excluir-membro"
                      data-id="${id}"
                      type="button"
                    >
                      ${t("members.delete")}
                    </button>

                  </div>
                ` : ""}

              </div>
            </div>
          </article>
        `;
      }).join("");

      vincularEventosAdmin();
    } catch (error) {
      container.innerHTML = `
        <p class="form-error">
          ${escaparHtml(error.message)}
        </p>
      `;
    }
  }

  function limparFormularioAdmin() {
    formAdmin.reset();

    adminId.value = "";
    adminSituacao.value = "atual";

    erroAdmin.textContent = "";
    erroAdmin.hidden = true;
  }

  function abrirNovoMembro() {
    limparFormularioAdmin();

    tituloModalAdmin.dataset.i18n =
      "members.adminAddTitle";

    tituloModalAdmin.textContent =
      t("members.adminAddTitle");

    modalAdmin.showModal();
  }

  function abrirEdicaoMembro(id) {
    const membro = membros.find(
      (item) => Number(item.id) === Number(id)
    );

    if (!membro) return;

    limparFormularioAdmin();

    tituloModalAdmin.dataset.i18n =
      "members.adminEditTitle";

    tituloModalAdmin.textContent =
      t("members.adminEditTitle");

    adminId.value = membro.id;
    adminNome.value = membro.nome || "";
    adminTipo.value = membro.tipo || "";
    adminSituacao.value = membro.situacao || "atual";
    adminImagem.value = membro.imagem || "";
    adminLattes.value = membro.lattes || "";
    adminOrcid.value = membro.orcid || "";
    adminEmail.value = membro.email || "";

    modalAdmin.showModal();
  }

  async function salvarMembro(event) {
    event.preventDefault();

    if (!usuarioEhAdmin()) return;

    erroAdmin.hidden = true;
    erroAdmin.textContent = "";

    const dados = {
      nome: adminNome.value.trim(),
      tipo: adminTipo.value.trim(),
      situacao: adminSituacao.value,
      imagem: adminImagem.value.trim() || null,
      lattes: adminLattes.value.trim() || null,
      orcid: adminOrcid.value.trim() || null,
      email: adminEmail.value.trim() || null
    };

    if (!dados.nome || !dados.tipo) {
      erroAdmin.textContent =
        t("members.adminRequired");

      erroAdmin.hidden = false;

      return;
    }

    const id = adminId.value;

    const url = id
      ? `${API_MEMBROS}/${id}`
      : API_MEMBROS;

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
          t("members.adminSaveError")
        );
      }

      modalAdmin.close();
      limparFormularioAdmin();

      await renderMembros();
    } catch (error) {
      erroAdmin.textContent = error.message;
      erroAdmin.hidden = false;
    }
  }

  async function excluirMembro(id) {
    if (!usuarioEhAdmin()) return;

    const membro = membros.find(
      (item) => Number(item.id) === Number(id)
    );

    if (!membro) return;

    const confirmar = window.confirm(
      `${t("members.adminDeleteConfirm")} "${membro.nome}"?`
    );

    if (!confirmar) return;

    try {
      const response = await fetch(
        `${API_MEMBROS}/${id}`,
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
          t("members.adminDeleteError")
        );
      }

      await renderMembros();
    } catch (error) {
      window.alert(error.message);
    }
  }

  function vincularEventosAdmin() {
    document
      .querySelectorAll(".btn-editar-membro")
      .forEach((botao) => {
        botao.addEventListener("click", () => {
          abrirEdicaoMembro(botao.dataset.id);
        });
      });

    document
      .querySelectorAll(".btn-excluir-membro")
      .forEach((botao) => {
        botao.addEventListener("click", () => {
          excluirMembro(botao.dataset.id);
        });
      });
  }

  btnAdicionar?.addEventListener(
    "click",
    abrirNovoMembro
  );

  btnCancelarAdmin?.addEventListener(
    "click",
    () => {
      modalAdmin.close();
      limparFormularioAdmin();
    }
  );

  formAdmin?.addEventListener(
    "submit",
    salvarMembro
  );

  atualizarPainelAdmin();
  renderMembros();

  document.addEventListener(
    "languagechange",
    () => {
      renderMembros();
    }
  );
});