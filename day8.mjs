import { getInput
       , splitChar 
} from './common'

let maxSeen = 0
const registers = { }
const getR = register => registers[ register ]
const setR = (register, value) => {
    registers[ register ] = value
    if (value > maxSeen)
        maxSeen = value
}

const actionFn = (register, direction, value) =>
    () =>
        setR(register, direction === 'inc' ? 
            getR(register) + value : 
            getR(register) - value)

const comparatorFn = (register, comparator, compValue) =>
    () => {
        let regValue = getR(register)
        switch (comparator) {
            case '>': return regValue > compValue
            case '<': return regValue < compValue
            case '>=': return regValue >= compValue
            case '<=': return regValue <= compValue
            case '==': return regValue == compValue
            case '!=': return regValue != compValue
        }
    }

const buildInstruction = ([ register, direction, value, _if, condRegister, comparator, compValue ]) => ({
    register,
    action: actionFn(register, direction, parseInt(value, 10)),
    predicate: comparatorFn(condRegister, comparator, parseInt(compValue, 10))
})

let instructions = 
    getInput('day8')
        .split('\n')
        .map(splitChar(' '))
        .map(buildInstruction)

instructions.forEach(({register}) => setR(register, 0))
instructions.forEach(({register, action, predicate}) => {
    if (predicate())
        action()
})

let max =
Object.keys(registers)
    .sort((l, r) => getR(r) - getR(l))
    .map(reg => ({reg, value: getR(reg)}))[ 0 ]

console.log('part1 max: ', max)
console.log('part2 max: ', maxSeen)