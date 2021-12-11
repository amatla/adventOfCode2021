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
  '01010'];

  const test2 = ['00100', '11110'] // [1,1] [1,1] [0, 2] [1,1] [2, 0]

const values = fs
  .readFileSync('./input.txt')
  .toString('utf-8')
  .split('\n').map(str => str.toString(2));

  function powerConsuption(input){
    const len = input.length;
    const bit_len = input[0].length;
    const bits = [];
    for(let i = 0; i < bit_len; i += 1){
      bits.push([0,0]);
    }
    
    for(let i = 0; i < len; i += 1){
      for(let j = 0; j < bit_len; j += 1){
        if(input[i][j] === '0') {
          bits[j][0] += 1;
        } else bits[j][1] += 1;
      }
    }
    let gamma = '';
    let epsilon = '';
    for(let i = 0; i < bit_len; i += 1){
      if(bits[i][0] > bits[i][1]) {
        gamma = gamma.concat('0');
        epsilon = epsilon.concat('1');
      }
      else {
        gamma = gamma.concat('1');
        epsilon = epsilon.concat('0');
      }
    }
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
  }

 console.log(powerConsuption(values));
