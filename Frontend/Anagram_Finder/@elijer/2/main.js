let anagramMap;

function createKey(word) {
  return word.split("").sort().join("");
}

// Fetch the pre-generated anagram map
fetch("anagrams.json")
  .then((res) => res.json())
  .then((data) => {
    anagramMap = data;
    console.log("anagram map loaded.");
  })
  .catch((error) => console.error("Failed to load anagram map:", error));

function onInput(input) {
  const word = input.value.trim().toLowerCase(); // Normalize input
  const currentWordKey = createKey(word);       // Generate the key
  const result = anagramMap[currentWordKey] || []; // Lookup anagrams
  document.getElementById("output").innerHTML = result.length
    ? `Anagrams: ${result.join(", ")}`
    : "No anagrams found.";
}
