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

  for(let i = 0, n = moveList.length; i < n; i += 1){
    const val = parseInt(moveList[i][1], 10)
    switch(moveList[i][0]){
      case 'forward': horizontal += val;
      break;

      case 'up': depth -= val;
      break;

      case 'down': depth += val;
      break;
    }
  }
  return horizontal * depth;
}

function moveAim(moveList){
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for(let i = 0, n = moveList.length; i < n; i += 1){
    const val = parseInt(moveList[i][1], 10)
    switch(moveList[i][0]){
      case 'forward': 
      horizontal += val;
      depth += aim * val
      break;

      case 'up': aim -= val;
      break;

      case 'down': aim += val;
      break;
    }
  }
  return horizontal * depth;
}

// part 1 solution
console.log(move(values));

// part 2 solution
console.log(moveAim(values));