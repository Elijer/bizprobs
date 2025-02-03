import * as fs from 'fs';
import { classMistakesByFrequency } from './sorter'

const unparsedData = fs.readFileSync('./testData/data2.txt', 'utf8');

console.time("start")
const data = JSON.parse(unparsedData)
const [ classResponses, answerKey ] = data
classMistakesByFrequency(classResponses, answerKey)
console.timeEnd("start")