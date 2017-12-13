import { getInput
       , parseDecimal
} from './common';

let numbers =
getInput('day1')
  .split('')
  .map(parseDecimal)

let sum = 0
for (let index = 0; index < numbers.length; index++)
  if (numbers[index] === numbers[(index + 1) % numbers.length])
    sum += numbers[index]

console.log('part1', sum)

let jump = numbers.length / 2
sum = 0
numbers.forEach((num, index, arr) => {
  if (num === arr[(index + jump) % arr.length])
    sum += num
})

console.log('part2', sum)