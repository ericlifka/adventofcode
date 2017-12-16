import { splitChar
       , removeComma
       , parseDecimal
       , indexIdentity
       , subtractSet
} from './common'

export const parsePuzzleInput = str =>
    str
        .split('\n')
        .map(splitChar(' '))
        .map(([ , , ...pipes ]) =>
            pipes
                .map(removeComma)
                .map(parseDecimal))

export const coalesceGroup = group =>
    Object.keys(group).map(parseDecimal)

export const visitProgram = (programs, [ program, ...queue ], group = { }) =>
    program === undefined ? group :
        group[ program ] ?
            visitProgram(programs, queue, group) :
            ( group[ program ] = true,
              visitProgram(programs, [ ...queue, ...programs[ program ] ], { [ program ]: true, ...group }) )

export const findAllGroups = programs => {
    let groups = [ ]
    let unvisited = programs.map(indexIdentity)

    while (unvisited.length > 0) {
        let group = coalesceGroup(visitProgram(programs, [ unvisited[ 0 ] ]))
        groups.push(group)
        unvisited = subtractSet(unvisited, group)
    }

    return groups
}
