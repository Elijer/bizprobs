import fs from 'fs'

fs.readFile('./anagrams.json', 'utf-8', (err, data)=>{

  let totalLettersInEnglish = 0 

  if (err){
    console.error(err)
  }

  const stuff = JSON.parse(data)
  const keys = Object.keys(stuff)
  for (const key of keys){
    const list = stuff[key]
    if (stuff[key].length){
      for (const word of stuff[key]){
        totalLettersInEnglish += word.length
      }
    }
  }

  console.log(totalLettersInEnglish)
})