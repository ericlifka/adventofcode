let result =
`...snip...`
    .split('\n')
    .map(passphrase => passphrase
        .split(' ')
        .map(word => word.split('').sort().join(''))
        .sort())
    .reduce((total, passphrase) => {
        for (let i = 0; i < passphrase.length - 1; i++)
            if (passphrase[ i ] === passphrase[ i + 1 ]) 
                return total;

        return total + 1;
    }, 0);

console.log(result);