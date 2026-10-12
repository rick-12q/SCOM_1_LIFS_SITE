
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

async function cadastrarUsuario(nome, email, senha) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        password: senha
      })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      const detalhes = result.error?.details;
    
      let mensagem =
        result.error?.message ||
        "Não foi possível criar a conta.";
    
      if (Array.isArray(detalhes) && detalhes.length > 0) {
        mensagem = detalhes
          .map((erro) => erro.message)
          .join(" ");
      }
    
      return {
        sucesso: false,
        mensagem
      };
    }

    return {
      sucesso: true,
      usuario: result.data
    };
  } catch (error) {
    console.error("Erro ao criar conta:", error);

    return {
      sucesso: false,
      mensagem: "Não foi possível conectar ao servidor."
    };
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
  
    let perfilUsuario = document.querySelector(".header-user-profile");
  
    if (!perfilUsuario) {
      perfilUsuario = document.createElement("a");
      perfilUsuario.className = "header-user-profile";
      perfilUsuario.href = "minha-conta.html";
    
      btnLogin.insertAdjacentElement("afterend", perfilUsuario);
    }
  
    const nomesPerfil = {
      USUARIO: "USUÁRIO",
      MEMBRO: "MEMBRO",
      ADMIN: "ADMIN"
    };
  
    perfilUsuario.innerHTML = `
      <span class="header-user-icon" aria-hidden="true">👤</span>
  
      <span class="header-user-info">
        <span class="header-user-name"></span>
        <span class="header-user-role"></span>
      </span>
    `;
  
    perfilUsuario.querySelector(".header-user-name").textContent =
      sessao.nome;
  
    perfilUsuario.querySelector(".header-user-role").textContent =
      nomesPerfil[sessao.perfil] || sessao.perfil;
  
    return;
  }

  document.querySelector(".header-user-profile")?.remove();

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
  const abrirCadastro = document.getElementById("abrir-cadastro");
  const cadastroForm = document.getElementById("cadastro-form");
  const voltarLogin = document.getElementById("voltar-login");
  const cadastroErro = document.getElementById("cadastro-erro");
  const cadastroSucesso = document.getElementById("cadastro-sucesso");

  abrirCadastro?.addEventListener("click", () => {
    form.hidden = true;
    abrirCadastro.parentElement.hidden = true;
    cadastroForm.hidden = false;

    if (cadastroErro) {
      cadastroErro.hidden = true;
    }

    if (cadastroSucesso) {
      cadastroSucesso.hidden = true;
    }
  });

  voltarLogin?.addEventListener("click", () => {
    cadastroForm.hidden = true;
    form.hidden = false;
    abrirCadastro.parentElement.hidden = false;
  });

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

  cadastroForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    cadastroErro.hidden = true;
    cadastroSucesso.hidden = true;

    const nome =
      document.getElementById("cadastro-nome").value;

    const email =
      document.getElementById("cadastro-email").value;

    const senha =
      document.getElementById("cadastro-senha").value;

    const confirmarSenha =
      document.getElementById("cadastro-confirmar-senha").value;

    if (senha !== confirmarSenha) {
      cadastroErro.textContent = "As senhas não coincidem.";
      cadastroErro.hidden = false;
      return;
    }

    const resultado = await cadastrarUsuario(
      nome,
      email,
      senha
    );

    if (!resultado.sucesso) {
      cadastroErro.textContent = resultado.mensagem;
      cadastroErro.hidden = false;
      return;
    }

    cadastroForm.reset();

    cadastroForm.hidden = true;
    form.hidden = false;
    abrirCadastro.parentElement.hidden = false;

    if (erro) {
      erro.hidden = true;
    }

    const emailLogin = document.getElementById("email");

    if (emailLogin) {
      emailLogin.value = email.trim().toLowerCase();
      emailLogin.focus();
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