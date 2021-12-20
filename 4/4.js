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
 * Checks if the board passed as argument contains a winning row or column
 * @param {Array} board
 * @returns {boolean}
 */
function isWinner(board) {
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
      // if the column index is in the skipColumn array, we skip the corresponding column altogether.
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
 * Check if the board passed as first argument contains the number passed as second argument.
 * If it does higlhlight the number on the board.
 * Returns a new board with the highlighted element.
 *
 * @param {Array} board
 * @param {Number} num
 * @returns {Array} updated board.
 */
function updateBoard(board, num) {
  return board.map((row) =>
    row.map((element) => {
      if (element.value === num)
        return { value: element.value, highlight: true };
      return element;
    }),
  );
}

/**
 * Returns the score of the first winning board in boardsArray
 * @param {Array} boardsArray
 * @param {Array} numbers
 * @returns {Number}
 */
function solution1(boards, numbers) {
  const localBoards = [...boards];
  let winningBoard = [];
  let winningNumber = 0;

  // updates the localBoards array highlighting the current number in each board.
  // if a board is the winner stops and stores the winning board.
  const findBoard = (num, index) =>
    localBoards.some((board, boardIndex) => {
      const currentBoard = updateBoard(board, num);
      // if at least 5 numbers have been extracted check if the current board is winning.
      if (index >= 4 && isWinner(currentBoard)) {
        winningBoard = currentBoard;
        winningNumber = num;
        return true;
      }
      // if the current board is not winning, update the boards array with the current updated board.
      localBoards[boardIndex] = currentBoard;
      return false;
    });

  // find the first number for which a winning board exist.
  // if a number is found return the score of the winning board.
  if (numbers.some((num, index) => findBoard(num, index)))
    return getScore(winningBoard) * winningNumber;
  // if not return 0.
  console.log('No winners found.');
  return 0;
}

function solution2(boards, numbers) {
  let localBoards = [...boards];
  let winningBoard = [];
  let winningNumber;
  const numLen = numbers.length - 1;

  const findBoard = (num, index) => {
    console.log(`Number is ${num}`);
    localBoards.forEach((board, boardIndex) => {
      const newBoards = [];
      const currentBoard = updateBoard(board, num);
      if (isWinner(currentBoard)) {
        winningBoard = currentBoard;
        winningNumber = num;
        console.log(`winner found. winning num is ${winningNumber}`);
      } else newBoards.push(currentBoard);
    });
    localBoards = newBoards;

    console.log(`localboard length is ${localBoards.length}`);
    if (localBoards.length === 0 || index === numLen)
      return winningNumber;
    return undefined;
  };
  numbers.find((num, index) => findBoard(num, index));
  console.log(`winning number is ${winningNumber}`);
  console.log('winning board is: ', winningBoard);
  if (winningNumber !== undefined)
    return getScore(winningBoard) * winningNumber;
  // if not return 0.
  console.log('No winners found.');
  return 0;
}

const [testNumbers, testBoards] = getInput('./test.txt');
const [numbers, boards] = getInput('./input.txt');
// console.log(solution1(boards, numbers));
console.log(solution2(testBoards, testNumbers));
