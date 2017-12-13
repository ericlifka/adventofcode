import { getInput
       , numberArray
} from './common'

const pad = str =>
    str.length >= 2 ? str :
        `0${str}`

const tohex = num =>
    pad(num.toString(16).toLowerCase())

const getCharCode = letter =>
    letter.charCodeAt(0)

const xor = nums =>
    nums.reduce((xor, num) => num ^ xor)

const chunkArray = array =>
    array.length === 0 ? array :
        [ array.slice(0, 16),
          ...chunkArray(array.slice(16)) ]

const parseInput = () =>
    getInput('day10')
        .split('')
        .map(getCharCode)

const getHashJumps = () =>
    [ ...parseInput(), 17, 31, 73, 47, 23 ]

const nodeify = (parent, [number, ...rest], node = { number }) => (
    parent.next = node, 
    rest.length === 0 ? node :
        nodeify(node, rest))

const buildCircularList = ([number, ...rest], head = { number }) =>
    nodeify(head, rest).next = head

const slice = (list, count, accumulator = [ ]) =>
    count === 0 ? accumulator : 
        slice(list.next, count - 1, [ ...accumulator, list.number ])

const apply = (list, [number, ...rest]) => (
    list.number = number,
    rest.length === 0 ? list :
        apply(list.next, rest))

const twist = (list, size) =>
    size === 0 ? list :
        apply(list, slice(list, size).reverse()).next

const skip = (list, count) =>
    count === 0 ? list : 
        skip(list.next, count - 1)

const generateHash = (list, size) =>
    chunkArray(slice(head, 256))
        .map(xor)
        .map(tohex)
        .join('')

let head = buildCircularList(numberArray(256))
let jumps = getHashJumps()
let current = head
let skipSize = 0

numberArray(64).forEach(() =>
    jumps.forEach(twistLength =>
        current = skip(twist(current, twistLength), skipSize++)))

console.log(generateHash(head))
