import { knotHash } from './knot-hash'
import { findAllGroups
       , parsePuzzleInput
} from './graph-utilities'
import { getInput
       , identity
       , flatten
       , numberArray
       , hexToBinary
       , splitChar
       , coord
       , gridNeighbors
       , coordCacheKey
} from './common'

const nameCache = { }
const programName = c => nameCache[ coordCacheKey(c) ]

console.log('name cache built')

const getBit = (bitGrid, {x, y}) =>
    bitGrid[ y ] === undefined ? '0' :
        bitGrid[ y ][ x ] === undefined ? '0' :
            bitGrid[ y ][ x ]

const inputString = getInput('day14')

console.log('input parsed')

const bitGrid =
numberArray(128)
    .map(row => `${inputString}-${row}`)
    .map(knotHash)
    .map(hexToBinary)
    .map(splitChar(''))

let currentName = 0
numberArray(128).forEach( y =>
    numberArray(128).forEach( x =>
        nameCache[ coordCacheKey(coord(x, y)) ] =
            getBit(bitGrid, coord(x, y)) === '1' ? currentName++ : null ))

console.log('bit grid created')

const programMap =
flatten(bitGrid
    .map((row, y, bitGrid) => row
        .map((bit, x, _, c = coord(x, y)) =>
            getBit(bitGrid, c) === '0' ? null :
                programName(c)
                + ' <-> '
                + ( gridNeighbors(c, false)
                        .map((neighbor, _, __, bit = getBit(bitGrid, neighbor)) =>
                            bit === '1' ? programName(neighbor) : null)
                        .filter(identity)
                        .join(', ')
                    || programName(c)))
        .filter(identity)))
.join('\n')

console.log('graph input created')

const parsedMap = parsePuzzleInput(programMap)

console.log('graph parsed')

const groups = findAllGroups(parsedMap)

console.log('number of groups: ', groups.length)