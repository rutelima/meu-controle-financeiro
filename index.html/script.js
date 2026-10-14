// 1. Carregamos as transações salvas no navegador ou iniciamos uma lista vazia
let transacoes = JSON.parse(localStorage.getItem("transacoes_app")) || [];

// 2. Função que lê as transações, recalcula os valores e redesenha o histórico na tela
function atualizarInterface() {
    let totalEntradas = 0;
    let totalDespesas = 0;

    const lista = document.getElementById("lista-transacoes");
    lista.innerHTML = ""; // Limpa a lista antes de desenhar os itens salvos

    // Percorre cada transação salva
    transacoes.forEach(function(item) {
        if (item.tipo === "entrada") {
            totalEntradas += item.valor;
        } else {
            totalDespesas += item.valor;
        }

        // Cria o elemento <li> no histórico
        const novoItem = document.createElement("li");
        if (item.tipo === "despesa") {
            novoItem.classList.add("despesa");
        }
        novoItem.innerHTML = `<span>${item.descricao}</span> <strong>R$ ${item.valor.toFixed(2)}</strong>`;
        lista.appendChild(novoItem);
    });

    // Atualiza os cartões de saldo na tela
    const saldoRestante = totalEntradas - totalDespesas;
    document.getElementById("valor-entradas").innerText = "R$ " + totalEntradas.toFixed(2);
    document.getElementById("valor-despesas").innerText = "R$ " + totalDespesas.toFixed(2);
    document.getElementById("valor-saldo").innerText = "R$ " + saldoRestante.toFixed(2);

    // Grava o array atualizado na memória do navegador (LocalStorage)
    localStorage.setItem("transacoes_app", JSON.stringify(transacoes));
}

// 3. Ouvinte do botão de adicionar
document.getElementById("btn-adicionar").addEventListener("click", function() {
    const inputDescricao = document.getElementById("descricao");
    const inputValor = document.getElementById("valor-input");
    const selectTipo = document.getElementById("tipo");

    const descricao = inputDescricao.value.trim();
    const valor = parseFloat(inputValor.value);
    const tipo = selectTipo.value;

    if (!descricao || isNaN(valor) || valor <= 0) {
        alert("Preencha a descrição e um valor válido!");
        return;
    }

    // Adiciona o novo item à nossa lista/array
    transacoes.push({
        descricao: descricao,
        valor: valor,
        tipo: tipo
    });

    // Atualiza a tela e limpa os campos de digitação
    atualizarInterface();
    inputDescricao.value = "";
    inputValor.value = "";
});

// 4. Executa assim que a página é carregada para exibir os dados salvos anteriormente
atualizarInterface();