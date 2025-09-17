
## Functionalties

### Login
```
- The Login page provides secure authentication for users

- Uses JWT tokens for authentication and session management.

- Validates credentials and redirects users to the correct dashboard based on their role.
-  This ensures only authorized users can access the platform and gives each role a personalized experience.
```
### CreatePayment
```
- The Create Payment page allows admins to initiate fee payment requests for students.

- Admin selects the student info, enters payment details, and sends a request.

- The system generates a payment link and records the transaction.
- This makes it easy for schools to collect fees digitally instead of handling manual payments.
```
### CheckStatus.jsx
```
- The Check Status page lets users track the status of payment requests.

- Shows whether a payment is Pending, Successful, or Failed.

- Provides transaction details for transparency.
- Parents and admins can quickly verify payment progress without confusion or delays.
```
### Dashboard.jsx

- The Dashboard acts as the control center for trustees

``` 
   Total transactions

   Successful, pending, failed payments

   Total collected amount 
```
- Provides a quick overview of financial performance.
- This helps schools monitor revenue and payment health at a glance.

### SchoolTransactions.jsx
```
- The School Transactions page lists all transactions for a specific school.

- Supports search and filtering by student, date, or payment status.

- Allows admins/trustees to drill down into transaction history for each school.
- Ensures clear tracking of fees collected per institution, making audits and reports easy.
```
