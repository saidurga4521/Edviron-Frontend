# Paysphere – Payment Gateway Integration & Transaction Management  [![Live Demo](https://img.shields.io/badge/View_App-000?style=for-the-badge&logo=vercel&logoColor=white)](https://edviron-frontend-7rel.vercel.app/)

<a href="https://edviron-frontend-7rel.vercel.app/" target="_blank">
  <img src="https://img.shields.io/badge/View_App-000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"/>
</a>


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

## Screeshorts

### SignUp
<img width="1892" height="924" alt="Screenshot 2025-09-17 121353" src="https://github.com/user-attachments/assets/4f89e977-c7fe-4fd3-9d88-fcd4d7f99d06" />

### Login
<img width="1879" height="947" alt="Screenshot 2025-09-17 121414" src="https://github.com/user-attachments/assets/2d38b3b5-387a-4370-a3b2-c6ce5efb0130" />

### DashBoard
<img width="1854" height="599" alt="Screenshot 2025-09-17 122639" src="https://github.com/user-attachments/assets/78e3aa74-e39c-42bb-89e7-fb94e19f2711" />
<img width="1710" height="852" alt="Screenshot 2025-09-17 132817" src="https://github.com/user-attachments/assets/06345dfe-f468-40bd-810d-e92be7428762" />

### Schools 
<img width="1856" height="897" alt="Screenshot 2025-09-17 122727" src="https://github.com/user-attachments/assets/c1ba8ac3-fd3d-4e53-bff3-9a622836b9d9" />

### Check Status
<img width="1817" height="905" alt="Screenshot 2025-09-17 122756" src="https://github.com/user-attachments/assets/89364675-b836-468a-9f34-3f64974dd621" />

### Create payment
<img width="1863" height="880" alt="Screenshot 2025-09-17 122842" src="https://github.com/user-attachments/assets/6d892405-38db-43fa-9de0-7ccc96e6b6ce" />
<img width="1827" height="844" alt="Screenshot 2025-09-17 122905" src="https://github.com/user-attachments/assets/123a0a56-5e8a-408e-b09f-851bd3c57400" />



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

## Scope and Extension

- While Paysphere already covers core payment and school management features, there is plenty of room to scale and enhance the platform in the future:

### Multi-Currency & International Payments
```
- Expand beyond INR and enable payments in multiple currencies - - - (USD, EUR, etc.), along with real-time conversion. 
This would make the platform usable for international schools.
```
### Notifications & Reminders
```
- Integrate email, SMS, or push notifications to remind parents about pending payments and confirm successful transactions, improving communication and reducing defaults.
```
### Advanced Analytics Dashboard
```
-Introduce a visual analytics dashboard with charts and graphs that highlight fee collection trends, payment delays, and school-wise performance insights.
```
### Role-based Dashboards

```
- Enhance role management with separate dashboards for trustees, school admins, and parents/students, ensuring tailored access to only relevant data and actions.
```
