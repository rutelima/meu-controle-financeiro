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
const saldoRuteEl = document.getElementById('saldo-rute');
const saldoVandersonEl = document.getElementById('saldo-vanderson');

let transacoes = [];

function calcularSaldos() {
  let entradasGeral = 0;
  let despesasGeral = 0;
  let investimentosGeral = 0;
  let saldoRute = 0;
  let saldoVanderson = 0;

  transacoes.forEach(t => {
    const valor = Number(t.valor) || 0;
    const tipo = t.tipo || 'despesa';
    const resp = t.responsavel || 'Casal';

    // Totais Gerais
    if (tipo === 'entrada') entradasGeral += valor;
    if (tipo === 'despesa') despesasGeral += valor;
    if (tipo === 'investimento') investimentosGeral += valor;

    // Cálculo Rute
    if (resp === 'Rute') {
      if (tipo === 'entrada') saldoRute += valor;
      if (tipo === 'despesa' || tipo === 'investimento') saldoRute -= valor;
    }

    // Cálculo Vanderson
    if (resp === 'Vanderson') {
      if (tipo === 'entrada') saldoVanderson += valor;
      if (tipo === 'despesa' || tipo === 'investimento') saldoVanderson -= valor;
    }

    // Se a despesa/investimento/entrada for do "Casal", divide 50% para cada
    if (resp === 'Casal') {
      const metade = valor / 2;
      if (tipo === 'entrada') {
        saldoRute += metade;
        saldoVanderson += metade;
      }
      if (tipo === 'despesa' || tipo === 'investimento') {
        saldoRute -= metade;
        saldoVanderson -= metade;
      }
    }
  });

  const saldoGeral = entradasGeral - despesasGeral - investimentosGeral;

  // Atualiza no HTML
  if (totalEntradasEl) totalEntradasEl.textContent = `R$ ${entradasGeral.toFixed(2)}`;
  if (totalDespesasEl) totalDespesasEl.textContent = `R$ ${despesasGeral.toFixed(2)}`;
  if (saldoTotalEl) saldoTotalEl.textContent = `R$ ${saldoGeral.toFixed(2)}`;
  if (totalInvestimentosEl) totalInvestimentosEl.textContent = `R$ ${investimentosGeral.toFixed(2)}`;
  if (saldoRuteEl) saldoRuteEl.textContent = `R$ ${saldoRute.toFixed(2)}`;
  if (saldoVandersonEl) saldoVandersonEl.textContent = `R$ ${saldoVanderson.toFixed(2)}`;
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
    li.classList.add(t.tipo || 'despesa');
    
    const statusText = t.status || 'Concluído';
    const statusTag = statusText === 'Pendente' 
      ? `<span class="badge badge-pendente">⏳ Pendente</span>` 
      : `<span class="badge badge-pago">✅ Pago</span>`;

    const respText = t.responsavel ? ` • 👤 ${t.responsavel}` : ' • 💚 Casal';
    const catText = t.categoria || 'Geral';
    const metText = t.metodo || 'PIX';
    const valNum = Number(t.valor) || 0;

    li.innerHTML = `
      <div class="info-item">
        <strong>${t.descricao || 'Sem descrição'}</strong>
        <small>${catText} • ${metText}${respText} ${statusTag}</small>
      </div>
      <div class="acoes-item">
        <strong>R$ ${valNum.toFixed(2)}</strong>
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
  calcularSaldos();
}, (error) => {
  console.error("Erro ao escutar Firestore:", error);
});

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('tipo').value;
    const responsavel = document.getElementById('responsavel').value;
    const categoria = document.getElementById('categoria').value;
    const metodo = document.getElementById('metodo').value;
    const status = document.getElementById('status').value;

    try {
      await addDoc(transacoesRef, { 
        descricao, 
        valor, 
        tipo, 
        responsavel,
        categoria, 
        metodo, 
        status,
        data: new Date().toISOString()
      });
      form.reset();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  });
}