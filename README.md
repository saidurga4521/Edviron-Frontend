# Paysphere – Payment Gateway Integration & Transaction Management

Paysphere is a full-stack payment management system that integrates with Edviron’s payment gateway to process secure online transactions. It provides a smooth flow for initiating payments, validating responses, and tracking transaction statuses with a user-friendly dashboard.

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express,MongoDB,Webhooks
## Installation

### 🚀 Project Setup

### Prerequisites
- Node.js
- npm 
- MongoDB
- React

### Install my-project with npm
#### Frontend
  - cd edupay
  - npm i
  - npm run dev

#### Backend
  - npm run dev
  - 
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
```
`API_KEY`
`ANOTHER_API_KEY`
`PORT`
`FRONTEND_URL`
`CALLBACK_URL`
`JWT_SECRET_KEY`
`JWT_EXPIRY=7d`
`SCHOOL_ID` 
`PG_SECRET`
`API_KEY`
`PG_URL`
`MONGODB_URI`
```
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
