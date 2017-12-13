import { getInput
       , abs
       , max
       , coord
       , addCoords
       , axialDistance
       , axialNeighbors
} from './common'

let [ ne, se, s, sw, nw, n ] = axialNeighbors()
let CARDINALS = { ne, se, s, sw, nw, n }

let distances = [ ]
let finalPosition =
getInput('day11')
    .split(',')
    .reduce((position, direction) => {
        let newPosition = addCoords(position, CARDINALS[ direction ])
        distances.push(axialDistance(newPosition))
        return newPosition
    }, coord())

console.log('part1', axialDistance(finalPosition))
console.log('part2', max(distances))