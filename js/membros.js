document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('lista-membros');

  if (!container) {
    return;
  }

  const membros = readStorage('membros');

  if (membros.length === 0) {
    container.innerHTML = '<p class="empty-state">Nenhum membro cadastrado.</p>';
    return;
  }

  container.innerHTML = membros.map((membro) => `
    <article class="card">
      <span class="badge">${escapeHtml(membro.tipo)}</span>
      <h2>${escapeHtml(membro.nome)}</h2>
      <p>Informações acadêmicas e profissionais do integrante do laboratório.</p>
      <p><a href="${escapeAttribute(membro.lattes)}" target="_blank" rel="noopener noreferrer">Currículo Lattes</a></p>
      <p><a href="${escapeAttribute(membro.orcid)}" target="_blank" rel="noopener noreferrer">ORCID</a></p>
    </article>
  `).join('');

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }
});