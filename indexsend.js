const btn = document.getElementById('send');
const btnL = document.getElementById('sendClear');


function fazerRequisicaoPost(txt, d=false) {
    var xhr = new XMLHttpRequest();
    var url = "validacao.php"; // Substitua pelo caminho do seu arquivo PHP

    // Configura a solicitação POST
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Define os dados a serem enviados (parâmetros)
    var parametros = "";// Ajuste conforme necessário
    if(d == false) {
        var parametros = "id="+txt ?? ''; // Ajuste conforme necessário
    } else {
        var parametros = "exc=1"; // Ajuste conforme necessário
    }

    // Função de callback para tratar a resposta da solicitação
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("Solicitação POST bem-sucedida");
                console.log(xhr.responseText);
            } else {
                console.error("Erro na solicitação POST");
            }
        }
    };

    // Envia a solicitação com os parâmetros
    xhr.send(parametros);
}

btn.addEventListener('click', function () {
    let txt = document.querySelector('#id').value;
    fazerRequisicaoPost(txt);
})

btnL.addEventListener('click', function () {
    document.querySelector('#id').value = '';
    fazerRequisicaoPost('', true);
})