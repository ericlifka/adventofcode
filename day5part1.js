let maze =
`...snip...`
    .split('\n')
    .map(n => parseInt(n, 10))

let position = 0
let steps = 0

while (maze[ position ] !== undefined) {
    let instruction = maze[ position ]
    maze[ position ]++
    position += instruction
    steps++
}

console.log(steps)