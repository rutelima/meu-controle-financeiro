const form = document.getElementById('form-transacao');
const lista = document.getElementById('lista-transacoes');
const totalEntradasEl = document.getElementById('total-entradas');
const totalDespesasEl = document.getElementById('total-despesas');
const saldoTotalEl = document.getElementById('saldo-total');
const totalInvestimentosEl = document.getElementById('total-investimentos');

let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];

function atualizarValores() {
  const entradas = transacoes
    .filter(t => t.tipo === 'entrada')
    .reduce((acc, t) => acc + t.valor, 0);

  const despesas = transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((acc, t) => acc + t.valor, 0);

  const investimentos = transacoes
    .filter(t => t.tipo === 'investimento')
    .reduce((acc, t) => acc + t.valor, 0);

  const saldo = entradas - despesas - investimentos;

  totalEntradasEl.textContent = `R$ ${entradas.toFixed(2)}`;
  totalDespesasEl.textContent = `R$ ${despesas.toFixed(2)}`;
  saldoTotalEl.textContent = `R$ ${saldo.toFixed(2)}`;
  totalInvestimentosEl.textContent = `R$ ${investimentos.toFixed(2)}`;
}

function removerTransacao(index) {
  transacoes.splice(index, 1);
  localStorage.setItem('transacoes', JSON.stringify(transacoes));
  renderizarLista();
  atualizarValores();
}

function renderizarLista() {
  lista.innerHTML = '';
  transacoes.forEach((t, index) => {
    const li = document.createElement('li');
    li.classList.add(t.tipo);
    li.innerHTML = `
      <div class="info-item">
        <span>${t.descricao}</span>
        <small>${t.tipo}</small>
      </div>
      <div class="acoes-item">
        <strong>R$ ${t.valor.toFixed(2)}</strong>
        <button class="btn-apagar" onclick="removerTransacao(${index})" title="Apagar">🗑️</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const descricao = document.getElementById('descricao').value;
  const valor = parseFloat(document.getElementById('valor').value);
  const tipo = document.getElementById('tipo').value;

  transacoes.push({ descricao, valor, tipo });
  localStorage.setItem('transacoes', JSON.stringify(transacoes));

  form.reset();
  renderizarLista();
  atualizarValores();
});

renderizarLista();
atualizarValores();