// Funcoes compartilhadas de sessao, usadas em todas as telas autenticadas.

function obterUsuarioLogado() {
  const dados = localStorage.getItem("cervejaria_usuario");
  if (!dados) {
    window.location.href = "login.html";
    return null;
  }
  return JSON.parse(dados);
}

function configurarCabecalho() {
  const usuario = obterUsuarioLogado();
  if (!usuario) return;

  const nomeUsuario = document.getElementById("nomeUsuario");
  const primeiroNome = document.getElementById("primeiroNome");

  if (nomeUsuario) {
    nomeUsuario.textContent = `${usuario.nome} (${usuario.tipo})`;
  }
  if (primeiroNome) {
    primeiroNome.textContent = usuario.nome.split(" ")[0];
  }

  const botaoSair = document.getElementById("botaoSair");
  if (botaoSair) {
    botaoSair.addEventListener("click", () => {
      localStorage.removeItem("cervejaria_usuario");
      window.location.href = "login.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", configurarCabecalho);
