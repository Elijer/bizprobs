import * as fs from 'fs';

let content: string

const numberOfStudents = 10000
const answerKey: number[][] = []
const classAnswers: number[][][] = []
const answerRange = 29

// for every student
for (let i = 0; i < numberOfStudents; i++){

  // create a list of answers (which are sets of numbers)
  const studentAnswers: number[][] = []

  // come up with a random number of answers they will have
  const numberOfSets = Math.floor(Math.random() * answerRange) + 1

  // for all of those answers
  for (let set = 0; set < numberOfSets; set++){
    // get a random number of numbers in that answer
    const answer: number[] = []
    const numberOfNumbersInAnswer = Math.floor(Math.random() * answerRange) + 1
    for (let num = 0; num < numberOfNumbersInAnswer; num++){
      answer.push(Math.floor(Math.random() * 100))
    }
    if (i%100===0) answerKey.push(answer)
    studentAnswers.push(answer)
  }

  classAnswers.push(studentAnswers)
}

// console.log(classAnswers.length)
console.log(answerKey.length)

fs.writeFileSync('./testData/data2.txt', JSON.stringify([classAnswers, answerKey]));