const USUARIOS_VALIDOS = [
  {
    email: "membro@lab.edu",
    senha: "123456",
    nome: "Membro Teste"
  }
];

function login(email, senha) {
  const usuario = USUARIOS_VALIDOS.find(
    (item) => item.email === email.trim().toLowerCase() && item.senha === senha
  );

  if (!usuario) {
    return false;
  }

  localStorage.setItem(
    "sessao",
    JSON.stringify({ nome: usuario.nome, email: usuario.email, logado: true })
  );

  return true;
}

function logout() {
  localStorage.removeItem("sessao");
}

function usuarioLogado() {
  try {
    const sessao = JSON.parse(localStorage.getItem("sessao"));
    return sessao?.logado ? sessao : null;
  } catch {
    return null;
  }
}

function atualizarHeaderAuth() {
  const btnLogin = document.querySelector(".btn-login");
  const sessao = usuarioLogado();

  if (!btnLogin || !sessao) {
    return;
  }

  btnLogin.textContent = "Sair";
  btnLogin.setAttribute("href", "#");
  btnLogin.setAttribute("aria-label", `Sair da conta de ${sessao.nome}`);

  btnLogin.addEventListener("click", (event) => {
    event.preventDefault();
    logout();
    window.location.reload();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const erro = document.getElementById("login-erro");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email")?.value ?? "";
    const senha = document.getElementById("senha")?.value ?? "";

    if (login(email, senha)) {
      window.location.href = "index.html";
      return;
    }

    if (erro) {
      erro.hidden = false;
    }
  });

  const protectedPage = document.body.dataset.protected === "true";
  if (protectedPage && !usuarioLogado()) {
    window.location.replace("login.html?redirect=adicionar-trabalho.html");
    return;
  }

  atualizarHeaderAuth();
});