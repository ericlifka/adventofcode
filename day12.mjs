import { splitChar 
       , getInput
       , removeComma
       , parseDecimal
} from './common'

let programs =
    getInput('day12')
        .split('\n')
        .map(splitChar(' '))
        .map(([program, indicator, ...pipes]) => pipes
                                                    .map(removeComma)
                                                    .map(parseDecimal))

let group = { }

const visitProgram = ([ program, ...queue ]) =>
    program === undefined ? null :
        group[ program ] ? 
            visitProgram(queue) :
            ( group[ program ] = true,
              visitProgram([ ...queue, ...programs[ program ]]) )

visitProgram([ 0 ])
console.log('part1', Object.keys(group).length)