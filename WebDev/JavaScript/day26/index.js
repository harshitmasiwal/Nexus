const board = document.querySelector(".board")
let turn = "0"
let total_turns = 0
const msg = document.querySelector(".winning-message")
const restart = document.getElementById("restartButton")

let win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function isWinner(){

    for( [one,two,three] of win){
        if(board_array[one] !="E" && board_array[one] === board_array[two] && board_array[one] === board_array[three]){
            return true;
        }
    }
    return false
}

let board_array = new Array(9).fill("E")
console.log(board_array)


function TikTakToe(e){
const box = e.target

    if(board_array[e.target.id] === "E"){

    if(turn === "0" ){
            box.innerHTML = "O"
            board_array[e.target.id] = "O"

        
        if(isWinner()){
            msg.innerHTML = "O IS THE WINNER"
            board.removeEventListener('click' , TikTakToe)
        }
        turn = "1"
    }
    else{
        box.innerHTML = "x"
        board_array[e.target.id] = "X"
        
        if(isWinner()){
            msg.innerHTML = "X IS THE WINNER"
            board.removeEventListener('click' , TikTakToe)
        }
        turn = "0"
    }

    total_turns++
}
    if(total_turns == 9){
        msg.innerHTML = "GAME DRAW"
        board.removeEventListener('click' , TikTakToe)
    }
}

board.addEventListener('click' , TikTakToe)

restart.addEventListener('click' , ()=>{

    turn = "O"
    total_turns = 0
    board_array = new Array(9).fill("E")
    //clear all the div 
    
    const cells = document.getElementsByClassName("cell")
    Array.from(cells).forEach((cell)=>{
        cell.innerHTML = ""
    })
    board.addEventListener('click' , TikTakToe)
    msg.innerHTML = ""
})