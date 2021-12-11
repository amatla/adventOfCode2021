const fs = require('fs');

// const test = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

// retrive input data as an array of integers
const values = fs
  .readFileSync('./input.txt')
  .toString('utf-8')
  .split('\n')
  .map((str) => parseInt(str, 10));

// solution for part 1
function depth(input) {
  return input.reduce((prev, curr, index) => {
    if (input[index] > input[index - 1] && index > 0) return prev + 1;
    return prev;
  }, 0);
}

// solution for part 2
// create an array of the samples to use as input for the depth function
function sample(input) {
  return input.map((curr, index, arr) => {
    if (index > arr.length - 3) return curr;
    let tmp = 0;
    for (let i = 1; i < 3; i += 1) tmp += arr[index + i];
    return curr + tmp;
  });
}

// solution for part 1
console.log(depth(values));

// solution for part 2
console.log(depth(sample(values)));
