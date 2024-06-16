const boxes = document.querySelectorAll(".box");
const msgBox = document.querySelector(".msg-box");
const displayWinner = document.querySelector(".msg-box p");
const btns = document.querySelectorAll(".btn");

let turn = true;
let count = 0;

// const winningPatterns = [
//     [0, 1, 2, 3],
//     [4, 5, 6, 7],
//     [8, 9, 10, 11],
//     [12, 13, 14, 15],
//     [0, 4, 8, 12],
//     [1, 5, 9, 13],
//     [2, 6, 10, 14],
//     [3, 7, 11, 15],
//     [0, 5, 10, 15],
//     [3, 6, 9, 12]
// ];

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

boxes.forEach(box => {
    box.addEventListener("click", ()=>{
        if(turn){
            box.innerHTML = "X";
            box.style.color = "green";
            turn = false;
        }else{
            box.innerHTML = "O";
            box.style.color = "red";
            turn = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
        // if(count === 16 & !checkWinner()){
        //     drawGame();
        // }
        if(count == 9 & !checkWinner()){
            drawGame();
        }
    });
});

const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
const enabledBoxes = () => {
    turn = true;
    count = 0;
    for(let box of boxes){
        box.innerHTML = "";
        box.disabled = false;
    }
}
const showWinner = winner => {
    displayWinner.innerHTML = `Winner is '${winner}'`;
    msgBox.classList.add("show");
    disabledBoxes();
}
const drawGame = () => {
    displayWinner.innerHTML = "Draw, Restart the Game!";
    msgBox.classList.add("show");
    disabledBoxes();
}
const resetGame = () => {
    msgBox.classList.remove("show");
    enabledBoxes();
}

const checkWinner = () => {
    for(let pattern of winningPatterns){
        const posVal1 = boxes[pattern[0]].innerHTML;
        const posVal2 = boxes[pattern[1]].innerHTML;
        const posVal3 = boxes[pattern[2]].innerHTML;
        // const posVal4 = boxes[pattern[3]].innerHTML;

        // if(posVal1 != "" && posVal2 != "" && posVal3 != "" && posVal4 != ""){
        //     if(posVal1 === posVal2 && posVal2 === posVal3 && posVal3 === posVal4){
        //         showWinner(posVal1);
        //     }
        // }

        if(posVal1 != "" && posVal2 != "" && posVal3 != ""){
            if(posVal1 === posVal2 && posVal2 === posVal3){
                showWinner(posVal1);
            }
        }
    }
}

btns.forEach(btn => {
    btn.addEventListener("click", resetGame);
});