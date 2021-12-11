const fs = require('fs');

const test = [['forward', '5'], ['down', '5'], ['forward', '8'], ['up', '3'], ['down', '8'], ['forward', '2']];

const values = fs
  .readFileSync('./input.txt')
  .toString('utf-8')
  .split('\n')
  .map((str) => str.split(' '));

function move(moveList){
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for(let i = 0, n = moveList.length; i < n; i += 1){
    switch(moveList[i][0]){
      case 'forward': horizontal += parseInt(moveList[i][1], 10);
      break;

      case 'up': depth -= parseInt(moveList[i][1], 10);
      break;

      case 'down': depth += parseInt(moveList[i][1], 10);
      break;
    }
  }
  return horizontal * depth;
}

// console.log(move(test));
console.log(move(values));