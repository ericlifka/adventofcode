import fs from 'fs'

export const getInput = name =>
    fs.readFileSync(`./input/${name}.raw`, { encoding: 'utf-8' })

export const splitChar = char => 
    str => str.split(char)

export const removeComma = str => 
    str[ str.length - 1 ] === ',' ?
        str.slice(0, -1) :
        str

export const parseDecimal = str =>
    parseInt(str, 10)

export const ascending = (l, r) => l - r
export const descending = (l, r) => r - l

export const abs = i => Math.abs(i)
export const max = arr => Math.max.apply(null, arr)
export const min = arr => Math.min.apply(null, arr)