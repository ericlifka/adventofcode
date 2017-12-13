import { getInput
       , abs
       , max
} from './common'

const coord = (x=0, y=0, z=0) => 
                ({ x, y, z })

const CARDINALS = {
    ne: coord(1, 0, -1),
    se: coord(1, -1, 0),
    s:  coord(0, -1, 1),
    sw: coord(-1, 0, 1),
    nw: coord(-1, 1, 0),
    n:  coord(0, 1, -1)
}

const addCoords = ( {x:x1, y:y1, z:z1}
                  , {x:x2, y:y2, z:z2} ) => 
                        coord(x1 + x2, y1 + y2, z1 + z2)

const distance = ( {x:x1, y:y1, z:z1}
                 , {x:x2, y:y2, z:z2} ) => 
                        ( abs(x1 - x2) + abs(y1 - y2) + abs(z1 - z2) ) / 2

const fromOrigin = position => distance(position, coord())

let distances = [ ]
let finalPosition =
getInput('day11')
    .split(',')
    .reduce((position, direction) => {
        let newPosition = addCoords(position, CARDINALS[ direction ])
        distances.push(fromOrigin(newPosition))
        return newPosition
    }, coord())

console.log('part1', fromOrigin(finalPosition))
console.log('part2', max(distances))