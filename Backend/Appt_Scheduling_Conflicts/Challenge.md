Challenge: Appointment Scheduling Conflicts
Scenario:
A small business offers appointment-based services, and they want a system to detect scheduling conflicts. You are tasked with writing a program to determine if any of the scheduled appointments overlap.

Requirements:
Input:

An array of appointments, where each appointment has:
id (number): A unique identifier for the appointment.
startTime (string): The start time in ISO 8601 format (e.g., "2024-12-07T10:00:00").
endTime (string): The end time in ISO 8601 format (e.g., "2024-12-07T11:30:00").
Output:

An array of conflicts, where each conflict is represented as:
typescript
Copy
Edit
{ appointment1: number, appointment2: number }
appointment1 and appointment2 are the ids of conflicting appointments.
Behavior:

Two appointments conflict if their time intervals overlap (i.e., one starts before the other ends).
Assume all times are in the same time zone and formatted correctly.
Handle edge cases like an empty input array or appointments with invalid times.
Stretch Features:

Add a clientName field to the appointments and group conflicts by client.
Suggest rescheduling options to resolve conflicts.
Example Input:
typescript
Copy
Edit
const appointments = [
  { id: 1, startTime: "2024-12-07T09:00:00", endTime: "2024-12-07T10:00:00" },
  { id: 2, startTime: "2024-12-07T09:30:00", endTime: "2024-12-07T10:30:00" },
  { id: 3, startTime: "2024-12-07T11:00:00", endTime: "2024-12-07T12:00:00" },
  { id: 4, startTime: "2024-12-07T10:15:00", endTime: "2024-12-07T11:15:00" },
];
Example Output:
typescript
Copy
Edit
[
  { appointment1: 1, appointment2: 2 },
  { appointment1: 2, appointment2: 4 },
]
Explanation:

Appointment 1 overlaps with Appointment 2.
Appointment 2 overlaps with Appointment 4.
Appointment 3 does not overlap with any others.
Tips:
Convert startTime and endTime to Date objects for comparison.
Use nested loops or sorting to identify overlaps efficiently:
Option 1 (Simple): Compare every pair of appointments (O(n²)).
Option 2 (Optimized): Sort by startTime and check consecutive appointments (O(n log n)).
Add checks for invalid or missing fields in the input.