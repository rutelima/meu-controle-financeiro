* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #f4f6f8;
  color: #333;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 600px;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  color: #1e4d3b;
  font-size: 1.8rem;
}

header p {
  color: #666;
  font-size: 0.9rem;
}

.card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.form-card h2, .historico-card h2 {
  font-size: 1.1rem;
  color: #1e4d3b;
  margin-bottom: 15px;
}

.grupo-input {
  margin-bottom: 12px;
}

.grupo-input label {
  display: block;
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 4px;
  font-weight: 600;
}

.grupo-input input, .grupo-input select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  outline: none;
  background-color: #fff;
}

.grupo-input input:focus, .grupo-input select:focus {
  border-color: #1e4d3b;
}

.btn-salvar {
  width: 100%;
  background-color: #1e4d3b;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}

.btn-salvar:hover {
  background-color: #15372a;
}

/* Grid de Resumo dos Saldos */
.cards-resumo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.saldo-card {
  margin-bottom: 0;
  padding: 15px;
}

.saldo-card h3 {
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.saldo-card .valor {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 5px;
}

.saldo-destaque {
  grid-column: span 2;
  background-color: #1e4d3b;
  color: white;
}

.saldo-destaque h3 {
  color: #a3b899;
}

.saldo-destaque .valor {
  color: #ffffff;
  font-size: 1.5rem;
}

.positivo {
  color: #10b981;
}

.negativo {
  color: #ef4444;
}

/* Lista de Transações */
.lista {
  list-style: none;
}

.lista li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 8px;
  margin-bottom: 8px;
  border-left: 4px solid #ccc;
}

.lista li.entrada {
  border-left-color: #10b981;
}

.lista li.despesa {
  border-left-color: #