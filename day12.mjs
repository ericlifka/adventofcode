import { splitChar 
       , getInput
       , removeComma
} from './common'

let programs =
    getInput('day12')
        .split('\n')
        .map(splitChar(' '))
        .map(([program, indicator, ...pipes]) => pipes.map(removeComma))

programs.forEach((pipes, program) => console.log(`${program} <-> ${pipes}`))