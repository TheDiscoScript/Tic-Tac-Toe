// const gameBoard - create board, clear board, update board
// const displayController - check for win, rounds
// const gamePlayer - factory =sign + playercreation
// const

//module
const gameBoard = (() =>{
    //this stores either X or Y
    const boardPlayerValue = []
    for( let i = 0; i < 9; i++){
        boardPlayerValue.push("")
    }

    //this function stores sign of player in boardPlayerValue
    const inBoard = (position, sign) => {
        if (position > boardPlayerValue.length) return
        boardPlayerValue[position] = sign
    } 
    const outBoard = (position) => {
        if(position > boardPlayerValue.length) return
        return boardPlayerValue[position]
    }


    const startB = document.querySelector("#startGame")
    startB.addEventListener("click", createBoard)
    function createBoard(){
        const buildingBoard = document.querySelector("#gridContainer")
        for (let i = 0; i < 9; i++){
            let grids = document.createElement("div")
            buildingBoard.insertAdjacentElement("afterbegin", grids)
            grids.setAttribute("data-number", `${i}`)
        }
        startB.disabled = true
      let wholeBoard = buildingBoard.querySelectorAll("div")
      wholeBoard.forEach(block => block.addEventListener("click", updateBoard))
      wholeBoard.forEach(block => block.addEventListener("click", storePosition))
    };
    function storePosition () {
        inBoard(this.dataset.number, this.textContent)
        console.log(boardPlayerValue)
     
    }
    
  /* const clearB = document.querySelector("#clearGrid")
    clearB.addEventListener("click", clearBoard)
      function clearBoard(){
        const buildingBoard = document.querySelector("#gridContainer")
        let wholeBoard = buildingBoard.querySelectorAll("div")
        wholeBoard.forEach(block => block.textContent = "")
        for( let i = 0; i < boardPlayerValue.length; i++){
            boardPlayerValue[i] = ""
        }
        displayController.resetRoundC()
    }*/

    function updateBoard(){
        if(this.textContent == "X" || this.textContent == "O"){
            return
        } else{
            this.textContent += displayController.whichSign()
        }
   }

    function showBoardStatus(){
         console.log(boardPlayerValue)
    }
    //TODO - clear board
    return {createBoard, /*clearBoard*/ inBoard, outBoard, showBoardStatus,}
})();

//factory
const gamePlayer = (sign) =>{
    this.sign = sign //
    const showSign = () =>{
       return sign
    }
    return {showSign} //public
};

//module
const displayController = (() =>{
    //create players
    const playerX = gamePlayer("X")
    const playerO = gamePlayer("O")


    //sign
    let roundC = 1
    const whichSign = () => {
        if (roundC === 10){
            return
        }else if(roundC % 2 === 1){
            roundC++
            return playerX.showSign()
        }else if(roundC % 2 ===0){
            roundC++
            return playerO.showSign()
        }
    }

  /*  const resetRoundC = () =>{
        let roundC = 1;
        return roundC
    }*/
    //check for win --> win conditions
    const conditionsForWin = [

        // 0 1 2 
        // 3 4 5
        // 6 7 8

        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [3, 4, 5],
        [6, 4, 2],
        [6, 7, 8],
        [1, 4, 7],
        [2, 5, 8]
    ]
    const checkForWin = () =>{

    }
    return{whichSign,  /*resetRoundC*/}
})();

