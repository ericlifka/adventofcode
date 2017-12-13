import { getInput
       , parseDecimal
       , descending
       , max
       , min
} from './common';

let grid = 
getInput('day2')
  .split('\n')
  .map(row => row
    .split(/\s+/)
    .map(parseDecimal)
    .sort(descending))

console.log('part1',
grid.reduce((total, row) => 
  total + max(row) - min(row)
, 0))

console.log('part2',
grid.reduce((total, row) => {
  let result = 0
  for (let outer = 0; outer <= row.length - 2; outer++)
    for (let inner = outer + 1; inner <= row.length - 1; inner++)
      if (row[outer] % row[inner] === 0)
        result += row[outer] / row[inner]

  return total + result
}, 0))
