const notificacao = document.getElementById('notificacao');
const timerC = notificacao.querySelector('.timerclose .c');

//timerVariaveis
var timeout;
var timeinterval;
var contentNotification = '';

function verificarNotificacao() {
    // Faça uma solicitação ao servidor para verificar notificações pendentes
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                var resposta = JSON.parse(xhr.responseText);

                if (resposta.notificacao) {
                    showNotification(resposta.notificacao);
                } else {
                    callAfterTime();
                    console.log('do vazio!');
                }
            }
        }
    };

    xhr.open('GET', 'validacao.php', true);
    xhr.send();
}

function callAfterTime() {
    console.log('chamando novamente!');
    // Chama a função novamente após o processamento
    setTimeout(verificarNotificacao, (60000)/12); // Ajuste conforme necessário numero da direita controla os minutos
}

// Inicia o processo de verificação
verificarNotificacao();

notificacao.addEventListener('mouseenter', function () {
    clearInterval(timeinterval);
    clearTimeout(timeout);
})

notificacao.addEventListener('mouseleave', function () {
    if(!notificacao.classList.contains('hidden')){
        showNotification(contentNotification);
    }
})

function showNotification(content) {
    contentNotification = content;
    let notUnique = '<div class="notificationItem"><div class="header"><div class="timer"><i class="fa fa-clock"></i>11:29</div>|<div class="title">Assunto</div></div>'+content.notificacao+'</div>';
    timeCloseNotificacao(4500);
    notificacao.querySelector('.content').innerHTML = notUnique;
    notificacao.classList.remove('dh');
    setTimeout(() => {
        notificacao.classList.remove('hidden');
    }, 50);
    // Adiciona uma animação de desaparecimento após 3 segundos (ajuste conforme necessário)
    timeout = setTimeout(function () {
        notificacao.classList.add('hidden');
        setTimeout(() => {
            notificacao.classList.add('dh');
        }, 50);
        callAfterTime();
    }, 4500);
}

notificacao.querySelector('.close').addEventListener('click', function () {
    clearInterval(timeinterval);
    clearTimeout(timeout);
    notificacao.classList.add('hidden');
    setTimeout(() => {
        notificacao.classList.add('dh');
    }, 50);
    callAfterTime();
})

function timeCloseNotificacao(timer) {
    let t = 100/(timer/4.3);
    timerC.style.width = 0+'%';
    let count = 0;
    timeinterval = setInterval(() => {
        if((t*count) < 100){
            timerC.style.width = (t*count)+'%';
            count++;
        } else {
            clearInterval(timeinterval);
        }
    }, 1);
}