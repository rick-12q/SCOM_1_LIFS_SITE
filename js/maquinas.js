//Esse codigo estava dando problema com a implementaçao das fotos dos equipamentos do lado, dai foi utilizada ajuda de IA para a reestruturaçao do codigo, e agora esta funcionando corretamente. do codigo, especialemnte tirar redundancias. Usei o GPT.
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('lista-maquinas');
  const modal = document.getElementById('modal-agendamento');
  const modalImagem = document.getElementById('modal-imagem');
  const imagemAmpliada = document.getElementById('imagem-ampliada');
  const form = document.getElementById('form-agendamento');
  const btnCancelar = document.getElementById('cancelar-modal');
  const inputMaquinaId = document.getElementById('maquina-id');

  function getMaquinas() {
    return JSON.parse(localStorage.getItem('maquinas')) || [];
  }

  function renderMaquinas() {
    if (!container) return;

    const maquinas = getMaquinas();

    container.innerHTML = maquinas.map(m => `
      <article class="card-maquina">
        <div class="maquina-conteudo">

          <img
            class="imagem-maquina"
            src="${m.imagem}"
            alt="${m.nome}"
          >

          <div class="maquina-info">
            <h3>${m.nome}</h3>

            <p class="text-muted">${m.local}</p>

            <p class="text-muted">
              ${m.fabricante || ''}
              ${m.modelo && m.modelo !== '--' ? ' — ' + m.modelo : ''}
            </p>

            <span class="status ${m.disponivel ? 'disponivel' : 'indisponivel'}">
              <span class="status-dot"></span>
              ${m.disponivel ? 'Disponível' : 'Em uso'}
            </span>

            <div class="card-actions">
              <button
                class="btn btn-primary btn-agendar"
                data-id="${m.id}"
              >
                Agendar
              </button>
            </div>
          </div>

        </div>
      </article>
    `).join('');

    vincularEventos();
  }
//ajuste tecnico com o GEMINI PRO para fazer a imagem clicavel
function vincularEventos() {
  document.querySelectorAll('.btn-agendar').forEach(btn => {
    btn.addEventListener('click', () => {
      inputMaquinaId.value = btn.dataset.id;
      modal.showModal();
    });
  });

  document.querySelectorAll('.imagem-maquina').forEach(img => {
    img.addEventListener('click', () => {
      imagemAmpliada.src = img.src;
      imagemAmpliada.alt = img.alt;
      modalImagem.showModal();
    });
  });
}

btnCancelar?.addEventListener('click', () => {
  modal.close();
});

modalImagem?.addEventListener('click', () => {
  modalImagem.close();
});

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const agendamentos =
      JSON.parse(localStorage.getItem('agendamentos')) || [];

    agendamentos.push({
      id: Date.now(),
      maquinaId: inputMaquinaId.value,
      data: document.getElementById('data-agendamento').value,
      hora: document.getElementById('hora-agendamento').value
    });

    localStorage.setItem(
      'agendamentos',
      JSON.stringify(agendamentos)
    );

    modal.close();
    form.reset();

    alert('Agendamento realizado com sucesso!');
  });

  renderMaquinas();
});