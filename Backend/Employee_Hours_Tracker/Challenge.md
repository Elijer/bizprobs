Challenge: Employee Work Hours Tracker
Scenario:
A small business wants a simple program to calculate the total hours worked by employees in a week based on daily logs. Each log contains the employee's name, date, and hours worked. The goal is to summarize the total hours per employee for the week.

Requirements:

Input:

A list of work logs where each log includes:
employeeName (string): The name of the employee.
date (string): The date of the work log in YYYY-MM-DD format.
hoursWorked (number): The hours worked on that day.
An optional startDate and endDate to define the week (both in YYYY-MM-DD format).
Output:

A summary object where:
The keys are employee names.
The values are the total hours worked by that employee during the week.
Behavior:

Parse the input data.
Filter the logs to include only those within the startDate and endDate range (if provided).
Handle edge cases, such as overlapping date ranges or invalid input.
Stretch Features:

Allow tracking overtime by flagging employees who worked more than 40 hours in the week.
Example Input:
typescript
Copy
Edit
const logs = [
  { employeeName: "Alice", date: "2024-12-01", hoursWorked: 8 },
  { employeeName: "Bob", date: "2024-12-01", hoursWorked: 7.5 },
  { employeeName: "Alice", date: "2024-12-02", hoursWorked: 9 },
  { employeeName: "Alice", date: "2024-12-03", hoursWorked: 7 },
  { employeeName: "Bob", date: "2024-12-03", hoursWorked: 8 },
  { employeeName: "Alice", date: "2024-12-05", hoursWorked: 8 },
];

const startDate = "2024-12-01";
const endDate = "2024-12-07";
Example Output:
typescript
Copy
Edit
{
  Alice: 32, // 8 + 9 + 7 + 8
  Bob: 15.5  // 7.5 + 8
}
Tips:
Use libraries like date-fns or luxon for date parsing and filtering if desired.
Use a dictionary (Record<string, number>) to store employee totals for efficient lookups.
Test your solution with edge cases like overlapping date ranges, missing fields, or empty logs.
Would you like me to elaborate on how to approach solving this challenge in TypeScript?







You said:
