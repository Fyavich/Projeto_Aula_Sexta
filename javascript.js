// Construtor
function Encomendas(cliente, comidas, bebidas){
    this.cliente = cliente;
    this.comidas = comidas;
    this.bebidas = bebidas;
}

// Criando uma lista unica de pedidos
var pedidos = new ListaPedidos();

// Criar Fila
function ListaPedidos(){
    this.encomendas = [];

    // Por Pedido na Fila
    this.enfileirar = function(pedido){
        this.encomendas.push(pedido);
    }

    // Remover Pedido da Fila
    this.desenfileirar = function(){
        if(this.encomendas.length === 0){
            return "Não há pedidos na fila!";
        }

        return this.encomendas.shift();
    }

    this.tamanho = function(){
        return this.encomendas.length;
    }

    this.front = function(){
        if(this.encomendas.length === 0){
            return "Não há pedidos na fila!";
        }

        return this.encomendas[0];
    }

    this.isEmpty = function(){
        return this.encomendas.length === 0 ? "Fila Vazia!" : "Há pedidos na Fila!";
    }
}

// Coletar Informações do Form e Transformar em Objeto
function gerarPedido(){
    var nomeCliente = document.getElementById("nomeCliente");

    var listaComida = [];
    var comidaSelecionada = document.querySelectorAll('input[name="comida"]');

    var listaBebida = [];
    var bebidaSelecionada = document.querySelectorAll('input[name="bebida"]');

    // Conferir Comidas Selecionadas
    function verificarComidaSelecionados(){                      
        comidaSelecionada.forEach(function(checkbox){
            if(checkbox.checked){
                var qtdInput = document.getElementById("qtd" + checkbox.id);
                var qtd = qtdInput.value;
                listaComida.push({
                    item: checkbox.value,
                    qtd: qtd
                });
            }
        });
    };

    // Conferir Bebidas Selecionadas
    function verificarBebidaSelecionados(){                      
        bebidaSelecionada.forEach(function(checkbox){
            if(checkbox.checked){
                var qtdInput = document.getElementById("qtd" + checkbox.id);
                var qtd = qtdInput.value;
                listaBebida.push({
                    item: checkbox.value,
                    qtd: qtd
                });
            }
        });
    };

    verificarComidaSelecionados();
    verificarBebidaSelecionados();

    var encomenta = new Encomendas(
        nomeCliente.value, 
        listaComida, 
        listaBebida
    );

    pedidos.enfileirar(encomenta);

    mostrarPedidos();
}

function atualizarQtd(checkbox){
    var qtdInput = document.getElementById("qtd" + checkbox.id);
    var qtd = 1;
    
    qtdInput.value = checkbox.checked ? qtd : 0;
}

function mostrarPedidos(){
    var tamanhoLista = document.getElementById("filaTamanho");

    tamanhoLista.value = pedidos.tamanho === 0 ? 0 : pedidos.tamanho();

    var container = document.getElementById("container");

    container.innerHTML = "";

    for(var i = 0; i<pedidos.tamanho(); i++){
        var lista = document.createElement("div");
        
        lista.innerHTML += "<h3>Cliente: " + pedidos.encomendas[i].cliente + "</h3>";

        lista.innerHTML += "<h4>Pedidos</h4>";
        for(var j = 0; j < pedidos.encomendas[i].comidas.length; j++){
            lista.innerHTML += "<p>Item: " + pedidos.encomendas[i].comidas[j].item + " QTD: " + 
            pedidos.encomendas[i].comidas[j].qtd + "</p>";
        }

        for(var k = 0; k < pedidos.encomendas[i].bebidas.length; k++){
            lista.innerHTML += "<p>Item: " + pedidos.encomendas[i].bebidas[k].item + " QTD: " + 
            pedidos.encomendas[i].bebidas[k].qtd + "</p>";
        }

        container.appendChild(lista);
    }

    console.log(pedidos);
}

mostrarPedidos();