import { describe, test, expect } from '@jest/globals';
import {
  numArrayToHashKey,
  hashKeyToNumArray,
  getAnswerSet,
  getMistakeSubset,
  classMistakesByFrequency
} from "./sorter"

describe('numArrayToHashKey()', ()=>{
  test('empty input returns empty output', ()=>{
    expect(numArrayToHashKey([])).toStrictEqual('')
  })

  test('simple array returns expected hashkey', ()=>{
    expect(numArrayToHashKey([1, 2, 3])).toBe('1,2,3')
  })

  test('hashkeys are returned in deterministic order', ()=>{
    // one, two, five, sorted alphabetically is: five, one, two
    expect(numArrayToHashKey([5, 2, 1])).toBe('1,2,5')
  })

  test('hashkeys are returned in deterministic order 2', ()=>{
    // one, two, five, sorted alphabetically is: five, one, two
    expect(numArrayToHashKey([5, 100, 14, 2, 1, 13])).toBe('1,2,5,13,14,100')
  })

  test('passing an invalid string value throws expected error', ()=>{
    expect(()=>{
        numArrayToHashKey(
          [1, 2, 'test'] as any[]
        )
      }
    ).toThrow("numArrayToHashKey(): validation error - [1]: Expected number, received string.")
  })

})

describe('hashKeyToNumArray()', ()=>{

  test('empty hashKeys return an empty array', ()=>{
    expect(hashKeyToNumArray('')).toStrictEqual([])
  })

  test('ordered hashkey returns expected array', ()=>{
    expect(hashKeyToNumArray('1,2,3')).toStrictEqual([1, 2, 3])
  })

  test('0 values are parsed the same as other integers', ()=>{
    expect(hashKeyToNumArray('0,1,2,3')).toStrictEqual([0, 1, 2, 3])
  })

})

describe('getAnswerSet()', ()=>{
  
  test("returns empty set for empty input", ()=> {
    expect(getAnswerSet([
      []
    ])).toStrictEqual(new Set())
  })

  test("returns empty response for input of multiple empty values", ()=> {
    expect(getAnswerSet([
      [], [], []
    ])).toStrictEqual(new Set())
  })

  test("doesn't return empty arrays as part of answer set", ()=> {
    const outputSet = getAnswerSet([
      [1, 2, 3],
      [],
      [1, 2, 3],
    ])

    const expectedSet = new Set(['1,2,3'])
    expect(outputSet).toStrictEqual(expectedSet)
  })

  test("returns expected answer sets for input", ()=> {
    const outputSet = getAnswerSet([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ])

    const expectedSet = new Set(['1,2,3', '4,5,6', '7,8,9' ])
    expect(outputSet).toStrictEqual(expectedSet)
  })

  test("sets are idempotent despite duplicate inputs", ()=> {
    const outputSet = getAnswerSet([
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
      [7, 8, 9],
      [7, 8, 9],
      [1, 2, 3],
      [4, 5, 6],
      [1, 2, 3],
      [4, 5, 6],
      [4, 5, 6],
      [4, 5, 6],
      [1, 2, 3],
    ])

    const expectedSet = new Set(['1,2,3', '4,5,6', '7,8,9' ])
    expect(outputSet).toStrictEqual(expectedSet)
  })

  test("sets are idemptotent despite duplicate yet diversely order inputs", ()=> {
    const outputSet = getAnswerSet([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ])

    const expectedSet = new Set(['1,2,3'])
    expect(outputSet).toStrictEqual(expectedSet)
  })

})

describe("getMistakeSubset()", ()=>{

  test("when all answers are correct, response is empty", ()=>{
    const answerKeySet = new Set(['1,2,3', '4,5,6'])
    expect(getMistakeSubset(
      [
        [1,2,3], [4,5,6]
      ],
      answerKeySet
    )).toEqual([])
  })

  test("single mistake among correct answers is returned as only response", ()=>{
    const answerKeySet = new Set(['1,2,3', '4,5,6'])
    expect(getMistakeSubset(
      [
        [1,2,3], [4,5,6], [9]
      ],
      answerKeySet
    )).toEqual(['9'])
  })

  test("missing single number mistake", ()=>{
    const answerKeySet = new Set(['1,2,3'])
    expect(getMistakeSubset(
      [
        [1,2]
      ],
      answerKeySet
    )).toEqual(['1,2'])
  })

  test("missing single number mistake, but correct size response", ()=>{
    const answerKeySet = new Set(['1,2,3'])
    expect(getMistakeSubset(
      [
        [1,2,4]
      ],
      answerKeySet
    )).toEqual(['1,2,4'])
  })

  test("repeated mistakes in same answer set are only returned once", ()=>{
    const answerKeySet: Set<string> = new Set()
    expect(getMistakeSubset(
      [
        [1,2,4], [1,2,4]
      ],
      answerKeySet
    )).toEqual(['1,2,4'])
  })

  test("correctAnswers matched successfully to answerKey regardless of order", ()=>{
    const answerKeySet: Set<string> = new Set(['1,2,3'])
    expect(getMistakeSubset(
      [
        [3,2,1]
      ],
      answerKeySet
    )).toEqual([])
  })

  test("if mistake input is wrong type, error is thrown", ()=>{
    expect(() => getMistakeSubset(
      [
        [['1', '2']]
      ] as any,
      new Set()
    )).toThrow("getMistakeSubset(): validation error - [1]: Expected number, received array.")
  })
})

