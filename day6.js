let data =
// `0  2   7   0`
`4	1	15	12	0	9	9	5	5	8	7	3	14	5	12	3`
    .split(/\s+/)
    .map(n => parseInt(n, 10))

let cycles = 0
let cache = { }
const saveState = () => cache[ data.join(',') ] = cycles
const stateRepeated = () => cache[ data.join(',') ]

const max = () => 
    data.indexOf(Math.max.apply(null, data))

function distribute({ position, value }) {
    while ( value > 0 ) {
        position = (position + 1) % data.length
        data[ position ]++
        value--
    }
}

function removeMax() {
    let position = max()
    let value = data[ position ]
    data[ position ] = 0

    return { position, value }
}

while (!stateRepeated()) {
    saveState()
    distribute(removeMax())
    cycles++
}

console.log(`cycles: ${cycles}, cycle time: ${cycles - stateRepeated()}`)