function getMembros() {
  return JSON.parse(localStorage.getItem("membros")) || [];
}
function getMemberType(tipo) {
  const translations = {
    "Docente chefe do grupo": "members.professor",
    "Aluno de iniciação científica": "members.undergraduate",
    "Aluno de doutorado": "members.phd",
    "Aluno de pós-doutorado": "members.postdoc",
    "Aluna de intercâmbio": "members.exchange",
    "Aluno de intercâmbio": "members.exchange"
  };

  return translations[tipo] ? t(translations[tipo]) : tipo;
}

function renderMembros(situacao) {
  const container = document.getElementById("lista-membros");
  if (!container) return;

  const membros = getMembros().filter(m => m.situacao === situacao);

  if (membros.length === 0) {
    container.innerHTML = `<p class="empty-state">${t('members.emptyCategory')}</p>`;
    return;
  }

  container.innerHTML = membros.map(m => `
    <article class="card-membro">
      <div class="membro-conteudo">

        <img
          class="imagem-membro"
          src="${m.imagem}"
          alt="${t('members.photo')} ${m.nome}"
        >

        <div class="membro-info">
          <h3>${m.nome}</h3>

          <p class="text-muted">${getMemberType(m.tipo)}</p>

          <ul class="links-membro">
            ${m.lattes ? `
              <li>
                <a href="${m.lattes}" target="_blank" rel="noopener noreferrer" class="link-academico">
                  <img src="img/logos/LOGO_LATTES.png" alt="Lattes">
                  <span>${t('members.lattes')}</span>
                </a>
              </li>
            ` : ''}
            
            ${m.orcid ? `
              <li>
                <a href="${m.orcid}" target="_blank" rel="noopener noreferrer" class="link-academico">
                  <img src="img/logos/LOGO_ORCID.png" alt="ORCID">
                  <span>${t('members.orcid')}</span>
                </a>
              </li>
            ` : ''}

            ${EMAIL_MEMBROS[m.nome] ? `
              <li class="email-membro">
                <a href="mailto:${EMAIL_MEMBROS[m.nome]}">
                  ${t('members.email')}
                </a>
              </li>
            ` : ''}
          </ul>
        </div>

      </div>
    </article>
  `).join("");
}

function initTabsMembros() {
  const tabs = document.querySelectorAll(".membros-tabs button");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.setAttribute("aria-selected", "false"));

      tab.setAttribute("aria-selected", "true");

      renderMembros(tab.dataset.situacao);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("lista-membros")) {
    initTabsMembros();
    renderMembros("atual");
  }
});

document.addEventListener("languagechange", () => {
  renderMembros("atual");
});