import { getInput } from './common'
import { parsePuzzleInput
       , coalesceGroup
       , visitProgram
       , findAllGroups
} from './graph-utilities'

let programs = parsePuzzleInput(getInput('day12'))

console.log('part1', coalesceGroup(visitProgram(programs, [ 0 ])).length)
console.log('part2', findAllGroups(programs).length)
