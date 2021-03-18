var hasFlippedCard = false;
var firstCard, secondCard;
var lockBoard = false;
var image_ref = [
    'images/Jimin.jpeg',
    'images/Jimin.jpeg',
    'images/Taehyung.jpeg',
    'images/Taehyung.jpeg',
    'images/Namjoon.jpeg',
    'images/Namjoon.jpeg',
    'images/Jungkook.jpeg',
    'images/Jungkook.jpeg',
    'images/Seokjin.jpeg',
    'images/Seokjin.jpeg',
    'images/Yoongi.jpeg',
    'images/Yoongi.jpeg',
    'images/Hoseok.jpeg',
    'images/Hoseok.jpeg',
    'images/Jimin-1.jpeg',
    'images/Jimin-1.jpeg',
    'images/Taehyung-1.jpeg',
    'images/Taehyung-1.jpeg',
    'images/Namjoon-1.jpeg',
    'images/Namjoon-1.jpeg',
    'images/Jungkook-1.jpeg',
    'images/Jungkook-1.jpeg',
    'images/Seokjin-1.jpeg',
    'images/Seokjin-1.jpeg',
    'images/Yoongi-1.jpeg',
    'images/Yoongi-1.jpeg',
    'images/Hoseok-1.jpeg',
    'images/Hoseok-1.jpeg',
    'images/BTS.jpeg',
    'images/BTS.jpeg',

];
var attempts = 0;
var score = 0;
var pairsFound = 0;

function start(){
    addClick();
    sortCards();
    document.getElementById('start-button').disabled=true;
    document.getElementById('reset-button').disabled=false;
}

function reset(){
    for(var i=0;i<30;i++){
        var temp_id = i+1
        var temp_card = document.getElementById(temp_id)
        if(temp_card.classList.contains('flipped')){
            temp_card.classList.remove('flipped');
        }
        else{
            temp_card.removeEventListener('click', flipCard);
        }
    }
    attempts = 0;
    score = 0;
    pairsFound = 0;

    updateScores()

    document.getElementById('start-button').disabled=false; 
    document.getElementById('reset-button').disabled=true;
 
}

function addClick(){
    for(var i=0;i<30;i++){
        var temp_id = i+1
        var temp_card = document.getElementById(temp_id)
        temp_card.addEventListener('click',flipCard);
    }
}

function sortCards(){
    image_ref.sort(()=>( Math.round(Math.random())-0.5));
    for (var i = 0; i < 30; i++) {
        var temp_id = "frontface-"+(i+1);
        var temp_pic = image_ref[i];
        var temp_url = `url("${temp_pic}")`;
        var temp_card = document.getElementById(temp_id);
        temp_card.style.backgroundImage = temp_url  ;  
    } 
}

function flipCard() {
    if (lockBoard) return;
    if (this.id == firstCard) return;
    this.classList.add('flipped');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = Number(this.id);
    }
    else{
        secondCard = Number(this.id);
        checkMatch();
    }
}

function checkMatch(){
    if(image_ref[firstCard-1]===image_ref[secondCard-1]){
        disableCards();
        score+=100;
        pairsFound+=1;    
    }
    else{
        score-=20;
        unflipCards();
    }
    attempts+=1;
    updateScores();
    if (pairsFound == 15){
        setTimeout(() => {
           alert("CONGRATULATIONS!");
        }, 500);
    }
}

function disableCards() {
    document.getElementById(firstCard).removeEventListener('click', flipCard);
    document.getElementById(secondCard).removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      document.getElementById(firstCard).classList.remove('flipped');
      document.getElementById(secondCard).classList.remove('flipped');
      resetBoard();
    }, 1000);
  }

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function updateScores(){
    var temp_score = document.getElementById('score-value')
    var temp_attempts = document.getElementById('attempts-value')
    temp_score.innerText = `Score = ${score}`
    temp_attempts.innerText = `Attempts = ${attempts}`
}
