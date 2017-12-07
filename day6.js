let data =
// `0  2   7   0`
`4	1	15	12	0	9	9	5	5	8	7	3	14	5	12	3`
    .split(/\s+/)
    .map(n => parseInt(n, 10))

const max = () => data.indexOf(Math.max.apply(null, data))

let cache = { }
const saveState = () => cache[ data.join(',') ] = true
const stateRepeated = () => !!cache[ data.join(',') ]

function distribute(value, position) {
    while ( value > 0 ) {
        position = (position + 1) % data.length
        data[ position ]++
        value--
    }
}

let cycles = 0
while (!stateRepeated()) {
    saveState()

    let largest = max()
    let value = data[ largest ]
    data[ largest ] = 0
    distribute(value, largest)

    cycles++;
}

console.log(cycles)