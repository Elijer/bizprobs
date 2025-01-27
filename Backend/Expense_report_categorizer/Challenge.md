Challenge: Expense Report Categorizer
Scenario:
A small business tracks expenses in a spreadsheet but needs a program to automatically categorize expenses based on the description. Your job is to build a function to parse and categorize expense data.

Requirements:
Input:

An array of expense objects, where each expense has:
id (number): A unique identifier.
description (string): A description of the expense (e.g., "Lunch at Subway").
amount (number): The amount spent.
A dictionary of categories with keywords, such as:
typescript
Copy
Edit
const categories = {
  Food: ["lunch", "dinner", "restaurant", "coffee"],
  Travel: ["flight", "train", "uber", "taxi"],
  Office: ["stationery", "printer", "chair"],
};
Output:

An array of categorized expenses where each object includes:
id (number): The expense ID.
category (string | "Uncategorized"): The assigned category based on the description.
Behavior:

Check the description field for keywords from the categories dictionary.
Assign the first matching category to the expense.
If no keywords match, mark the expense as "Uncategorized".
Stretch Features:

Allow for multiple categories per expense if multiple keywords match.
Suggest new categories based on uncategorized expenses.
Example Input:
typescript
Copy
Edit
const expenses = [
  { id: 1, description: "Lunch at Subway", amount: 12.5 },
  { id: 2, description: "Uber ride to office", amount: 23.0 },
  { id: 3, description: "Office chair", amount: 150.0 },
  { id: 4, description: "Birthday gift", amount: 50.0 },
];

const categories = {
  Food: ["lunch", "dinner", "restaurant", "coffee"],
  Travel: ["flight", "train", "uber", "taxi"],
  Office: ["stationery", "printer", "chair"],
};
Example Output:
typescript
Copy
Edit
[
  { id: 1, category: "Food" },
  { id: 2, category: "Travel" },
  { id: 3, category: "Office" },
  { id: 4, category: "Uncategorized" },
]
Tips:
Text Matching: Convert descriptions and keywords to lowercase for case-insensitive matching.
Dictionary Lookup: Iterate over the categories dictionary to check for matching keywords in the description.
Edge Cases: Handle missing descriptions, empty expense arrays, or categories with no keywords.
