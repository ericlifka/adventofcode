import fs from 'fs'

export const getInput = name =>
    fs.readFileSync(`./input/${name}.raw`, { encoding: 'utf-8' })

export const splitChar = char =>
    str => str.split(char)

export const removeComma = str =>
    str[ str.length - 1 ] === ',' ?
        str.slice(0, -1) :
        str

export const pad = str => 
    str.padStart(2, "0")
    
export const tohex = num =>
    pad(num.toString(16).toLowerCase())

export const hexCharToBinary = char => ({
    '0' : '0000', '1' : '0001', '2' : '0010', '3' : '0011',
    '4' : '0100', '5' : '0101', '6' : '0110', '7' : '0111',
    '8' : '1000', '9' : '1001', 'a' : '1010', 'b' : '1011',
    'c' : '1100', 'd' : '1101', 'e' : '1110', 'f' : '1111'
})[ char ]

export const hexToBinary = hexStr =>
    hexStr.split('').map(hexCharToBinary).join('')

export const parseDecimal = str =>
    parseInt(str, 10)

export const ascending = (l, r) => l - r
export const descending = (l, r) => r - l

export const identity = thing => thing
export const indexIdentity = (_, index) => index
export const numberArray = size => [ ...Array(size) ].map(indexIdentity)

export const flatten = arr =>
    [].concat.apply([],
        arr.map(element =>
            Array.isArray(element) ?
                flatten(element) :
                element))

export const subtractSet = (set, filterSet) =>
    set.filter(item => filterSet.indexOf(item) === -1)

export const abs = i => Math.abs(i)
export const max = arr => Math.max.apply(null, arr)
export const min = arr => Math.min.apply(null, arr)

export const coord = (x = 0, y = 0) => ({ x , y })
export const coordCacheKey = ({ x , y }) => `(${x}.${y})`

export const addCoords =
( {x:x1, y:y1}
, {x:x2, y:y2} ) =>
    coord(x1 + x2, y1 + y2)

export const gridDistance =
( {x:x1, y:y1}
, {x:x2, y:y2} = coord() ) =>
    ( abs(x1 - x2) +
      abs(y1 + y2) )

export const axialDistance =
( {x:x1, y:y1}
, {x:x2, y:y2} = coord() ) =>
    ( abs(x1 + y1 - x2 - y2) +
      abs(x1 - x2) +
      abs(y1 - y2) ) / 2

const directNeighbors = [ coord(0, 1), coord(1, 0), coord(0, -1), coord(-1, 0) ]
const diagonalNeighbors = [ coord(-1, 1), coord(1, 1), coord(1, -1), coord(-1, -1) ]
export const gridNeighbors =
(position = coord(), includeDiagonals = true) =>
    ( includeDiagonals ?
        [ ...directNeighbors, ...diagonalNeighbors ] :
        directNeighbors )
    .map(neighbor => addCoords(position, neighbor))

export const axialNeighbors =
(position = coord()) =>
    [ coord( 1,  0),  // NE
      coord( 0,  1),  // SE
      coord(-1,  1),  // S
      coord(-1,  0),  // SW
      coord( 0, -1),  // NW
      coord( 1, -1) ] //N
    .map(neighbor =>
        addCoords(position, neighbor))
