// js/mockData.js

const dadosIniciais = {
    clientes: [
        { id: 1, nome: "Carlos Silva", veiculo: "Honda Civic 2018", placa: "ABC-1234" },
        { id: 2, nome: "Ana Paula", veiculo: "Fiat Uno 2012", placa: "XYZ-9876" }
    ],
    agendamentos: [
        { id: 1, idCliente: 1, data: "2026-08-15", servico: "Troca de Óleo", status: "Pendente" },
        { id: 2, idCliente: 2, data: "2026-08-16", servico: "Alinhamento", status: "Concluído" }
    ],
    pagamentos: [
        { id: 1, idAgendamento: 2, valor: 150.00, metodo: "PIX", status: "Pago" }
    ]
};

// Se não tiver dados no localStorage, injeta os iniciais
if (!localStorage.getItem('oficinaDB')) {
    localStorage.setItem('oficinaDB', JSON.stringify(dadosIniciais));
}

// Carrega os dados para a variável global
window.mockDB = JSON.parse(localStorage.getItem('oficinaDB'));

// Função auxiliar para salvar qualquer alteração nova no banco
window.salvarDB = function() {
    localStorage.setItem('oficinaDB', JSON.stringify(window.mockDB));
};