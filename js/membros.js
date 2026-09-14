function getMembros() {
  return JSON.parse(localStorage.getItem("membros")) || [];
}

function renderMembros(situacao) {
  const container = document.getElementById("lista-membros");
  if (!container) return;

  const membros = getMembros().filter(m => m.situacao === situacao);

  if (membros.length === 0) {
    container.innerHTML = `<p class="empty-state">Nenhum membro cadastrado nesta categoria.</p>`;
    return;
  }

  container.innerHTML = membros.map(m => `
    <article class="card-membro">
      <div class="membro-conteudo">

        <img
          class="imagem-membro"
          src="${m.imagem}"
          alt="Foto de ${m.nome}"
        >

        <div class="membro-info">
          <h3>${m.nome}</h3>

          <p class="text-muted">${m.tipo}</p>

          <ul class="links-membro">
            ${m.lattes !== "-" ? `
              <li>
                <a href="${m.lattes}" target="_blank" rel="noopener noreferrer">
                  Lattes
                </a>
              </li>
            ` : ''}

            ${m.orcid !== "-" ? `
              <li>
                <a href="https://orcid.org/${m.orcid}" target="_blank" rel="noopener noreferrer">
                  ORCID
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