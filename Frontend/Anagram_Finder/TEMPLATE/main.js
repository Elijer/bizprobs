let dict;

fetch(
  'https://gist.githubusercontent.com/dlants/d3b25b0f6c0bf8d023f65e86498bf9e6/raw/b310b5aff00f62f5073b3b8d366f5a639aa88ee3/3000-words.txt'
).then(
  (res) => res.text()
).then(
  (text) => {
  dict = text.split('\n');
  anagramMap = new Map();
  for (const word of dict){
  }
    
});

function onInput(input) {
  const word = input.value
  const sWord = word.split("").sort().join("")
  const result = []

  for (let word2 of (dict || [])) {
    // sort each word for comparison
    const sortedWord2 = word2.split("").sort().join("")
    if (sortedWord2 == sWord) {
      result.push(word2)
    }
  }

  document.getElementById('output').innerHTML = JSON.stringify(result, null, 2)
}