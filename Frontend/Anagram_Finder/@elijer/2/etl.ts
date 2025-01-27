const fs = require("fs");
const https = require("https");

// URL of the word list
const url = "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt";

// Function to fetch the word list
async function fetchWords() {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
      res.on("error", (err) => reject(err));
    });
  });
}

// Function to create anagram map
function createAnagramMap(words) {
  const anagramMap = {};
  
  words.forEach((word) => {
    const sorted = word.split("").sort().join(""); // Sort the letters of the word
    if (!anagramMap[sorted]) {
      anagramMap[sorted] = [];
    }
    anagramMap[sorted].push(word);
  });

  return anagramMap;
}

// Main function
async function main() {
  try {
    console.log("Fetching word list...");
    const wordList = await fetchWords();
    console.log("Word list fetched.");

    // Split words into an array and process
    const words = wordList.split("\n").map((word) => word.trim()).filter(Boolean);
    console.log(`Processing ${words.length} words...`);

    const anagramMap = createAnagramMap(words);

    // Save to a local file
    const outputFile = "anagrams.json";
    fs.writeFileSync(outputFile, JSON.stringify(anagramMap, null, 2));
    console.log(`Anagram map saved to ${outputFile}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the script
main();
