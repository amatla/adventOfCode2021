const board = [
  [1, 0, 1, 1],
  [0, 0, 1, 1],
  [0, 0, 1, 1],
  [0, 0, 0, 1],
  [1, 1, 1, 1],
];
const colSkip = { 0: false, 1: false, 2: false, 3: false };

console.log(
  board.findIndex((row) =>
    row.every((element, index) => {
      if (element === 1) return true;
      colSkip[index] = true;
      return false;
    }),
  ),
);

console.log(
  board[0].some((col, colIndex) => {
    if (colSkip[colIndex]) return false;
    if (
      board
        .map((row) => row[colIndex])
        .every((element) => element === 1)
    )
      return true;
    return false;
  }),
);

// const colArr = board[0].map((col, colIndex) =>
//   board.map((row) => row[colIndex]),
// );
