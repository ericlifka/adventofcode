import { splitChar 
       , getInput
       , removeComma
       , parseDecimal
       , indexIdentity
       , ascending
} from './common'

let programs =
    getInput('day12')
        .split('\n')
        .map(splitChar(' '))
        .map(([program, indicator, ...pipes]) => pipes
                                                    .map(removeComma)
                                                    .map(parseDecimal))

const coalesceGroup = group =>
    Object.keys(group).map(parseDecimal)

const removeAll = ([item, ...rest], filter) =>
    item === undefined ? [ ] :
        filter.indexOf(item) > -1 ?
            removeAll(rest, filter) :
            [ item, ...removeAll(rest, filter) ]

const visitProgram = ([ program, ...queue ], group = { }) =>
    program === undefined ? group :
        group[ program ] ? 
            visitProgram(queue, group) :
            ( group[ program ] = true,
              visitProgram([ ...queue, ...programs[ program ] ], { [ program ]: true, ...group }) )

console.log('part1',
coalesceGroup(visitProgram([ 0 ])).length
)

let groups = [ ]
let unvisited = programs.map(indexIdentity)

while (unvisited.length > 0) {
    let group = coalesceGroup(visitProgram([ unvisited[ 0 ] ]))
    groups.push(group)
    unvisited = removeAll(unvisited, group)
}

console.log('part2', groups.length)