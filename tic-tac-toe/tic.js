// script.js

const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const restartBtn = document.getElementById('restartBtn');
const winningMessage = document.getElementById('winningMessage');

let currentPlayer = 'X';
let isGameActive = true;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleClick(e) {
    const cell = e.target;
    if (cell.textContent === '' && isGameActive) {
        cell.textContent = currentPlayer;
        cell.style.transform = 'scale(1.2)';
        setTimeout(() => cell.style.transform = 'scale(1)', 150);
        if (checkWin(currentPlayer)) {
            winningMessage.textContent = `${currentPlayer} Wins!`;
            winningMessage.classList.remove('hidden');
            isGameActive = false;
        } else if (checkDraw()) {
            winningMessage.textContent = 'Draw!';
            winningMessage.classList.remove('hidden');
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function restartGame() {
    currentPlayer = 'X';
    isGameActive = true;
    winningMessage.classList.add('hidden');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#333';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
