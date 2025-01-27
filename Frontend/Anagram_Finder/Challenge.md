Basically I was just given this code to "prepare to talk about it". No prompt. But there are some obvious improvements to experiment with, so I might as well go ahead and try em. Dunno if this is exactly a bizprob, but maybe!

Tip, if you use a copy of the template folder and are using vscode, you can use the Live Server plugin to do a now frills hot-reload of these files.

# HTML
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
  <div>Type a word to see a list of common anagrams</div>
  <input oninput="onInput(this)"/>
  <div id="output"/>
</body>
</html>
```

# JS
```
let dict;

fetch(
  'https://gist.githubusercontent.com/dlants/d3b25b0f6c0bf8d023f65e86498bf9e6/raw/b310b5aff00f62f5073b3b8d366f5a639aa88ee3/3000-words.txt'
).then(
  (res) => res.text()
).then(
  (text) => {
  dict = text.split('\n');
});

function onInput(input) {
  const word = input.value
  const o = []

  for (let word2 of (dict || [])) {
    // sort each word for comparison
    const sortedWord = word.split("").sort().join("")
    const sortedWord2 = word2.split("").sort().join("")
    if (sortedWord == sortedWord2) {
      o.push(word2)
    }
  }

  document.getElementById('output').innerHTML = JSON.stringify(o, null, 2)
}
```