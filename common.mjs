import fs from 'fs'

export const getInput = name =>
    fs.readFileSync(`./input/${name}.raw`, { encoding: 'utf-8' })

export const splitChar = char => 
    str => str.split(char)

export const removeComma = str => 
    str[ str.length - 1 ] === ',' ?
        str.slice(0, -1) :
        str
