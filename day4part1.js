let result =
`...snip...`
    .split('\n')
    .map(passphrase => passphrase.split(' '))
    .reduce((total, passphrase) => {
        let hash = { };
        let unique = true;
        passphrase.forEach(word => {
            if (hash[ word ]) {
                unique = false;
            }
            hash[ word ] = true;
        });

        return unique ? total + 1 : total;
    }, 0);

console.log(result);