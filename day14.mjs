import { knotHash } from './knot-hash'
import { getInput
       , numberArray
       , hexToBinary
       , splitChar
} from './common'

let inputString = getInput('day14')
console.log(
numberArray(128)
    .map(row => `${inputString}-${row}`)
    .map(knotHash)
    .map(hexToBinary)
    .map(splitChar(''))
    .map(bits => bits
            .reduce((sum, bit) => bit === '1' ? sum + 1 : sum, 0))
    .reduce((sum, row) => sum + row, 0)
)