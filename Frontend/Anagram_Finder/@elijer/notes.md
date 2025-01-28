So originally the script here was
1. grabbing a list of 3000 words from some endpoint on page load
2. for EVERY input, it was iterating through every word to look for a result by
3. breaking down the string of both the input and the words[i], sorting the letters, and comparing it

So all of that worked, but was a lot of repeat compute.

I think my solution is better - on fetch, we iterate through all words at O(n) where n is the words.
For each, we do the sorting operation, though it gets reused a couple times so I pulled it out as a function.
We then build an array of all anagrams for every key as a Map.

This way, we can get the key of the current word, see if it's in the map,
and if it is, return it.

I did notice though, that it's a pretty crap list we're comparing it to.
There are an estimated million words in the english language.
Some estimates though put the nmber an adult native speaker would know at 60,000.
Wow that's actually kinda less than I thought!

We are grabbing from a source with 3K words, so that's only like 5% coverage of anagrams for common words and .03% for all estimated english words total.
So we're missing a ton.

# More improvements
I found a much larger list of words, but I ran an ETL on it to get a JSON map locally so we didn't need a network.
Kind of silly to use a network for 3000 words too tbh.
That's in [folder 2](/.2)

Some other notes
- would be good to handle the load time and let users know that the JSON hasn't been loaded yet, if it takes any time on slower machines (it may not)
- would be cool to show how MANY matches there are as a summary
- for inputs like this, debouncing can be good IF there is network involved, which is there is not in my #2 solution