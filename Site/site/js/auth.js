const API_BASE_URL = "http://localhost:3000/api";

async function login(email, senha) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password: senha
      })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return false;
    }

    localStorage.setItem("token", result.data.token);

    localStorage.setItem(
      "sessao",
      JSON.stringify({
        id: result.data.user.id,
        nome: result.data.user.nome,
        email: result.data.user.email,
        perfil: result.data.user.perfil,
        logado: true
      })
    );

    return true;
  } catch (error) {
    console.error("Erro ao conectar com a API:", error);
    return false;
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("sessao");
}

function usuarioLogado() {
  try {
    const token = localStorage.getItem("token");
    const sessao = JSON.parse(localStorage.getItem("sessao"));

    if (!token || !sessao?.logado) {
      return null;
    }

    return sessao;
  } catch {
    return null;
  }
}

function obterToken() {
  return localStorage.getItem("token");
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
      window.location.href = "index.html";
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

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (erro) {
      erro.hidden = true;
    }

    const email = document.getElementById("email")?.value ?? "";
    const senha = document.getElementById("senha")?.value ?? "";

    const sucesso = await login(email, senha);

    if (sucesso) {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect");

      window.location.href = redirect || "index.html";
      return;
    }

    if (erro) {
      erro.hidden = false;
    }
  });

  const protectedPage = document.body.dataset.protected === "true";

  if (protectedPage && !usuarioLogado()) {
    window.location.replace(
      "login.html?redirect=adicionar-trabalho.html"
    );
    return;
  }

  atualizarHeaderAuth();
});

document.addEventListener("languagechange", () => {
  atualizarHeaderAuth();
});