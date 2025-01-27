Challenge: Invoice Due Date Tracker
Scenario:
You are working on a tool for a small business that manages invoices. The business needs a simple program to track invoice due dates and alert the owner if any invoices are overdue.

Requirements:

Input:

A list of invoices, where each invoice has:
id (string): A unique identifier.
amount (number): The amount due.
dueDate (string): The due date in YYYY-MM-DD format.
A second input, the current date in YYYY-MM-DD format.
Output:

A list of overdue invoices containing:
id
amount
daysOverdue (number): The number of days past the due date.
Behavior:

Parse the input data.
Calculate how many days each overdue invoice is past its due date.
Handle edge cases like invalid dates or missing fields gracefully by ignoring invalid entries and logging an error.
Stretch Features:

Add a feature to group overdue invoices by how many days overdue they are (e.g., 1-7 days, 8-30 days, 31+ days).
Example Input:
typescript
Copy
Edit
const invoices = [
  { id: "INV-001", amount: 200.50, dueDate: "2024-12-01" },
  { id: "INV-002", amount: 150.00, dueDate: "2024-11-20" },
  { id: "INV-003", amount: 450.75, dueDate: "2024-12-10" },
  { id: "INV-004", amount: 300.00, dueDate: "invalid-date" },
];

const currentDate = "2024-12-07";
Example Output:
typescript
Copy
Edit
[
  { id: "INV-001", amount: 200.50, daysOverdue: 6 },
  { id: "INV-002", amount: 150.00, daysOverdue: 17 },
]
Tips:
Use libraries like date-fns or luxon for date parsing if you want, or handle dates manually using JavaScript’s Date object.
Be prepared to discuss why you chose a particular approach (e.g., handling dates, iterating over data, logging errors).
Test your solution on edge cases, like empty arrays or invoices with missing fields.