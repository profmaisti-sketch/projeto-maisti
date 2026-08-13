// js/app.js

document.addEventListener("DOMContentLoaded", () => {
    
    // --- LÓGICA DA PÁGINA: DASHBOARD (index.html) ---
    const agendamentosList = document.getElementById("agendamentos-list");
    if (agendamentosList) {
        renderizarAgendamentos();
    }

    // --- LÓGICA DA PÁGINA: PAGAMENTOS (pagamento.html) ---
    const pagamentosList = document.getElementById("pagamentos-list");
    if (pagamentosList) {
        renderizarPagamentos();
    }

    // --- LÓGICA DA PÁGINA: CADASTRO (cadastro.html) ---
    const formCadastro = document.getElementById("form-cadastro");
    if (formCadastro) {
        formCadastro.addEventListener("submit", (e) => {
            e.preventDefault(); // Impede a página de recarregar
            
            const novoCliente = {
                id: window.mockDB.clientes.length + 1, // Gera ID fake
                nome: document.getElementById("nome").value,
                veiculo: document.getElementById("veiculo").value,
                placa: document.getElementById("placa").value
            };

            window.mockDB.clientes.push(novoCliente);
            window.salvarDB(); // Salva no localStorage!

            formCadastro.reset(); // Limpa o form
            document.getElementById("msg-cadastro").style.display = "block";
            
            // Oculta a mensagem depois de 3 segundos
            setTimeout(() => { document.getElementById("msg-cadastro").style.display = "none"; }, 3000);
        });
    }

    // --- LÓGICA DA PÁGINA: AGENDAMENTO (agendamento.html) ---
    const formAgendamento = document.getElementById("form-agendamento");
    if (formAgendamento) {
        formAgendamento.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const novoAgendamento = {
                id: window.mockDB.agendamentos.length + 1,
                idCliente: parseInt(document.getElementById("id-cliente").value),
                data: document.getElementById("data-servico").value,
                servico: document.getElementById("servico").value,
                status: "Pendente"
            };

            window.mockDB.agendamentos.push(novoAgendamento);
            window.salvarDB();

            formAgendamento.reset();
            document.getElementById("msg-agendamento").style.display = "block";
            setTimeout(() => { document.getElementById("msg-agendamento").style.display = "none"; }, 3000);
        });
    }
});

// Funções Auxiliares de Renderização
function renderizarAgendamentos() {
    const { agendamentos, clientes } = window.mockDB;
    const container = document.getElementById("agendamentos-list");
    
    if (agendamentos.length === 0) {
        container.innerHTML = "<p>Nenhum agendamento encontrado.</p>";
        return;
    }

    let tabelaHTML = `
        <table>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Cliente</th>
                    <th>Serviço</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;

    agendamentos.forEach(agendamento => {
        const cliente = clientes.find(c => c.id === agendamento.idCliente);
        const nomeCliente = cliente ? cliente.nome : "ID não cadastrado";

        tabelaHTML += `
            <tr>
                <td>${agendamento.data}</td>
                <td>${nomeCliente}</td>
                <td>${agendamento.servico}</td>
                <td><strong>${agendamento.status}</strong></td>
            </tr>
        `;
    });

    tabelaHTML += `</tbody></table>`;
    container.innerHTML = tabelaHTML;
}

function renderizarPagamentos() {
    const { pagamentos } = window.mockDB;
    const container = document.getElementById("pagamentos-list");
    
    if (pagamentos.length === 0) {
        container.innerHTML = "<p>Nenhum pagamento registrado.</p>";
        return;
    }

    let tabelaHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID Agendamento</th>
                    <th>Método</th>
                    <th>Valor</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;

    pagamentos.forEach(pgto => {
        tabelaHTML += `
            <tr>
                <td>#${pgto.idAgendamento}</td>
                <td>${pgto.metodo}</td>
                <td>R$ ${pgto.valor.toFixed(2)}</td>
                <td style="color: green;"><strong>${pgto.status}</strong></td>
            </tr>
        `;
    });

    tabelaHTML += `</tbody></table>`;
    container.innerHTML = tabelaHTML;
}