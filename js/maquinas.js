document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('lista-maquinas');
  const modal = document.getElementById('modal-agendamento');
  const form = document.getElementById('form-agendamento');
  const btnCancelar = document.getElementById('cancelar-modal');
  const inputMaquinaId = document.getElementById('maquina-id');

  // Renderiza máquinas vindas do localStorage
  function renderMaquinas() {
    const maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];
    if (!container) return;
//Parte adequafda com ajuda do GPT para adequar as adcoes de descricao das maquinas
container.innerHTML = maquinas.map(m => `
  <article class="card-maquina">
    <h3>${m.nome}</h3>
    <p><strong>Fabricante:</strong> ${m.fabricante || 'Não informado'}</p>
    <p><strong>Modelo:</strong> ${m.modelo || 'Não informado'}</p>
    <p><strong>Local:</strong> ${m.local}</p>
    <p><strong>Descrição:</strong> ${m.descricao || 'Não informado'}</p>
    <button class="btn btn-primary btn-agendar" data-id="${m.id}">Agendar</button>
  </article>
`).join('');

    vincularEventos();
  }

  // Ativa os botões de abrir o modal
  function vincularEventos() {
    document.querySelectorAll('.btn-agendar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        inputMaquinaId.value = e.target.getAttribute('data-id');
        modal.showModal(); // API nativa HTML5
      });
    });
  }

  // Botão fechar modal
  btnCancelar?.addEventListener('click', () => modal.close());

  // Salva o agendamento no localStorage
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    
    agendamentos.push({
      id: Date.now(),
      maquinaId: inputMaquinaId.value,
      data: document.getElementById('data-agendamento').value,
      hora: document.getElementById('hora-agendamento').value
    });

    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    modal.close();
    form.reset();
    alert('Agendamento realizado com sucesso!');
  });

  renderMaquinas();
});