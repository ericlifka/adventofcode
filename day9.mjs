import { getInput
} from './common'

const makeStream = (string, position = 0) =>
    () => string[ position++ ]

const makeGroup = parent => {
    let group = { parent, children: [ ] }
    if (parent)
        parent.children.push(group)
    
    return group
}

let char
let group
let inTrash = false
let trashCount = 0
let stream = makeStream(getInput('day9'))
while (char = stream()) {
    if (inTrash && char === ">") 
        inTrash = false

    else if (inTrash && char === "!")
        stream()

    else if (inTrash)
        trashCount++

    else if (char === "<")
        inTrash = true

    else if (char === "{")
        group = makeGroup(group)

    else if (char === "}" && group.parent)
        group = group.parent
}

const calcScore = (group, scoreLevel = 1) =>
    scoreLevel + group.children.reduce((score, group) => 
                    score + calcScore(group, scoreLevel + 1), 0)

console.log(`group score: ${calcScore(group)}, trash count: ${trashCount}`)