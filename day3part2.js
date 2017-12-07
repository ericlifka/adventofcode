let cache = { '0.0': 1 };
const coordToKey = ({x, y}) => `${x}.${y}`;
const getVal = (coord) => cache[ coordToKey(coord) ] || 0;
const setVal = (coord, val) => cache[ coordToKey(coord) ] = val;

const neighborCoords = ({x, y}) => [
    { x: x + 1, y },
    { x: x - 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
    { x: x - 1, y: y + 1 },
    { x: x + 1, y: y - 1 },
    { x: x + 1, y: y + 1 },
    { x: x - 1, y: y - 1 }
];

function sequenceGenerator(start = 0) {
    let seq = [ 1, 0, -1, 0 ];
    let cur = start;
    let len = seq.length;

    return function () {
        let val = seq[ cur ];
        cur = (cur + 1) % len;
        return val;
    };
}

function getNextBigger(target) {
    let blockSize = 1;
    let coord = { x: 0, y: 0 };
    let directionGenerators = {
        x: sequenceGenerator(),
        y: sequenceGenerator(3)
    };
    let direction = { 
        x: directionGenerators.x(),
        y: directionGenerators.y()
    };

    while (true) {

        for (let doTwice = 0; doTwice < 2; doTwice++) {
            for (let blockIndex = 0; blockIndex < blockSize; blockIndex++) {
                coord.x += direction.x;
                coord.y += direction.y;

                let sum = neighborCoords(coord)
                    .map(getVal)
                    .reduce((total, val) => total + val);

                if (sum > target) {
                    return {sum, coord};
                }

                setVal(coord, sum);
            }

            direction.x = directionGenerators.x();
            direction.y = directionGenerators.y();
        }

        blockSize++;
    }
}

let result = getNextBigger(312051);
console.log(result);