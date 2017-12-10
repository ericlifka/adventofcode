let numbers = 
`... snip ...`
  .split('')
  .map(n => parseInt(n, 10))
//> (2118) [1, 1, 1, 8, 3, 1, 3, 6, 2, 3, 5, 4, 5, 5, 1, 1, 7, 3, 1, 3, 4, 9, 5, 7, 7, 5, 8, 4, 1, 7, 8, 4, 9, 7, 1, 6, 8, 7, 7, 1, 8, 8, 7, 1, 6, 3, 3, 8, 2, 2, 7, 1, 2, 1, 8, 6, 9, 9, 9, 2, 6, 5, 2, 9, 7, 2, 1, 5, 4, 6, 5, 1, 6, 3, 2, 2, 9, 6, 6, 7, 6, 4, 6, 4, 2, 8, 5, 2, 6, 1, 1, 7, 1, 6, 2, 5, 8, 9, 2, 8, …]

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