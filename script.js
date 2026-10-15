import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC5G-Tr3kcntYm4wosc5n361pJ4VSWFqys",
  authDomain: "nosso-dinheiro-56ad7.firebaseapp.com",
  projectId: "nosso-dinheiro-56ad7",
  storageBucket: "nosso-dinheiro-56ad7.firebasestorage.app",
  messagingSenderId: "903996625427",
  appId: "1:903996625427:web:f097fcdc3cf8e1173ee5e6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const transacoesRef = collection(db, "transacoes");

const form = document.getElementById('form-transacao');
const lista = document.getElementById('lista-transacoes');
const totalEntradasEl = document.getElementById('total-entradas');
const totalDespesasEl = document.getElementById('total-despesas');
const saldoTotalEl = document.getElementById('saldo-total');
const totalInvestimentosEl = document.getElementById('total-investimentos');

let transacoes = [];

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

window.removerTransacao = async function(id) {
  try {
    await deleteDoc(doc(db, "transacoes", id));
  } catch (error) {
    console.error("Erro ao apagar:", error);
  }
};

function renderizarLista() {
  lista.innerHTML = '';
  transacoes.forEach((t) => {
    const li = document.createElement('li');
    li.classList.add(t.tipo);
    li.innerHTML = `
      <div class="info-item">
        <span>${t.descricao}</span>
        <small>${t.tipo}</small>
      </div>
      <div class="acoes-item">
        <strong>R$ ${t.valor.toFixed(2)}</strong>
        <button class="btn-apagar" onclick="removerTransacao('${t.id}')" title="Apagar">🗑️</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

onSnapshot(transacoesRef, (snapshot) => {
  transacoes = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  renderizarLista();
  atualizarValores();
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const descricao = document.getElementById('descricao').value;
  const valor = parseFloat(document.getElementById('valor').value);
  const tipo = document.getElementById('tipo').value;

  try {
    await addDoc(transacoesRef, { descricao, valor, tipo });
    form.reset();
  } catch (error) {
    console.error("Erro ao salvar:", error);
  }
});