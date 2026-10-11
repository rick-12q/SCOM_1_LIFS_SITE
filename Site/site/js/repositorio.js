document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('lista-trabalhos');
  const filtroTipo = document.getElementById('filtro-tipo');
  const filtroAno = document.getElementById('filtro-ano');

  if (!container) {
    return;
  }

  let trabalhos = [];

  async function carregarTrabalhos() {
    try {
      const response = await fetch('http://localhost:3000/api/trabalhos');
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error('Erro ao carregar trabalhos.');
      }

      trabalhos = result.data;
      render();
    } catch (error) {
      console.error('Erro ao carregar trabalhos:', error);

      container.innerHTML =
        '<p class="empty-state">Não foi possível carregar os trabalhos.</p>';
    }
  }

  function render() {
    const tipo = filtroTipo?.value ?? 'todos';
    const ano = filtroAno?.value ?? 'todos';

    const filtrados = trabalhos.filter((trabalho) => {
      const correspondeTipo =
        tipo === 'todos' ||
        trabalho.tipo.toLowerCase() === tipo.toLowerCase();

      const correspondeAno =
        ano === 'todos' ||
        String(trabalho.ano) === ano;

      return correspondeTipo && correspondeAno;
    });

    if (filtrados.length === 0) {
      container.innerHTML =
        `<p class="empty-state">${t('repository.empty')}</p>`;
      return;
    }

    container.innerHTML = filtrados.map((trabalho) => `
      <article class="card">
        <span class="badge">${escapeHtml(trabalho.tipo)}</span>
        <h2>${escapeHtml(trabalho.titulo)}</h2>
        <p>
          <strong>${t('repository.authors')}</strong>
          ${escapeHtml(trabalho.autores)}
        </p>
        <p>
          <strong>${t('repository.year')}</strong>
          ${escapeHtml(String(trabalho.ano))}
        </p>
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

  document.addEventListener('languagechange', render);

  await carregarTrabalhos();
});