document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  if (!form) {
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const titulo = document.querySelector('#titulo')?.value.trim();
    const autores = document.querySelector('#autores')?.value.trim();
    const ano = document.querySelector('#ano')?.value.trim();
    const tipo = document.querySelector('#tipo')?.value.trim();
    const arquivo = document.querySelector('#arquivo')?.files[0];

    if (!titulo || !autores || !ano || !tipo) {
      alert(t('work.required'));
      return;
    }

    const token = obterToken();

    if (!token) {
      window.location.href =
        'login.html?redirect=adicionar-trabalho.html';
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/trabalhos`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            titulo,
            autores,
            ano: Number(ano),
            tipo: tipo.toLowerCase(),
            arquivo: arquivo ? arquivo.name : ''
          })
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        logout();

        window.location.href =
          'login.html?redirect=adicionar-trabalho.html';

        return;
      }

      if (!response.ok || !result.success) {
        const mensagem =
          result?.error?.message ||
          'Não foi possível cadastrar o trabalho.';

        alert(mensagem);
        return;
      }

      alert(t('work.success'));
      form.reset();
    } catch (error) {
      console.error('Erro ao cadastrar trabalho:', error);

      alert('Não foi possível conectar com o servidor.');
    }
  });
});