describe('classMistakesByFrequency()', ()=>{

  test('empty class leads to empty mistake frequencies', ()=>{
    expect(classMistakesByFrequency([], [[1,2,3]])).toStrictEqual([])
  })

  test('empty answer key returns causes all answers to be returned as mistakes', ()=>{
    expect(classMistakesByFrequency(
      [
        [[1, 2], [3, 4]],
        [[5, 6], [7, 8]]
      ],
      []
    )).toStrictEqual(
      [
        [1, 2], [3, 4], [5, 6], [7, 8]
      ]
    )
  })

  test('all correct answers in answerKey leads to no answers being returned as mistakes ', ()=>{
    expect(classMistakesByFrequency(
        [
          [[1], [2]],
          [[3], [4]]
        ],
        [[1], [2], [3], [4]]
      )
    ).toStrictEqual([])
  })

  test('Mix of correct and incorrect answers in class input returns only incorrect answers', ()=>{
    expect(classMistakesByFrequency(
        [
          [[1, 2, 3, 5, 7, 9], [4, 6]],
          [[1, 2, 3, 4, 7, 9], [5, 6]],
          [[1, 3, 5, 7, 9], [2, 4, 6]],
          [[1, 2, 3, 5, 7, 9], [4, 6]],
        ],
        [[1, 2, 3, 5, 7, 9], [4, 6]],
      )
    ).toStrictEqual([
      [1, 2, 3, 4, 7, 9], [5, 6],
      [1, 3, 5, 7, 9], [2, 4, 6],
    ])
  })

  test('correct answers matched to answer key when provided in a different order', ()=>{
    expect(classMistakesByFrequency(
        [[[4, 6], [1, 2, 3, 5, 7, 9]]],
        [[1, 2, 3, 5, 7, 9], [4, 6]],
      )
    ).toStrictEqual([])
  })

  test('correct answers matched to answer key when provided in different NESTED order', ()=>{
    expect(classMistakesByFrequency(
        [[[6, 4], [2, 1, 3, 5, 7, 9]]],
        [[1, 2, 3, 5, 7, 9], [4, 6]],
      )
    ).toStrictEqual([])
  })

  test('Incorrect answers are ordered by frequency', ()=>{
    expect(classMistakesByFrequency(
        [
          [[3], [2], [1]],
          [[3], [2], [1]],
          [[2], [1]],
          [[2], [1]],
          [[1]],
        ],
        [],
      )
    ).toEqual([[1], [2], [3]])
  })

  test('Incorrect answers are ordered by frequency (inverted test for peace of mind)', ()=>{
    expect(classMistakesByFrequency(
        [
          [[3], [2], [1]],
          [[3], [2], [1]],
          [[2], [1]],
          [[2], [1]],
          [[1]],
        ],
        [],
      )
    ).not.toEqual([[3], [2], [1]])
  })

  test('Accidental repeats by same user do not effect returned mistake sorting order', ()=>{
    expect(classMistakesByFrequency(
        [
          [[3], [3], [3]],
          [[1]],
          [[1]],
        ],
        [],
      )
    ).toEqual([[1], [3]])
  })

  test('Duplicate correct answers are not returned as incorrect answers', ()=>{
    expect(classMistakesByFrequency(
        [[[3], [3], [3]]],
        [[3]],
      )
    ).toEqual([])
  })

})

describe('Decimal and negative integer handling tests', ()=>{

  test('numArrayToHashKey(): parses negative numbers in order', ()=>{
    expect(numArrayToHashKey([-1, -2, -3])).toBe('-3,-2,-1')
  })

  test('numArrayToHashKey(): parses decimals successfully and in order', ()=>{
    expect(numArrayToHashKey([1.1, 1.2, 1.3])).toBe('1.1,1.2,1.3')
  })

  test('numArrayToHashKey(): sorts and parses decimals with integers in order', ()=>{
    expect(numArrayToHashKey([1, 1.1, 1.2, 2, 1.3])).toBe('1,1.1,1.2,1.3,2')
  })

  test('numArrayToHashKey(): sorts and parses negative numbers with positive integers', ()=>{
    expect(numArrayToHashKey([-200, 1, 100, -5, 4])).toBe('-200,-5,1,4,100')
  })

  test('numArrayToHashKey(): negative, decimals and positive integers are sorted in order', ()=>{
    expect(numArrayToHashKey([-201.2, 42, -13, -13.2, 1008])).toBe('-201.2,-13.2,-13,42,1008')
  })

  test('classMistakesByFrequency(): negative number answers found and ordered successfully to corresponding negative answer keys', ()=>{
    expect(classMistakesByFrequency(
      [
        [[-1, -2], [-3, -4]],
        [[-5, -6], [-7, -8]]
      ],
      []
    )).toStrictEqual(
      [
        [-2, -1], [-4, -3], [-6, -5], [-8, -7]
      ]
    )
  })

  test('classMistakesByFrequency(): decimal number answers matched successfully to corresponding decimal answer keys', ()=>{
    expect(classMistakesByFrequency(
      [[[1.1, 1.201, 1.100]]],
      [[1.1, 1.100, 1.201]]
    )).toEqual([])
  })

  test('classMistakesByFrequency(): ordered incorrect decimal number answers discovered successfully for decimal answer kers', ()=>{
    expect(classMistakesByFrequency(
      [[[1.2, 1.5, 1.14]]],
      []
    )).toStrictEqual([[1.14, 1.2, 1.5]])
  })

})