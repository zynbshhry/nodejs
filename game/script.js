
const statusDisplay = document.querySelector('.game--status');
const scorePlayer1=document.getElementById('current-score1');
const scorePlayer2=document.getElementById('current-score2');
const modal=document.querySelector("#myModal");
const closebtn=document.querySelectorAll('.close');
const Confirm=document.querySelector('.confirm');
const symbol1=document.getElementById('symbol1');
const symbol2=document.getElementById('symbol2');
let getPlayer1=document.getElementById('player1');
let getPlayer2=document.getElementById('player2');
let currentPlayer = 'X';
let data=['','','','','','','','',''];
let gameOver = false;
let [a,b]=nameSymbol();
statusDisplay.innerHTML=`It's ${b}'s turn`;
window.onload =function(){
  let x=localStorage.getItem('X');
  let o=localStorage.getItem('O');
  if (x===null){
      
      localStorage.setItem('X',0);
      scorePlayer2.innerHTML=0;
  }else{
    
    localStorage.setItem('X',x);
    scorePlayer2.innerHTML=x;

  }
  if (o===null){
    localStorage.setItem('O',0);
    scorePlayer1.innerHTML=0;
  }else{
  localStorage.setItem('O',o);
  scorePlayer1.innerHTML=o;
  };
  let [a,b]=nameSymbol();
  symbol1.innerHTML=`${a} : O`;
  symbol2.innerHTML=`${b} : X`;
};
function nameSymbol(){
  let symbol=JSON.parse(localStorage.getItem('players'));
  if(symbol){
    return [symbol.player1,symbol.player2];
 }else{
   return ['O','X'];
 }
}
function score(theWiningPlayer){
    if(theWiningPlayer==='O'){
      currentScore=localStorage.getItem(theWiningPlayer);
      currentScore=parseInt(currentScore)+1;
      scorePlayer1.innerHTML=currentScore;
    }else if(theWiningPlayer==='X'){
      currentScore=localStorage.getItem(theWiningPlayer);
      currentScore=parseInt(currentScore)+1;
      scorePlayer2.innerHTML=currentScore;
    }
    localStorage.setItem(theWiningPlayer,currentScore);
    return
}
function handlePlayerChange() {
  currentPlayer=currentPlayer==='X'?'O':'X';
  let [a,b]=nameSymbol();
  statusDisplay.innerHTML=currentPlayer==='O'?`It's ${a}'s turn`:`It's ${b}'s turn`;
}
function handleCellClick() {
  if (gameOver === false){

    if (data[this.getAttribute('data-cell-index')] === ''){
        this.innerHTML=currentPlayer;
        currentPlayer==='X'? this.setAttribute("style", "color:BlueViolet"):this.setAttribute("style", "color:rgb(230, 36, 158)");
        data[this.getAttribute('data-cell-index')]=currentPlayer;
        stateOfGame();
    }
  }
  
}
function handleRestartClick(){
     document.querySelectorAll('.cell').forEach(cell => cell.innerHTML='');
      gameOver= false;
      let [a,b]=nameSymbol();
      currentPlayer=currentPlayer==='X'?'O':'X';
      turn=currentPlayer==='X'? b : a;
      statusDisplay.innerHTML=`It's ${turn}'s turn`;
      data=['','','','','','','','',''] ;
      
}
function stateOfGame(){
  let [a,b]=nameSymbol();
  stateOfWin=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let won =false;
  for (let combination of stateOfWin){
    let [a,b,c]=combination;
    if (data[a]&& data[a]===data[b]&& data[a]===data[c]){
      won=true;
      break;
    }if (data[a] === "" || data[b] === "" || data[c] === "") {
      continue;
    }
    
  }
  if(won){
    gameOver=true;
    statusDisplay.innerHTML=currentPlayer==='O'?`player ${a} has won `:`player ${b} has won`;
    score(currentPlayer);
    return
  }
  if(!data.includes("")){
    gameOver=true;
    statusDisplay.innerHTML='Game ended in a draw!';
    return
  };
  handlePlayerChange();
  
}
function newGame(){
  localStorage.setItem('X',0);
  localStorage.setItem('O',0);
  scorePlayer1.innerHTML="0";
  scorePlayer2.innerHTML="0";
  currentPlayer='X';
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML='');
  gameOver= false;
  data=['','','','','','','','',''] ;
}
function showModal(){
  modal.style.display = "block";
}
function nameOfPlayes(){
    let players={'player1':getPlayer1.value,'player2':getPlayer2.value};
    localStorage.setItem('players',JSON.stringify(players));
    close();
    let [a,b]=nameSymbol();
    symbol1.innerHTML=`${a} : O`;
    symbol2.innerHTML=`${b} : X`;
    statusDisplay.innerHTML=`It's ${b}'s turn`;
}
function close(){
  modal.style.display="none";
}
document
  .querySelectorAll('.cell')
  .forEach(cell => cell.addEventListener('click',handleCellClick));
document.querySelector('#game--restart').addEventListener('click',handleRestartClick);
document.querySelector('#new--game').addEventListener('click',()=>{
  showModal();
  newGame();})
closebtn.forEach((elem)=>{elem.addEventListener('click',close)});
Confirm.addEventListener('click',nameOfPlayes);