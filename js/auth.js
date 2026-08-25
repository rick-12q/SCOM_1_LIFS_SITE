const USUARIOS_VALIDOS = [
  { email: "membro@lab.edu", senha: "123456", nome: "Membro Teste" }
];

function login(email, senha) {
  const usuario = USUARIOS_VALIDOS.find(u => u.email === email && u.senha === senha);
  if (usuario) {
    localStorage.setItem('sessao', JSON.stringify({ nome: usuario.nome, logado: true }));
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem('sessao');
}

function usuarioLogado() {
  const sessao = localStorage.getItem('sessao');
  return sessao ? JSON.parse(sessao) : null;
}

// TRECHO GERADO POR IA, EU USEI O GPT no RACIOCINIO
const form = document.getElementById('login-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const erro = document.getElementById('login-erro');

  if (login(email, senha)) {
    window.location.href = 'index.html';
  } else {
    erro.hidden = false;
  }
});

function atualizarHeaderAuth() {
  const btnLogin = document.querySelector('.btn-login');
  const sessao = usuarioLogado();
  if (btnLogin && sessao) {
    btnLogin.textContent = `Sair (${sessao.nome})`;
    btnLogin.setAttribute('href', '#');
    btnLogin.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
      window.location.reload();
    });
  }
}
atualizarHeaderAuth();