// Tela de Gerenciamento de Produtos e Insumos: CRUD completo consumindo a API REST.

const API_BASE = "/api";

document.addEventListener("DOMContentLoaded", () => {
  obterUsuarioLogado(); // redireciona para login.html se nao houver sessao

  configurarAbas();
  configurarModaisProduto();
  configurarModaisInsumo();
  configurarBusca();

  carregarProdutos();
  carregarInsumos();
});

// ================= ABAS =================

function configurarAbas() {
  document.getElementById("abaProdutos").addEventListener("click", () => alternarAba("produtos"));
  document.getElementById("abaInsumos").addEventListener("click", () => alternarAba("insumos"));
}

function alternarAba(aba) {
  const ehProdutos = aba === "produtos";
  document.getElementById("abaProdutos").classList.toggle("ativa", ehProdutos);
  document.getElementById("abaInsumos").classList.toggle("ativa", !ehProdutos);
  document.getElementById("secaoProdutos").style.display = ehProdutos ? "block" : "none";
  document.getElementById("secaoInsumos").style.display = ehProdutos ? "none" : "block";
}

// ================= BUSCA =================

function configurarBusca() {
  let temporizador;
  document.getElementById("buscaProduto").addEventListener("input", (evento) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => carregarProdutos(evento.target.value), 300);
  });

  document.getElementById("buscaInsumo").addEventListener("input", (evento) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => carregarInsumos(evento.target.value), 300);
  });
}

// ================= PRODUTOS: LISTAGEM =================

