const fs = require('fs');

// const test = fs
//   .readFileSync('./test.txt')
//   .toString('utf-8')
//   .trim()
//   .split('\n\n');

// const testnum = test
//   .shift()
//   .split(',')
//   .map((num) => +num);

// const testboards = test.map((arr) =>
//   arr.split('\n').map((row) =>
//     row
//       .split(' ')
//       .filter((el) => el !== '')
//       .map((val) => ({ value: +val, highlight: false })),
//   ),
// );

const input = fs
  .readFileSync('./input.txt')
  .toString('utf-8')
  .trim()
  .split('\n\n');

const numbers = input
  .shift()
  .split(',')
  .map((num) => +num);

const boards = input.map((arr) =>
  arr.split('\n').map((row) =>
    row
      .split(' ')
      .filter((el) => el !== '')
      .map((val) => ({ value: +val, highlight: false })),
  ),
);

function checkWinner(board) {
  const rows = board.length;
  const cols = board[0].length;
  const colSkip = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  };
  // check rows
  for (let i = 0; i < rows; i += 1) {
    let count = 0;
    for (let j = 0; j < cols; j += 1) {
      if (board[i][j].highlight !== true) {
        colSkip[j] = true;
        break;
      }
      count += 1;
    }
    if (count === 5) return true;
  }
  // check colums
  for (let i = 0; i < cols; i += 1) {
    let count = 1;
    // eslint-disable-next-line no-continue
    if (colSkip[i]) continue;
    for (let j = 0; j < rows; j += 1) {
      if (board[j][i] !== true) {
        break;
      }
      count += 1;
    }
    if (count === 5) return true;
  }
  return false;
}

function getScore(board, num) {
  const sum = board.reduce(
    (rowSum, row) =>
      rowSum +
      row.reduce((colSum, col) => {
        if (!col.highlight) return colSum + col.value;
        return colSum;
      }, 0),
    0,
  );
  return sum * num;
}

function bingo(boardsarr, nums) {
  for (let i = 0, numlen = nums.length; i < numlen; i += 1) {
    for (
      let j = 0, boardslen = boardsarr.length;
      j < boardslen;
      j += 1
    ) {
      for (
        let k = 0, boardrows = boards[0].length;
        k < boardrows;
        k += 1
      ) {
        for (
          let l = 0, rowlen = boards[0][0].length;
          l < rowlen;
          l += 1
        ) {
          if (boardsarr[j][k][l].value === nums[i])
            // eslint-disable-next-line no-param-reassign
            boardsarr[j][k][l].highlight = true;
          if (i > 3) {
            if (checkWinner(boardsarr[j])) {
              console.log('Winner is board: ', j + 1);
              console.log(
                'Score is: ',
                getScore(boardsarr[j], nums[i]),
              );
              return 0;
            }
          }
        }
      }
    }
  }
  console.log('No winners!');
  return 0;
}

bingo(boards, numbers);
// console.log(input);

// console.log(numbers);
