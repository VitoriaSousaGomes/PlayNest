let tabuleiro = document.getElementById("tabuleiro");
let pares = document.getElementById("pares");
let mensagem = document.getElementById("mensagem");
let vitoria = document.querySelector(".vitoria");
let jogo = document.querySelector(".jogo");
let tentativas = 0;
let contadorTentativas = document.getElementById("contadorTentativas");
let Vtentativas = document.getElementById("Vtentativas");
let tempo = 0;
let contadorTempo = document.getElementById("contadorTempo");
let Vtempo = document.getElementById("Vtempo");
let novoJogo = document.getElementById("novoJogo");
let reiniciar = document.getElementById("reiniciar")

let cartas = ["🍓", "🍓", "🍌", "🍌", "🍇", "🍇", "🍎", "🍎"]
let sem =["❓"]
let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let paresEncontrados = 0;
let TempoCorrido = null;
let cartasDoJogo = [];

function embaralharCartas() {
    cartas.sort(function() {
    return Math.random() - 0.5;
});
}

function iniciarCronometro() {
    if (TempoCorrido != null ) {
        return
    }
        TempoCorrido = setInterval(() => {
                tempo++;
                let minutos = Math.floor(tempo / 60);
                let segundos =  tempo % 60;
                contadorTempo.textContent = String(minutos).padStart(2, "0") + ":" + String(segundos).padStart(2, "0");
            }, 1000);
}

embaralharCartas();

for (let i = 0; i < cartas.length; i ++) {
    let carta = document.createElement("div");

    let dadosCarta = {
        elemento: carta,
        revelada: false,
        encontrada: false
    };

    cartasDoJogo.push(dadosCarta);

    carta.textContent = (sem[0]);

    carta.addEventListener("click", function() {
        if (dadosCarta.revelada === false && bloqueado === false && dadosCarta.encontrada === false){
            carta.textContent = (cartas[i]);
            dadosCarta.revelada = true;
            
            if (primeiraCarta === null) {
                primeiraCarta = dadosCarta;
                iniciarCronometro();
            } else {
                segundaCarta = dadosCarta;
                bloqueado = true;
                tentativas++;
                contadorTentativas.textContent = tentativas;

                if (primeiraCarta.elemento.textContent === segundaCarta.elemento.textContent){
                    console.log("par encontrado!");
                    primeiraCarta.encontrada = true;
                    segundaCarta.encontrada = true;
                    paresEncontrados++;
                    pares.textContent = paresEncontrados + "/4";
                    if (paresEncontrados === 4) {
                        vitoria.style.display = "block";
                        soltarConfetes();
                        jogo.classList.add("desfocado");
                        Vtentativas.textContent = tentativas;
                        let minutos = Math.floor(tempo / 60);
                        let segundos =  tempo % 60;
                        Vtempo.textContent = String(minutos).padStart(2, "0") + ":" + String(segundos).padStart(2, "0");
                        clearInterval(TempoCorrido);
                    }

                    primeiraCarta = null;
                    segundaCarta = null;
                    bloqueado = false;
                    console.log(paresEncontrados);
                    
                } else {
                    console.log("As cartas são diferentes!");

                    setTimeout (function() {
                        primeiraCarta.elemento.textContent = (sem[0]);
                        segundaCarta.elemento.textContent = (sem[0]);

                        primeiraCarta.revelada = false;
                        segundaCarta.revelada = false;
                        
                        primeiraCarta = null;
                        segundaCarta = null;
                        bloqueado = false;
                    }, 1000);
                }
            }
        }
        
    })
    tabuleiro.appendChild(carta);
    carta.className = "item";
}

novoJogo.addEventListener("click", reiniciarJogo);
reiniciar.addEventListener("click", reiniciarJogo);

function reiniciarJogo() {
    tentativas = 0;
    paresEncontrados = 0;
    pares.textContent = paresEncontrados + "/4";
    Vtentativas.textContent = tentativas;
    contadorTentativas.textContent = tentativas;
    clearInterval(TempoCorrido);
    TempoCorrido = null;
    tempo = 0;
    contadorTempo.textContent = "00:00";
    vitoria.style.display = "none";
    jogo.classList.remove("desfocado");

    for (let i = 0; i < cartasDoJogo.length; i ++) {
        let dadosCarta = cartasDoJogo[i];
        dadosCarta.revelada = false;
        dadosCarta.encontrada = false;
        dadosCarta.elemento.textContent =(sem[0]);
    }

    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;

    embaralharCartas();
}

function soltarConfetes() {
    let areaConfetes = document.getElementById("confetes");
    let cores = ["#B8A7FF", "#FF6B9D", "#FFD166", "#7CE7AC", "#FFFFFF"];

    for (let i = 0; i < 100; i++) {
        let confete = document.createElement("div");

        confete.classList.add("confete");
        confete.style.left = Math.random() * 100 + "%";
        confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        confete.style.animationDelay = Math.random() * 2 + "s";
        confete.style.animationDuration = (2 + Math.random() * 2) + "s";

        areaConfetes.appendChild(confete);

        confete.addEventListener("animationend", function() {
            confete.remove();
        });
    }
}