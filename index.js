const Box = document.querySelectorAll(".box");
const GameInfo = document.querySelector('.game-info')
const Btn = document.querySelector(".btn")

let currentPlayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    Box.forEach((box, index) => {
        box.innerText = "";
        Box[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    });
    Btn.classList.remove("active");
    GameInfo.innerText = `Current Player-${currentPlayer}`;
}
initGame();

function swapTurn() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X"
    }
    GameInfo.innerText = `Current Player -${currentPlayer}`;
}
function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            if (gameGrid[position[0] === 'X'])
                answer = "X";
            else {
                answer = "O"
            }
            Box.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            Box[position[0]].classList.add("win");
            Box[position[1]].classList.add("win");
            Box[position[2]].classList.add("win");
        }
    });

    if (answer !== "") {
        GameInfo.innerText = `winner Player-${answer}`;
        Btn.classList.add("active");
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    if (fillCount === 9) {
        GameInfo.innerText = "Game Tied!";
        Btn.classList.add("active");
    }
}
function handleClick(index) {
    if (gameGrid[index] === "") {
        Box[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        Box[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}
Box.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index)
    })
});
Btn.addEventListener("click", initGame);