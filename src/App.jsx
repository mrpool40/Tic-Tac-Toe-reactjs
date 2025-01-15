import React, { useState } from 'react';

// Winning combinations for the game
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Cell component for individual squares
const Cell = ({ value, onClick }) => (
  <div 
    className="cell"
    onClick={onClick}
    data-value={value}
  >
    {value}
  </div>
);

function App() {
  // Game state
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameActive, setGameActive] = useState(true);
  const [status, setStatus] = useState("Player X's Turn");

  // Check for win condition
  const checkWin = (boardState, player) => {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => boardState[index] === player);
    });
  };

  // Check for draw condition
  const checkDraw = (boardState) => {
    return boardState.every(cell => cell !== '');
  };

  // Handle cell click
  const handleCellClick = (index) => {
    if (!gameActive || board[index] !== '') return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Check win
    if (checkWin(newBoard, currentPlayer)) {
      setStatus(`Player ${currentPlayer} Wins!`);
      setGameActive(false);
      return;
    }

    // Check draw
    if (checkDraw(newBoard)) {
      setStatus("Game Draw!");
      setGameActive(false);
      return;
    }

    // Switch player
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setCurrentPlayer(nextPlayer);
    setStatus(`Player ${nextPlayer}'s Turn`);
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setGameActive(true);
    setStatus("Player X's Turn");
  };

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <div className="status">{status}</div>
      <div className="game-board">
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            onClick={() => handleCellClick(index)}
          />
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        New Game
      </button>
    </div>
  );
}

export default App;