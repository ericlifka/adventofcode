import { knotHash } from './knot-hash'
import { getInput
       , identity
       , flatten
       , numberArray
       , hexToBinary
       , splitChar
       , coord
       , gridNeighbors
       , parseDecimal
} from './common'

const programName = ({x, y}) =>
    parseDecimal(`${y}`.padStart(3, '0') + `${x}`.padStart(3, '0'))

const getBit = (bitGrid, {x, y}) =>
    bitGrid[ y ] === undefined ? '0' :
        bitGrid[ y ][ x ] === undefined ? '0' :
            bitGrid[ y ][ x ]

const inputString = getInput('day14')

console.log(
flatten(numberArray(128)
    .map(row => `${inputString}-${row}`)
    .map(knotHash)
    .map(hexToBinary)
    .map(splitChar(''))
    .map((row, y, bitGrid) => row
        .map((bit, x) =>
            programName({x, y})
            + ' <-> '
            + ( gridNeighbors(coord(x, y), false)
                    .map((coord, _, __, bit = getBit(bitGrid, coord)) =>
                        bit === '1' ? programName(coord) : null)
                    .filter(identity)
                    .join(', ')
                || programName({x, y}))))
).join('\n')
)