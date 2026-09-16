document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('lista-trabalhos');
  const filtroTipo = document.getElementById('filtro-tipo');
  const filtroAno = document.getElementById('filtro-ano');

  if (!container) {
    return;
  }
// eu leio o localstorage, so p demo do frontend. As vezes da pau e preciso limpar o localstorage do browser. 
  const trabalhos = JSON.parse(localStorage.getItem('trabalhos') || '[]');

  function render() {
    const tipo = filtroTipo?.value ?? 'todos';
    const ano = filtroAno?.value ?? 'todos';

    const filtrados = trabalhos.filter((trabalho) => {
      const correspondeTipo = tipo === 'todos' || trabalho.tipo.toLowerCase() === tipo;
      const correspondeAno = ano === 'todos' || String(trabalho.ano) === ano;
      return correspondeTipo && correspondeAno;
    });

    if (filtrados.length === 0) {
      container.innerHTML = `<p class="empty-state">${t('repository.empty')}</p>`;
      return;
    }
//aqui foi usada IA para funcionar.
    container.innerHTML = filtrados.map((trabalho) => `
      <article class="card">
        <span class="badge">${escapeHtml(trabalho.tipo)}</span>
        <h2>${escapeHtml(trabalho.titulo)}</h2>
        <p><strong>${t('repository.authors')}</strong> ${escapeHtml(trabalho.autores)}</p>
        <p><strong>${t('repository.year')}</strong> ${escapeHtml(String(trabalho.ano))}</p>
        <p class="help-text">${t('repository.record')}</p>
      </article>
    `).join('');
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  filtroTipo?.addEventListener('change', render);
  filtroAno?.addEventListener('change', render);
  render();
  document.addEventListener('languagechange', render);
});