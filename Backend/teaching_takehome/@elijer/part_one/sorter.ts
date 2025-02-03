import { z } from "zod";

export type Answers = number[][]
const AnswerSchema = z.array(z.array(z.number()))

const JOIN_CHAR = ','

function zodValidator(errorPrefix: string, input: unknown, schema: z.Schema) {
  const validation = schema.safeParse(input);
  if (validation.success) return false;

  const errorMessages = validation.error.errors
    .map((error, index) => `[${index + 1}]: ${error.message}`)
    .join(", ");

  throw new Error(`${errorPrefix}: validation error - ${errorMessages}.`)
}

// Assumes card order doesn't matter
export function numArrayToHashKey(input: number[]): string {
  zodValidator('numArrayToHashKey()', input, z.array(z.number()))

  return input
    .sort((a, b)=>Number(a)-Number(b))
    .join(JOIN_CHAR)
}

export function hashKeyToNumArray(input: string): number[] {
  return input
    .split(JOIN_CHAR)
    .filter(n => n.length && !isNaN(Number(n)))  // Remove empty strings and invalid numbers
    .map(Number);
}

export function getAnswerSet(answers: Answers): Set<string> {
  zodValidator("getAnswerSet", answers, AnswerSchema)

  const answerSet: Set<string> = new Set()
  answers.forEach(answer => {
    const hashKey = numArrayToHashKey(answer)
    if (hashKey.length)answerSet.add(hashKey)
  })

  return answerSet
}

export function getMistakeSubset(studentResponse: Answers, correctAnswers: Set<string>): string[] {
  zodValidator('getMistakeSubset()', studentResponse, AnswerSchema);

  const allAnswers = getAnswerSet(studentResponse);
  return [...allAnswers].filter(answer => !correctAnswers.has(answer));
}

export function classMistakesByFrequency(studentAnswers: Answers[], answerKey: Answers): Answers {
  try {
    const mistakeFrequencies: Map<string, number> = new Map()
    const answerKeySet = getAnswerSet(answerKey)
  
    for (const response of studentAnswers){
      const mistakes = getMistakeSubset(response, answerKeySet)
      mistakes.map(mistake => {
        mistakeFrequencies.set(mistake, (mistakeFrequencies.get(mistake) ?? 0 ) + 1 )
      })
    }
  
    return [...mistakeFrequencies]
      .sort((a, b)=>b[1]-a[1])
      .map(([key])=>hashKeyToNumArray(key))
  } catch (e){
    console.error(e)
    return []
  }
}

classMistakesByFrequency([
    [[1, 2, 3], [4, 5]]
  ],
  [[1, 2, 3]]
)