async function carregarProdutos(nome) {
  const url = nome ? `${API_BASE}/produtos?nome=${encodeURIComponent(nome)}` : `${API_BASE}/produtos`;
  const resposta = await fetch(url);
  const produtos = await resposta.json();

  const corpo = document.getElementById("corpoTabelaProdutos");
  const vazio = document.getElementById("vazioProdutos");
  corpo.innerHTML = "";

  if (produtos.length === 0) {
    vazio.style.display = "block";
    return;
  }
  vazio.style.display = "none";

  produtos.forEach((produto) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${escaparHtml(produto.nome)}</td>
      <td>${escaparHtml(produto.estilo)}</td>
      <td>${Number(produto.precoVenda).toFixed(2)}</td>
      <td>${produto.estoque}</td>
      <td><span class="selo ${produto.ativo ? "selo-ok" : "selo-baixo"}">${produto.ativo ? "Ativo" : "Inativo"}</span></td>
      <td class="acoes-linha">
        <button class="link-acao" onclick="abrirEdicaoProduto(${produto.id})">Editar</button>
        <button class="link-acao excluir" onclick="excluirProduto(${produto.id})">Excluir</button>
      </td>
    `;
    corpo.appendChild(linha);
  });
}

// ================= PRODUTOS: MODAL / FORMULARIO =================

function configurarModaisProduto() {
  document.getElementById("botaoNovoProduto").addEventListener("click", () => abrirModalProduto());
  document.getElementById("cancelarProduto").addEventListener("click", () => fecharModalProduto());
  document.getElementById("formProduto").addEventListener("submit", salvarProduto);
}

function abrirModalProduto() {
  document.getElementById("tituloModalProduto").textContent = "Novo Produto";
  document.getElementById("formProduto").reset();
  document.getElementById("produtoId").value = "";
  document.getElementById("modalProduto").classList.add("visivel");
}

async function abrirEdicaoProduto(id) {
  const resposta = await fetch(`${API_BASE}/produtos/${id}`);
  if (!resposta.ok) return;
  const produto = await resposta.json();

  document.getElementById("tituloModalProduto").textContent = "Editar Produto";
  document.getElementById("produtoId").value = produto.id;
  document.getElementById("produtoNome").value = produto.nome;
  document.getElementById("produtoEstilo").value = produto.estilo;
  document.getElementById("produtoDescricao").value = produto.descricao || "";
  document.getElementById("produtoPreco").value = produto.precoVenda;
  document.getElementById("produtoEstoque").value = produto.estoque;
  document.getElementById("modalProduto").classList.add("visivel");
}

function fecharModalProduto() {
  document.getElementById("modalProduto").classList.remove("visivel");
}

async function salvarProduto(evento) {
  evento.preventDefault();

  const id = document.getElementById("produtoId").value;
  const corpo = {
    nome: document.getElementById("produtoNome").value.trim(),
    estilo: document.getElementById("produtoEstilo").value.trim(),
    descricao: document.getElementById("produtoDescricao").value.trim(),
    precoVenda: parseFloat(document.getElementById("produtoPreco").value),
    estoque: parseFloat(document.getElementById("produtoEstoque").value),
    ativo: true
  };

  const url = id ? `${API_BASE}/produtos/${id}` : `${API_BASE}/produtos`;
  const metodo = id ? "PUT" : "POST";

  const resposta = await fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo)
  });

  if (resposta.ok) {
    fecharModalProduto();
    carregarProdutos();
  } else {
    alert("Nao foi possivel salvar o produto. Verifique os dados informados.");
  }
}

async function excluirProduto(id) {
  if (!confirm("Deseja realmente excluir este produto?")) return;
  const resposta = await fetch(`${API_BASE}/produtos/${id}`, { method: "DELETE" });
  if (resposta.ok) {
    carregarProdutos();
  } else {
    alert("Nao foi possivel excluir o produto.");
  }
}

// ================= INSUMOS: LISTAGEM =================

async function carregarInsumos(nome) {
  const url = nome ? `${API_BASE}/insumos?nome=${encodeURIComponent(nome)}` : `${API_BASE}/insumos`;
  const resposta = await fetch(url);
  const insumos = await resposta.json();

  const corpo = document.getElementById("corpoTabelaInsumos");
  const vazio = document.getElementById("vazioInsumos");
  corpo.innerHTML = "";

  if (insumos.length === 0) {
    vazio.style.display = "block";
    return;
  }
  vazio.style.display = "none";

insumos.forEach((insumo) => {
  const estoque = parseFloat(insumo.quantidadeEstoque);
  const minimo = parseFloat(insumo.estoqueMinimo);

  const estoqueBaixo = estoque <= minimo;

  const linha = document.createElement("tr");
  linha.innerHTML = `
    <td>${escaparHtml(insumo.nome)}</td>
    <td>${escaparHtml(insumo.unidade)}</td>
    <td>${insumo.quantidadeEstoque}</td>
    <td>${insumo.estoqueMinimo}</td>
    <td>
      <span class="selo ${estoqueBaixo ? "selo-baixo" : "selo-ok"}">
        ${estoqueBaixo ? "Estoque baixo" : "Normal"}
      </span>
    </td>
    <td class="acoes-linha">
      <button class="link-acao" onclick="abrirEdicaoInsumo(${insumo.id})">Editar</button>
      <button class="link-acao excluir" onclick="excluirInsumo(${insumo.id})">Excluir</button>
    </td>
  `;

  corpo.appendChild(linha);
});
}

// ================= INSUMOS: MODAL / FORMULARIO =================

function configurarModaisInsumo() {
  document.getElementById("botaoNovoInsumo").addEventListener("click", () => abrirModalInsumo());
  document.getElementById("cancelarInsumo").addEventListener("click", () => fecharModalInsumo());
  document.getElementById("formInsumo").addEventListener("submit", salvarInsumo);
}

function abrirModalInsumo() {
  document.getElementById("tituloModalInsumo").textContent = "Novo Insumo";
  document.getElementById("formInsumo").reset();
  document.getElementById("insumoId").value = "";
  document.getElementById("modalInsumo").classList.add("visivel");
}

async function abrirEdicaoInsumo(id) {
  const resposta = await fetch(`${API_BASE}/insumos/${id}`);
  if (!resposta.ok) return;
  const insumo = await resposta.json();

  document.getElementById("tituloModalInsumo").textContent = "Editar Insumo";
  document.getElementById("insumoId").value = insumo.id;
  document.getElementById("insumoNome").value = insumo.nome;
  document.getElementById("insumoUnidade").value = insumo.unidade;
  document.getElementById("insumoPrecoUnitario").value = insumo.precoUnitario || "";
  document.getElementById("insumoQuantidade").value = insumo.quantidadeEstoque;
  document.getElementById("insumoEstoqueMinimo").value = insumo.estoqueMinimo;
  document.getElementById("modalInsumo").classList.add("visivel");
}

function fecharModalInsumo() {
  document.getElementById("modalInsumo").classList.remove("visivel");
}

async function salvarInsumo(evento) {
  evento.preventDefault();

  const id = document.getElementById("insumoId").value;
  const precoUnitarioValor = document.getElementById("insumoPrecoUnitario").value;
  const corpo = {
    nome: document.getElementById("insumoNome").value.trim(),
    unidade: document.getElementById("insumoUnidade").value,
    precoUnitario: precoUnitarioValor ? parseFloat(precoUnitarioValor) : null,
    quantidadeEstoque: parseFloat(document.getElementById("insumoQuantidade").value),
    estoqueMinimo: parseFloat(document.getElementById("insumoEstoqueMinimo").value),
    ativo: true
  };

  const url = id ? `${API_BASE}/insumos/${id}` : `${API_BASE}/insumos`;
  const metodo = id ? "PUT" : "POST";

  const resposta = await fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo)
  });

  if (resposta.ok) {
    fecharModalInsumo();
    carregarInsumos();
  } else {
    alert("Nao foi possivel salvar o insumo. Verifique os dados informados.");
  }
}

async function excluirInsumo(id) {
  if (!confirm("Deseja realmente excluir este insumo?")) return;
  const resposta = await fetch(`${API_BASE}/insumos/${id}`, { method: "DELETE" });
  if (resposta.ok) {
    carregarInsumos();
  } else {
    alert("Nao foi possivel excluir o insumo.");
  }
}

// ================= UTILITARIOS =================

function escaparHtml(texto) {
  if (texto === null || texto === undefined) return "";
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}
