const fs = require('fs');

/**
 * Format input file in two arrays.
 * numbers contains the bingo numbers.
 * boards is an array of all the boards
 * each board is an array of 5 rows, each row contain 5 objects in the form
 * {value: number, highlight: boolean} representing a number of the board
 * and if it had been extracted.
 *
 * @param {File} inputFile
 * @returns {Array} - [numbers, boards]
 */
function getInput(inputFile) {
  const input = fs
    .readFileSync(inputFile)
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
  return [numbers, boards];
}

function checkWinner(board) {
  // array to remember which columns to skip.
  const colSkip = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  };
  // check for winning rows
  if (
    board.some((row) =>
      row.every((element, index) => {
        if (element.highlight) return true;
        // if we find a non highlighted number we remember to skip checking the corresponding column
        colSkip[index] = true;
        return false;
      }),
    )
  )
    return true;

  // check for winning columns
  // we map each element of the first row to the corresponding column
  // and we check if any of the columns has every element highlighted.
  if (
    board[0].some((_, colIndex) => {
      // if the column index is in the skipColumn array, we skip the corrisponding column altogether.
      if (colSkip[colIndex]) return false;
      return board
        .map((row) => row[colIndex])
        .every((element) => element.highlight);
    })
  )
    return true;

  // if the board has no winning row or column
  return false;
}

/**
 * Calculates the score of the board passed as first argument
 * as the sum of all the numbers NOT extracted
 * multiplied for the last number extracted passes as second argument.
 *
 * @param {Array} board
 * @param {Number} num
 * @returns {Number} - The score of the board
 */
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

function bingo(boards, numbers) {
  numbers.find((number) =>
    boards.find((board, boardNum) => {
      board.forEach((row) => {
        row.forEach((element) => {
          // eslint-disable-next-line no-param-reassign
          if (element.value === number) element.highlight = true;
        });
      });
      if (checkWinner(board)) {
        console.log('Winner is board: ', boardNum + 1);
        console.log('Score is: ', getScore(board, number));
        return true;
      }
      return false;
    }),
  );
}

const [numbers, boards] = getInput('./input.txt');
const [testNumbers, testBoards] = getInput('./testCol.txt');
bingo(testBoards, testNumbers);
bingo(boards, numbers);
