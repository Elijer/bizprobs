Challenge Name: Patient Search API
Estimated Time: 20 minutes

Problem Statement
You’re building a search feature for a clinical operating system. Create a function in TypeScript that takes a list of patients and a search query, then returns all patients whose names include the query (case-insensitive).

Requirements
Write a TypeScript function searchPatients that:

Accepts:

An array of patient objects:
typescript
Copy
Edit
interface Patient {
    id: number;
    name: string;
    age: number;
    condition: string;
}
A search query string.
Returns an array of patients whose name contains the query string, ignoring case.

Handles edge cases, such as:

Empty search query (returns an empty array).
No matching patients (returns an empty array).
Example Input
typescript
Copy
Edit
const patients: Patient[] = [
    { id: 1, name: "John Doe", age: 34, condition: "Knee Pain" },
    { id: 2, name: "Jane Smith", age: 28, condition: "Back Pain" },
    { id: 3, name: "Emily Johnson", age: 40, condition: "Shoulder Pain" },
];

const query = "jane";
Expected Output
typescript
Copy
Edit
[
    { id: 2, name: "Jane Smith", age: 28, condition: "Back Pain" }
]
Bonus
Allow searching by a patient’s condition in addition to their name.
Evaluation Criteria
Correctness: Does the function return the expected results?
Efficiency: Does it avoid unnecessary operations?
Code readability: Is the implementation clear and well-structured?
