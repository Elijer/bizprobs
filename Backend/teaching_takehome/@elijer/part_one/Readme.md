# Notes on Requirements

**Card content types**: This code is written ONLY for number types but could evolve to handle cards of other types. If cards do require types, it would be worth considering if type must be homogenous for each set or not.

**Duplicates**: The challenge specifically states that there 'There will be no duplicate cards within a single response or answer key.' I kept that in mind when designing this challenge. Had it been trivial to ALSO handle duplicates, I would have added that ability, but it definitely comlicates the code, so I kept it out for now as it is specifically gauranteed not to happen. I think that the format of this challenge makes a lot of sense with the exclusion of duplicates - discrete concepts and scenarios are sorted into groups. If duplicates DO end up being something we want, we should discuss how answer keys 'see' duplicates.

**Order**: Order of each cardsort is also ignored here when it comes to the correctness of an answer. Like duplicates, it's very possible, but would require additional data structurees. Because it is mostly unmentioned and briefly descibed as not mattering, I kept it out for now. Note that the method of creating canonical keys for CardSorts re-orders them, so this would need to be addressed.

# Ideas for how to improve the functionality here
I can imagine a lot of contextual information that would be really helpful for both students and teachers to have that isn't included here. It might be worth keeping it simple, but here are things to consider:
1. Timestamps to record how long students spend on different activities
2. Including a list of student names along with the most frequent incorrect sets
3. Grouping mistaken sets by student as well, if activities are retried - I think of Anki, and how the combination of spaced repition and visibility of the problems I'm struggling with most are really helpful. We could give this information to the student directly, or like Anki does, automatically resurface problems they have mistaken.


# Jest
**SpyOn**
For some reason, earlier I had use this to wrap tests that were throwing errors intentionally in this:

```ts
import { jest } from '@jest/globals';
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
consoleErrorSpy.mockRestore();
```

But I may have been mistaken - it seems that Jest automatically supresses these messages when `expect(...).toThrow()` is used. But keeping this here in case I was wrong.

# Debugger
Just run `tsc --w` and then hit function-5 to debug quickly. I've commented out the `tsc --w` as a prelaunch task because it's really slow.