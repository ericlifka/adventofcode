import fs from 'fs'

export const getInput = name =>
    fs.readFileSync(`./input/${name}.raw`, { encoding: 'utf-8' })

export const splitChar = char =>
    str => str.split(char)

export const removeComma = str =>
    str[ str.length - 1 ] === ',' ?
        str.slice(0, -1) :
        str

export const parseDecimal = str =>
    parseInt(str, 10)

export const ascending = (l, r) => l - r
export const descending = (l, r) => r - l

export const abs = i => Math.abs(i)
export const max = arr => Math.max.apply(null, arr)
export const min = arr => Math.min.apply(null, arr)

export const coord = (x = 0, y = 0) => ({ x , y })
export const coordCacheKey = coord => `(${coord.x}.${coord.y})`

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

export const gridNeighbors =
(position = coord()) =>
    [ coord(-1,  1), coord(0,  1), coord(1,  1),
      coord(-1,  0),               coord(1,  0),
      coord(-1, -1), coord(0, -1), coord(1, -1) ]
    .map(neighbor =>
        addCoords(position, neighbor))

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
