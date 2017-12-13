import { getInput
       , parseDecimal
       , coord
       , coordCacheKey
       , gridNeighbors
       , gridDistance
} from './common'

let cache = { }
const getVal = coord => cache[ coordCacheKey(coord) ] || 0
const setVal = (coord, val) => cache[ coordCacheKey(coord) ] = val
setVal(coord(), 1) // center of grid is base case and must be set

function sequenceGenerator(start = 0) {
    let seq = [ 1, 0, -1, 0 ]
    let cur = start

    return function () {
        let val = seq[ cur ]
        cur = (cur + 1) % seq.length
        return val
    }
}

function iterateSpiralNumbers(callback) {
    let current = 1
    let blockSize = 1
    let position = coord()

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
                position.x += direction.x
                position.y += direction.y

                let result = callback(current, position)
                if (result !== undefined) 
                    return result
            }

            direction.x = directionGenerators.x()
            direction.y = directionGenerators.y()
        }

        blockSize++
    }
}

const target = parseDecimal(getInput('day3'))

console.log('part1',
iterateSpiralNumbers((number, position) => {
    if (number === target)
        return { distance: gridDistance(position), position }
}))

console.log('part2',
iterateSpiralNumbers((number, position) => {
    let sum = gridNeighbors(position)
        .map(getVal)
        .reduce((total, val) => total + val)

    setVal(position, sum)

    if (sum > target)
        return { sum, position }
}))