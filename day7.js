const removeComma = str => 
    str[ str.length - 1 ] === ',' ?
        str.slice(0, -1) :
        str

const NODE_CACHE = { }
const cache = node => NODE_CACHE[ node.name ] = node
const lookup = name => NODE_CACHE[ name ]

const buildNode = ([ name, weight, arrow, ...children ]) => cache({ 
    name, 
    weight: parseInt(weight.slice(1, -1), 10),
    children: arrow ? children.map(removeComma) : [ ]
})

function link(node) {
    node.children = node.children.map(lookup)
    node.children.forEach(child => child.parent = node)
    return node
}

const calcWeight = node => node.totalWeight = 
        node.children.length === 0 ? 
            node.weight :
            node.children.map(calcWeight)
                         .reduce((total, weight) => total + weight, node.weight)

function findImbalance(node) {
    let {children, children: {length}} = node
    if (length === 0) // no children base case, assume self
        return node
    
    let weightBuckets = { }
    children.forEach(child => weightBuckets[ child.totalWeight ] ? 
                                weightBuckets[ child.totalWeight ].push(child) :
                                weightBuckets[ child.totalWeight ] = [ child ])

    let weights = Object.keys(weightBuckets)
    if (weights.length === 1) // all children are balanced so _this_ is the node that's wrong
        return node

    let rightWeight = weights.find(weight => weightBuckets[ weight ].length !== 1)
    let wrongWeight = weights.find(weight => weightBuckets[ weight ].length === 1)
    let tree = weightBuckets[ wrongWeight ][ 0 ]

    let wrongNode = findImbalance(tree)
    if (tree === wrongNode) // we only want to do this on the one where we've found the exact wrong node, not heigher in the tree
        console.log(`part2: ${wrongNode.name} weighs ${wrongNode.weight} should weigh ${rightWeight - wrongWeight + wrongNode.weight}`)

    return wrongNode
}


let nodes = input()
    .split('\n')
    .map(desc => desc.split(' '))
    .map(buildNode)
    .map(link)

let top = nodes[ 0 ] // pick any node and find the top of the tree
while (top.parent)
    top = top.parent

console.log(`part1: ${top.name} is the top of the tree`)
calcWeight(top)
findImbalance(top)


function input() {
return `... snip ...`
}