// Tela de login: autentica o usuario contra a API e guarda a sessao no navegador.

const API_BASE = "/api";

document.addEventListener("DOMContentLoaded", () => {
  // Se ja existir uma sessao valida, vai direto para o menu.
  if (localStorage.getItem("cervejaria_usuario")) {
    window.location.href = "menu.html";
    return;
  }

  const form = document.getElementById("formLogin");
  const mensagemErro = document.getElementById("mensagemErro");
  const botaoEntrar = document.getElementById("botaoEntrar");

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    esconderErro();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    botaoEntrar.disabled = true;
    botaoEntrar.textContent = "Entrando...";

    try {
      const resposta = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      if (!resposta.ok) {
        const erro = await resposta.json().catch(() => ({}));
        throw new Error(erro.erro || "E-mail ou senha invalidos.");
      }

      const usuario = await resposta.json();
      localStorage.setItem("cervejaria_usuario", JSON.stringify(usuario));
      window.location.href = "menu.html";
    } catch (erro) {
      mostrarErro(erro.message || "Nao foi possivel entrar. Verifique suas credenciais.");
      botaoEntrar.disabled = false;
      botaoEntrar.textContent = "Entrar";
    }
  });

  function mostrarErro(texto) {
    mensagemErro.textContent = texto;
    mensagemErro.classList.add("visivel");
  }

  function esconderErro() {
    mensagemErro.classList.remove("visivel");
    mensagemErro.textContent = "";
  }
});
