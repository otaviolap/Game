let blackJackGame = {
    "jogador"   :{'spanPontuacao':'#jogador-pontuacao','div':'#jogador-box','pontuacao':0},
    "computador":{'spanPontuacao':'#computador-pontuacao','div':'#computador-box','pontuacao':0},
    "cartas":['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    "cartasPontos": {'2':2, '3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10, 'K':10, 'J':10,'Q':10,'A':[1,11]},

  }
  function login() {
    const name = document.getElementById("name").value;
    const ageChecked = document.getElementById("age").checked;
    const errorMessage = document.getElementById("error-message");

    if (name === "") {
        errorMessage.textContent = "Por favor, insira seu nome.";
        return;
    }

    if (ageChecked) {
        window.location.href = "index2.html";
    } else {
        errorMessage.textContent = "Você precisa ser maior de 18 anos para continuar.";
    }
}
  const JOGADOR = blackJackGame['jogador'];
  const COMPUTADOR =  blackJackGame['computador'];
  
  const audioHIT = new Audio('src/audio/swish.m4a');
  const audioWIN = new Audio('src/audio/cash.mp3'); 
  const audioLOSS = new Audio('src/audio/aww.mp3'); 
  
  
  document.querySelector('#blackjack-hit-button').addEventListener('click',blackJackHit);
  document.querySelector('#blackjack-stand-button').addEventListener('click',computadorInteligencia);
  document.querySelector('#blackjack-deal-button').addEventListener('click',blackJackDeal)
  
  
 
  document.addEventListener('keyup',apertaTecla,false);
  
  

  alert(nome);
  document.getElementById('spanNome').innerHTML=nome;
  
  function apertaTecla(e){
    console.log(e.keyCode);
  
    if (e.keyCode == 49){
      blackJackHit();
    }else if(e.keyCode == 50){
      computadorInteligencia();
    }else if(e.keyCode == 51){
      blackJackDeal();
    }
  
  }
  
  
 
  
  function blackJackHit(){
  
    if (blackJackGame['isStand'] === false){
  
        let cartaSelecionada  = sortearCarta();
        criarCarta(cartaSelecionada,JOGADOR);
        atualizarPontuacao(cartaSelecionada,JOGADOR);
        mostrarPontuacao(JOGADOR);
  
      }
  }
  
  function sortearCarta(){
    let randomIndex = Math.floor(Math.random() * blackJackGame['cartas'].length);
    return blackJackGame['cartas'][randomIndex];
  }
  
  function criarCarta(carta, jogadorAtivo){
  
    if(jogadorAtivo['pontuacao']<= 21){
        var cardImage = document.createElement('img');
        cardImage.src = `image2/${carta}.png`;
        document.querySelector(jogadorAtivo['div']).appendChild(cardImage);
        audioHIT.play();
    }
  }
  
  function blackJackDeal(){

  
    if(blackJackGame['turnsOver'] === true){
  
        blackJackGame['isStand'] = false;
  
        let imagensJogador = document.querySelector("#jogador-box").querySelectorAll('img');
        let imagensComputador = document.querySelector("#computador-box").querySelectorAll('img');
  
          for(i=0; i <imagensJogador.length;i++){
              imagensJogador[i].remove();
          }
  
          for(i=0; i <imagensComputador.length;i++){
            imagensComputador[i].remove();
        }
  

        JOGADOR['pontuacao'] = 0;
        COMPUTADOR['pontuacao'] = 0;
  
        document.querySelector('#jogador-pontuacao').textContent = 0;
        document.querySelector('#jogador-pontuacao').style.color = '#ffffff';
  
        document.querySelector('#computador-pontuacao').textContent = 0;
        document.querySelector('#computador-pontuacao').style.color = '#ffffff';
  
        document.querySelector('#blackjack-resultado').textContent = 'Vamos jogar';
        document.querySelector('#blackjack-resultado').style.color = 'black';
  
        blackJackGame['turnsOver'] = true;
  
    }
  }
  
  function atualizarPontuacao(carta,jogadorAtivo){
 
    if(carta === 'A'){
        if (jogadorAtivo['pontuacao'] + blackJackGame['cartasPontos'][carta][1] <= 21){
            jogadorAtivo['pontuacao'] += blackJackGame['cartasPontos'] [carta][1];     
        }else{
            jogadorAtivo['pontuacao'] += blackJackGame['cartasPontos'] [carta][0];   
        }
    }else{
    jogadorAtivo['pontuacao'] += blackJackGame['cartasPontos'][carta];
    }
  
  }
  
  function mostrarPontuacao(jogadorAtivo){
    if (jogadorAtivo['pontuacao'] > 21){
      document.querySelector(jogadorAtivo['spanPontuacao']).textContent = 'BUST!';
      document.querySelector(jogadorAtivo['spanPontuacao']).style.color = 'red';
    }else{
    document.querySelector(jogadorAtivo['spanPontuacao']).textContent = jogadorAtivo['pontuacao'];
    }
  }
  
  function sleep (ms){
      return new Promise(resolve => setTimeout(resolve,ms));
  }
  
  
  
  async function computadorInteligencia(){
  
    blackJackGame['turnsOver'] = false;
    blackJackGame['isStand'] = true;
  

    while (COMPUTADOR['pontuacao'] < 16 && blackJackGame['isStand'] === true ){
      let carta = sortearCarta();
    
      criarCarta(carta,COMPUTADOR);
      atualizarPontuacao(carta,COMPUTADOR);
      mostrarPontuacao(COMPUTADOR);
  

      await sleep(1000);
  
    }
  
  
      
      blackJackGame['turnsOver'] = true;
  
      let vencedor = computarVencedor();
      mostrarResultadoFinal(vencedor);
  
  }
  

  function computarVencedor(){
    let vencedor;
  
    if (JOGADOR['pontuacao'] <= 21){
        

  
        if (JOGADOR['pontuacao']> COMPUTADOR['pontuacao'] || COMPUTADOR['pontuacao']> 21){
            
            blackJackGame['vitorias']++;
            vencedor = JOGADOR;
  
        }else if (JOGADOR['pontuacao'] < COMPUTADOR['pontuacao'] ){
            
            blackJackGame['derrotas']++;
            vencedor = COMPUTADOR;
        
        }else if (JOGADOR['pontuacao'] === COMPUTADOR['pontuacao']){
            blackJackGame['emaptes']++;
        
        }
    

    }else if(JOGADOR['pontuacao'] > 21 && JOGADOR['pontuacao']<= 21){
      blackJackGame['derrotas']++;
      vencedor = COMPUTADOR;
  
    }else if(JOGADOR['pontuacao'] > 21 && JOGADOR['pontuacao'] > 21){
      blackJackGame['empates']++;
    }
  
    console.log(blackJackGame);
    return vencedor;
  
  }
  
  function mostrarResultadoFinal(vencedor){
    let mensagem, mensagemColor;
  
    if(blackJackGame['turnsOver'] === true){
    
          if(vencedor === JOGADOR){
  
            document.querySelector('#vitorias').textContent = blackJackGame['vitorias'];
            
            mensagem = 'Você venceu!'
            mensagemColor = 'green';
  
            audioWIN.play();
  
          }else if(vencedor === COMPUTADOR){
            
            document.querySelector('#derrotas').textContent = blackJackGame['derrotas'];
  
            mensagem = 'Você perdeu!'
            mensagemColor = 'red';
            
            audioLOSS.play();
  
          }else{
  
            document.querySelector('#empates').textContent = blackJackGame['empates'];
  
            mensagem = 'Empate!'
            mensagemColor = 'black';
  
          }
  
          document.querySelector('#blackjack-resultado').textContent = mensagem;
          document.querySelector('#blackjack-resultado').style.color = mensagemColor;
      }
  }
  
  
  
