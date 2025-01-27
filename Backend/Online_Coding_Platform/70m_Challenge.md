
# 1
Given an array that may have odd or even values, treat each 2 items like a pair and order them so that EACH PAIR is in order.

17, 4, 7, 4, 8, 1, 8 -> 4, 17, 7, 4, 1, 8, 8

See?

And then the gotcha is that if it's an odd number of elements, handle that shit.

Oh and double gotcha - if you modulo an index, remember that an index of 0, while even, represents an odd number of 1! Etc.

300/300 but lost way to much time

# 2: Git store
You get a list of strings like
```
[
"switch branch1",
"push filename1",
"switch branch2",
"push filename1",
"push filename1",
"push filename1",
]
```
So yeah. The switch command changed the current branch, and the push command would add a file to that branch.
If you tried to add the same file, that wasn't supposed to be added as a new file.
And that was all the data structure stuff you'd need, because all you needed to return was the name of the branch with the most files.
300/300 and got it pretty fast but lost some time trying to do a fancy reducer to find the branch with the biggest set size

Yeah so the trick was definitely using a set.


# 3
This one I didn't get because it was very wordy and I was afraid I'd get lost in the sauce so i went straight to 4 which was definitely easier in some ways. I think that the true strategic performance would have actually been to get half credit on 3 and 4.

# 4?
# rate of some kind
given an array of number
1, 5, 6, 8, 2, 7, 9, 567
AND a threshhold
whatever,
the idea is that you want to return the length of the longest contiguous string where the max and min IN THAT STRING doesn't exceed the threshold.

The thing was, I think my response was O(n), but was possibly not executing within their time frame, making me wonder if I was missing something in my work, or in the performance reqs and actually I was supposed to use binary search to get Log(n). I dunno if that'd work though anyways. Cause you might still have to check everything, which would be Log(n)xn, which is worse. Shrugs.

This one was the most mysterious to me. I only got 180/300, but I'm not sure quite why.




# Performance takeaways

- one straightup leetcode idea helped me a ton
- I got nervous and typed too fast which made me really nervous
- I did a good job reading through code when nervous and going slower
- I really think that just coding more is the only way
- Look more into time complexity apparently, and read questions carefully to check if it matters
- Strategically attack questions - start out reading slow, don't jump in too soon
- but DO identify easy points