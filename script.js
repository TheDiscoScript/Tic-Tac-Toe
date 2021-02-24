// const gameBoard - create board, clear board, update board
// const displayController - check for win, rounds
// const gamePlayer - factory =sign
// const
const gameBoard = (() =>{
    //this stores either X or Y
    const boardPlayerValue = ["", "", "", "", "", "", "", "", "",]
    //this function stores sign of player in boardPlayerValue
    const inBoard = (position, sign) => {
        if (position > board.length) return
        boardPlayerValue[position] = sign
    }
    //this exports position of sign
    const outBoard = (position) =>{
        if (position > board.length) return
        return boardPlayerValue[position]
    }
    const startB = document.querySelector("#startGame")
    startB.addEventListener("click", createBoard)
    function createBoard(){
        const buildingBoard = document.querySelector("#gridContainer")
        for (let i = 1; i < 10; i++){
            let grids = document.createElement("div")
            buildingBoard.insertAdjacentElement("afterbegin", grids)
            grids.setAttribute("data-number", `${i}`)
        }
        startB.disabled = true
      let wholeBoard = buildingBoard.querySelectorAll("div")
      wholeBoard.forEach(block => block.addEventListener("click", updateBoard))
        };

    function updateBoard(){
        this.textContent += "x"
   }

    //TODO - clear board
    return {createBoard, inBoard, outBoard}
})();


const gamePlayer = (sign) =>{
    this.sign = sign //this will be private
    const showSign = () =>{
        return sign
    }
    return {showSign} //public
};


const displayController = (() =>{
    //create players
    const playerX = gamePlayer("X")
    const playerO = gamePlayer("O")
    //sign
    let roundC = 1
    const whichSign = () => {
        if(roundC % 2 === 1){
           return playerX.showSign()
        }else{return playerO.showSign()}
    }
    
    //input board

    //check for win --> win conditions
})();

