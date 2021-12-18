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

/**
 * Checks ifthe board passed as argument contains a winning row or column
 * @param {Array} board
 * @returns {boolean}
 */
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
        // if we find a non highlighted number we remember to skip the check on the corresponding column
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
 * as the sum of all the numbers NOT extracted.
 *
 * @param {Array} board
 * @returns {Number} - The score of the board
 */
function getScore(board) {
  return board.reduce(
    (rowSum, row) =>
      rowSum +
      row.reduce((sum, element) => {
        if (!element.highlight) return sum + element.value;
        return sum;
      }, 0),
    0,
  );
}

/**
 * Find this first winning board for the given number if one exist in the boards array.
 *
 * @param {Array} boards
 * @param {Number} number
 * @returns {Array|undefined} winning board if one is found, or undefined if not/
 */
function findBoard(boards, number, index) {
  return boards.find((board) => {
    board.forEach((row) => {
      row.forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        if (element.value === number) element.highlight = true;
      });
    });
    // check for a winner only if at least 5 numbers have been extracted.
    if (index > 4 && checkWinner(board)) return board;
    return undefined;
  });
}

/**
 * Returns the score of the first winning board in boardsArray
 * @param {Array} boardsArray
 * @param {Array} numbers
 * @returns {Number}
 */
function solution1(boards, numbers) {
  const localBoards = [...boards];
  let board = [];

  const number = numbers.find((num, index) => {
    board = findBoard(localBoards, num, index);
    if (board) return num;
    return undefined;
  });

  if (number) return number * getScore(board);
  console.log('No winner found!');
  return 0;
}

// const [testNumbers, testBoards] = getInput('./test.txt');
const [numbers, boards] = getInput('./input.txt');
console.log(solution1(boards, numbers));
