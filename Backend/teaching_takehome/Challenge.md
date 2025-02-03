PART I
Takehome - when given to me, I was given as much time as I wanted. What I found was that this sort of challenge was probably worth 3-4 focused hours max, and after that I was probably over-engineering, which is explicitly called out as something I shouldn't do.

You are creating software for an education company.

There's this part of an activity the software administers where students are given a list of options.

For the sake of this challenge, lets say the options are always numbers and that each number is unique.

So the activity the students receive might be, given the following numbers, which are prime and which are not prime?

```ts
[1, 2, 3, 4, 5, 6, 7]
```

The correct answer is:
```ts
[[1, 2, 3, 5, 7], [4, 6]]
```

The students may provide the correct answer, or something different, like:
```ts
[[1, 3, 5, 7], [2, 4, 6]]
```

Your job is to create a function that, when given a whole classroom full of these responses
1. returns a list of all of INCORRECT responses returned.
2. Returns them in the order of descending frequency.

The purpose of this method is essentially to help a teacher see what are patterns in student mistakes - they want to see the most common mistakes.

Your goals are not entirely performance, but rather a balance of the following:
1. Obviously performance is always good, but keep in mind that class sizes are about 30 and so that are the max numbers of options students are going to recieve to group (numbers in this case)
2. This code should be extensible - this method might be used to administer a math lesson now, but make it readable and modular so that it could be repurposed to change
3. In fact, you will have to extend, or something like it, in real time
4. Create tests to make sure that edge cases of your code are still working as expected
5. Don't over-engineer

PART II

Okay! Don't read this until you've finished the first part. Now set a timer -
You have 30 minutes to do the following:
Given the same situation, with these responses of multiple sets returned by students:
1. Find all 2-number pairs that can be created with each individual group in a student response (let's say that a student returns a response, and each group of numbers within that response can be called a "group")
2. Pairs shouldn't considered ACROSS groups
3. Similar to above, find the most frequent pairs that can be found in an entire classroom full of responses.