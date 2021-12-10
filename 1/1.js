const fs = require('fs');

// const test = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

const values = fs
  .readFileSync('./input.txt')
  .toString('utf-8')
  .split('\n')
  .map((str) => parseInt(str, 10));

function depth(input) {
  let count = 0;
  for (let i = 0, n = input.length; i < n - 1; i += 1) {
    if (input[i + 1] > input[i]) count += 1;
  }
  return count;
}

function sample(input) {
  const result = [];
  for (let i = 0, n = input.length; i < n - 2; i += 1) {
    let tmp = input[i];
    for (let j = 1; j < 3; j += 1) {
      tmp += input[i + j];
    }
    result.push(tmp);
  }
  return result;
}

// solution for part 1
console.log(depth(values));

// solution for part 2
console.log(depth(sample(values)));
