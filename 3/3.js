const fs = require('fs');

const test = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
];

// retrive input as an array of strings
const values = fs
  .readFileSync('./input.txt')
  .toString('utf-8')
  .split('\n');

// solution 1
function powerConsuption(input) {
  let gamma = '';
  let epsilon = '';

  for (let i = 0, len = input[0].length; i < len; i += 1) {
    const bits = [0, 0];
    for (let j = 0, arrLen = input.length; j < arrLen; j += 1) {
      if (input[j][i] === '0') bits[0] += 1;
      else bits[1] += 1;
    }
    gamma += bits[0] > bits[1] ? '0' : '1';
    epsilon += bits[0] > bits[1] ? '1' : '0';
  }
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

// solution 1
console.log(powerConsuption(values));
