grid = 
`... snip ...`
  .split('\n')
  .map(row => row
    .split(/\s+/)
    .map(n => parseInt(n, 10))
    .sort((l, r) => r - l))
//> (16) [Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16), Array(16)]
//>   0: (16) [2171, 2015, 1984, 1809, 1731, 1715, 1649, 1295, 981, 719, 349, 181, 76, 62, 52, 51]
//>   ... snip ...

console.log('part1',
grid.reduce((total, row) => 
  total + Math.max.apply(null, row) - Math.min.apply(null, row)
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
