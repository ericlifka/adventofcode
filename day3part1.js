
function sequenceGenerator(start = 0) {
    let seq = [ 1, 0, -1, 0 ];
    let cur = start;
    let len = seq.length;

    return function () {
        let val = seq[ cur ];
        cur = (cur + 1) % len;
        return val;
    }
}

function getCoord(target) {
    if (target <= 0) return null;
    else if (target === 1) { return { x: 0, y: 0 }};

    let current = 1;
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

                current++;
                coord.x += direction.x;
                coord.y += direction.y;

                if (current === target) {
                    return coord;
                }

            }

            direction.x = directionGenerators.x();
            direction.y = directionGenerators.y();
        }

        blockSize++;
    }

}

// part 1
let coord = getCoord(312051);
console.log(Math.abs(coord.x) + Math.abs(coord.y));
