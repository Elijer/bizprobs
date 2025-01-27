let dict;

function createKey(word){
  return word.split("").sort().join("")
}

fetch(
  'https://gist.githubusercontent.com/dlants/d3b25b0f6c0bf8d023f65e86498bf9e6/raw/b310b5aff00f62f5073b3b8d366f5a639aa88ee3/3000-words.txt'
).then(
  (res) => res.text()
).then(
  (text) => {
  dict = text.split('\n');
  anagramMap = new Map();
  for (const word of dict){
    const key = createKey(word)
    if (!anagramMap.has(key))anagramMap.set(key, [])
    const wordsForKey = anagramMap.get(key)
    wordsForKey.push(word)
  } 
});

function onInput(input) {
  const word = input.value
  const currentWordKey = createKey(word)
  const result = anagramMap.get(currentWordKey) || []
  document.getElementById('output').innerHTML = JSON.stringify(result, null, 2)
}