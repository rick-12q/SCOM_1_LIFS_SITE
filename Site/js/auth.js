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
//EU estava tendo mto problema com a estrutura anterior, principalmente ao navegar, atualizar pag. etc, ele perdia a sessão, dai resolvi usar o localStorage para manter a sessão do usuario logado, e agora esta funcionando corretamente. Usei o GPT para me ajudar a reestruturar o codigo. Depois de longo tempo brigando com o GPT chegamos nessa versão final.
  localStorage.setItem(
    "sessao",
    JSON.stringify({
      nome: usuario.nome,
      email: usuario.email,
      logado: true
    })
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

  if (!btnLogin) {
    return;
  }

  const sessao = usuarioLogado();

  if (sessao) {
    btnLogin.textContent = t("nav.logout");
    btnLogin.setAttribute("href", "#");
    btnLogin.setAttribute(
      "aria-label",
      `${t("nav.logout")} ${sessao.nome}`
    );

    btnLogin.onclick = (event) => {
      event.preventDefault();
      logout();
      window.location.reload();
    };

    return;
  }

  btnLogin.textContent = t("nav.login");
  btnLogin.setAttribute("href", "login.html");
  btnLogin.setAttribute(
    "aria-label",
    t("nav.login")
  );

  btnLogin.onclick = null;
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

document.addEventListener("languagechange", () => {
  atualizarHeaderAuth();
});
