const JOIN_CHAR = ","

export function numArrayToHashKey(input: number[]): string {
  // zodValidator('numArrayToHashKey()', input, z.array(z.number()))

  return input
    .sort((a, b)=>Number(a)-Number(b))
    .join(JOIN_CHAR)
}


export function findPairsInGroup(stack: number[]): number[][] {
  let current: number
  const results: number[][] = []
  // TODO - consider switching to while
  for (let i = stack.length-1; i > 0; i--){
    current = stack.pop()!
    let left = i - 1
    while (left >= 0){
      results.push([current, stack[left]])
      left--
    }
  }

  return results
}

export function findAllPairsForClass(classroom: number[][][]): string[] {

  const pairCounts: Map<string, number> = new Map()

  for (const response of classroom){
    const pairsInGroup: Set<string> = new Set()
    for (const group of response){
      const pairsFound = findPairsInGroup(group)
      for (const pair of pairsFound){
        const hashKey = numArrayToHashKey(pair)
        pairsInGroup.add(hashKey)
      }
    }

    const allPairs = [...pairsInGroup]
    for (const pair of allPairs){
      pairCounts.set(
        pair,
      (pairCounts.get(pair) ?? 0) + 1
      )
    }
  }

  return [...pairCounts].sort((a, b)=>b[1]-a[1]).map(n=>n[0])
}


// console.log(findPairsInGroup([1, 2, 3]))
// console.log(findPairsInGroup([1, 2, 3, 4]))
// console.log(findPairsInGroup([1, 2, 3, 4]))