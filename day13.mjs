import { getInput
       , splitChar
       , parseDecimal
} from './common'

const atHome = ([ depth, range ], delay = 0, time = depth + delay) =>
    time % ( (range - 1) * 2 ) === 0

const checkLayers = (delay, [ layer, ...rest ]) =>
    layer === undefined ? true :
        atHome(layer, delay) ? false :
            checkLayers(delay, rest)

let layers =
getInput('day13')
    .split('\n')
    .map(splitChar(': '))
    .map(([ depth, range ]) => 
        [ parseDecimal(depth), parseDecimal(range) ])

console.log('part1', 
layers.reduce((sum, [ depth, range ]) => 
    sum + atHome([ depth, range ]) ? 
            depth * range : 
            0
, 0))

let delay = 0
while (!checkLayers(++delay, layers)) ;
console.log('part2', delay)