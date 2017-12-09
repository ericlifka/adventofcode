let cache = { '0.0': 1 }
const coordToKey = ({x, y}) => `${x}.${y}`
const getVal = (coord) => cache[ coordToKey(coord) ] || 0
const setVal = (coord, val) => cache[ coordToKey(coord) ] = val

const neighborCoords = ({x, y}) => [
    { x: x + 1, y },
    { x: x - 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
    { x: x - 1, y: y + 1 },
    { x: x + 1, y: y - 1 },
    { x: x + 1, y: y + 1 },
    { x: x - 1, y: y - 1 }
]

function sequenceGenerator(start = 0) {
    let seq = [ 1, 0, -1, 0 ]
    let cur = start
    let len = seq.length

    return function () {
        let val = seq[ cur ]
        cur = (cur + 1) % len
        return val
    }
}

function iterateSpiralNumbers(callback) {
    let current = 1
    let blockSize = 1
    let coord = { x: 0, y: 0 }

    let directionGenerators = {
        x: sequenceGenerator(),
        y: sequenceGenerator(3)
    }
    let direction = { 
        x: directionGenerators.x(),
        y: directionGenerators.y()
    }

    while (true) {
        for (let doTwice = 0; doTwice < 2; doTwice++) {
            for (let blockIndex = 0; blockIndex < blockSize; blockIndex++) {
                current++
                coord.x += direction.x
                coord.y += direction.y

                let result = callback(current, coord)
                if (result !== undefined) 
                    return result
            }

            direction.x = directionGenerators.x()
            direction.y = directionGenerators.y()
        }

        blockSize++
    }
}

console.log('part1',
iterateSpiralNumbers((number, coord) => {
    if (number === 312051)
        return { distance: Math.abs(coord.x) + Math.abs(coord.y), coord }
}))

console.log('part2',
iterateSpiralNumbers((number, coord) => {
    let sum = neighborCoords(coord)
        .map(getVal)
        .reduce((total, val) => total + val)

    setVal(coord, sum)

    if (sum > 312051)
        return { sum, coord }
}))