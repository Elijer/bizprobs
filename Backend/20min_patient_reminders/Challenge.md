Flagler Health AI Coding Challenge
Challenge Name: Patient Reminder Formatter

Estimated Time: 20 minutes

Problem Statement
You’re building a feature for a clinical operating system. One task is to format appointment reminders for MSK patients based on their data. Create a function in TypeScript that formats appointment data into a human-readable message and returns it.

Requirements
Write a TypeScript function formatAppointmentReminder that:

Takes in an object with the following structure:

typescript
Copy
Edit
interface Appointment {
    patientName: string; // The patient's full name
    appointmentDate: string; // ISO date string (e.g., "2025-01-15T14:30:00Z")
    location: string; // The clinic's name (e.g., "Downtown Clinic")
}
Returns a formatted string with the following structure:

sql
Copy
Edit
Hello [patientName],  
This is a reminder of your appointment on [day, date, and time in the user's local time] at [location].  
For example, given the input:

typescript
Copy
Edit
{
    patientName: "John Doe",
    appointmentDate: "2025-01-15T14:30:00Z",
    location: "Downtown Clinic"
}
The output should be:

csharp
Copy
Edit
Hello John Doe,  
This is a reminder of your appointment on Wednesday, January 15, 2025, at 9:30 AM at Downtown Clinic.  
Bonus
Handle invalid appointmentDate values gracefully by returning an error message:
"Invalid appointment date provided."
Evaluation Criteria
Correctness: Does the function format the message as specified?
Code quality: Is the TypeScript implementation clear and concise?
Error handling: Is invalid input handled appropriately?
