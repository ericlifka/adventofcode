const removeComma = str => 
    str[ str.length - 1 ] === ',' ?
        str.slice(0, -1) :
        str

function buildNode(desc) {
    let [ name, weight, arrow, ...children ] = desc.split(' ')
    return { 
        name, 
        weight: parseInt(weight.slice(1, -1), 10),
        children: arrow ? 
            children.map(removeComma) :
            null
    }
}

console.log(
`pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`
    .split('\n')
    .map(buildNode)
)