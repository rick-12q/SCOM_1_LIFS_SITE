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
      const response = await fetch(`${API_BASE_URL}/trabalhos`);
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

  function podeGerenciar(trabalho) {
    const sessao = usuarioLogado();

    if (!sessao) {
      return false;
    }

    return (
      sessao.perfil === 'ADMIN' ||
      Number(trabalho.created_by) === Number(sessao.id)
    );
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

    container.innerHTML = filtrados.map((trabalho) => {
      const acoes = podeGerenciar(trabalho)
        ? `
          <div class="card-actions">
            <button
              type="button"
              class="btn btn-secondary btn-editar-trabalho"
              data-id="${trabalho.id}"
            >
              Editar
            </button>

            <button
              type="button"
              class="btn btn-secondary btn-excluir-trabalho"
              data-id="${trabalho.id}"
            >
              Excluir
            </button>
          </div>
        `
        : '';

      return `
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

          <p class="help-text">
            Cadastrado por: ${escapeHtml(trabalho.criado_por ?? '')}
          </p>

          ${acoes}
        </article>
      `;
    }).join('');

    adicionarEventosAcoes();
  }

  function adicionarEventosAcoes() {
    document
      .querySelectorAll('.btn-editar-trabalho')
      .forEach((botao) => {
        botao.addEventListener('click', () => {
          editarTrabalho(Number(botao.dataset.id));
        });
      });

    document
      .querySelectorAll('.btn-excluir-trabalho')
      .forEach((botao) => {
        botao.addEventListener('click', () => {
          excluirTrabalho(Number(botao.dataset.id));
        });
      });
  }

  async function editarTrabalho(id) {
    const trabalho = trabalhos.find(
      (item) => Number(item.id) === Number(id)
    );

    if (!trabalho || !podeGerenciar(trabalho)) {
      return;
    }

    const titulo = prompt('Título:', trabalho.titulo);

    if (titulo === null) {
      return;
    }

    const autores = prompt('Autores:', trabalho.autores);

    if (autores === null) {
      return;
    }

    const ano = prompt('Ano:', trabalho.ano);

    if (ano === null) {
      return;
    }

    const tipo = prompt('Tipo:', trabalho.tipo);

    if (tipo === null) {
      return;
    }

    if (
      !titulo.trim() ||
      !autores.trim() ||
      !ano.trim() ||
      !tipo.trim()
    ) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const token = obterToken();

    if (!token) {
      window.location.href = 'login.html';
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/trabalhos/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            titulo: titulo.trim(),
            autores: autores.trim(),
            ano: Number(ano),
            tipo: tipo.trim().toLowerCase(),
            arquivo: trabalho.arquivo || ''
          })
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        logout();
        window.location.href = 'login.html';
        return;
      }

      if (!response.ok || !result.success) {
        alert(
          result?.error?.message ||
          'Não foi possível editar o trabalho.'
        );
        return;
      }

      await carregarTrabalhos();
    } catch (error) {
      console.error('Erro ao editar trabalho:', error);
      alert('Não foi possível conectar com o servidor.');
    }
  }

  async function excluirTrabalho(id) {
    const trabalho = trabalhos.find(
      (item) => Number(item.id) === Number(id)
    );

    if (!trabalho || !podeGerenciar(trabalho)) {
      return;
    }

    const confirmado = confirm(
      `Deseja realmente excluir "${trabalho.titulo}"?`
    );

    if (!confirmado) {
      return;
    }

    const token = obterToken();

    if (!token) {
      window.location.href = 'login.html';
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/trabalhos/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        logout();
        window.location.href = 'login.html';
        return;
      }

      if (!response.ok || !result.success) {
        alert(
          result?.error?.message ||
          'Não foi possível excluir o trabalho.'
        );
        return;
      }

      await carregarTrabalhos();
    } catch (error) {
      console.error('Erro ao excluir trabalho:', error);
      alert('Não foi possível conectar com o servidor.');
    }
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