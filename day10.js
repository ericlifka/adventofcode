const getList = () => Array.apply(null, Array(256)).map((_, i) => i)
const getJumps = () => 
    `94,84,0,79,2,27,81,1,123,93,218,23,103,255,254,243`
        .split(',')
        .map(n => parseInt(n, 10))

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

let head = buildCircularList(getList())
getJumps().reduce((currentNode, twistLength, skipSize) => 
    skip(twist(currentNode, twistLength), skipSize)
, head)

console.log(head.number * head.next.number)
