const fs = require('fs');

// const test = [
//   '00100',
//   '11110',
//   '10110',
//   '10111',
//   '10101',
//   '01111',
//   '00111',
//   '11100',
//   '10000',
//   '11001',
//   '00010',
//   '01010',
// ];

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

// filters an array based on what the most significant bit at position 'pos' is
// if the rating is 'oxygen'
// filters the array based on what the least significant bit at positon 'pos' is
// if the rating is 'co2'
function filter(arr, pos, rating) {
  const one = [];
  const zero = [];
  for (let i = 0, len = arr.length; i < len; i += 1) {
    if (arr[i][pos] === '1') one.push(arr[i]);
    else zero.push(arr[i]);
  }
  if (rating === 'oxygen')
    return one.length >= zero.length ? one : zero;
  if (rating === 'co2') return one.length >= zero.length ? zero : one;
  return console.error("rating must be 'oxygen' or 'co2'");
}

// solution 2
function lifeSupport(input) {
  let pos = 0;
  let oxygen = filter(input, pos, 'oxygen');
  let co2 = filter(input, pos, 'co2');
  while (oxygen.length > 1 || co2.length > 1) {
    pos += 1;
    if (oxygen.length > 1) oxygen = filter(oxygen, pos, 'oxygen');
    if (co2.length > 1) co2 = filter(co2, pos, 'co2');
  }
  return parseInt(oxygen, 2) * parseInt(co2, 2);
}

// solution 1
console.log(powerConsuption(values));

// solution 2
console.log(lifeSupport(values));
