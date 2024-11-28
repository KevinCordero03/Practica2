export const checkWinner = (board) => {
    const winPatterns = [
      // Horizontales
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Verticales
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonales
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        board[a] && 
        board[a] === board[b] && 
        board[a] === board[c]
      ) {
        return board[a];
      }
    }
  
    return board.includes(null) ? null : 'draw';
  };