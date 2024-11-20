<h1 align="center">Newsletter Subscription Service</h1>

## 🎯 About

A simple newsletter subscription service built with **Next.js**, **Prisma**, and **Nodemailer**. This project allows users to subscribe to a mailing list and sends confirmation emails to both the subscriber and the admin.

## ✨ Features

- Email validation on both the client and server sides.
- Stores subscriber emails in a database using Prisma.
- Sends email notifications using Nodemailer.
- Includes a responsive subscription form styled with CSS.
- Prevents duplicate email submissions.

## 🚀 Tech Stack

**Frontend:** [React](https://pt-br.reactjs.org/) (with [Next.js](https://nextjs.org/)), CSS <br>
**Backend:** [Next.js API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) <br>
**Database:** [Prisma ORM](https://www.prisma.io/) <br>
**Email Service:** [Nodemailer](https://www.nodemailer.com/) (supports Gmail or other providers)

## 🏁 Starting

```
Make sure you have the following tools installed:

Node.js - v14.21.3 (for running build tools if needed).
PostgreSQL or another database supported by Prisma
Gmail or other SMTP email credentials for sending emails

# Clone this project
$ git clone https://github.com/mmazitov/subscribe-form

# Access
$ cd subscribe-form

# Install the dependencies using Yarn or npm:
$ yarn install or $ npm install

#Create an .env file in the root directory and add the following environment variables:

DATABASE_URL=your_database_url
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EMAIL_ADMIN=admin_email@example.com

#Set up the database schema using Prisma:
npx prisma migrate dev --name init

# Run the project
$ $ yarn start or $ npm start

# The server will initialize in the <http://localhost:3000>

# Build project
$ $ yarn build or $ npm build

# Lint project
$ $ yarn lint or $ npm lint

# Pretty project
$ $ yarn format or $ npm format

```

## Usage

**Subscription Form** <br>
The user can enter their email into the subscription form available at the root route (/).

- If the email is valid and doesn't already exist in the database:
  - It is saved to the database.
  - A confirmation email is sent to the subscriber.
  - A notification email is sent to the admin.
- If the email is invalid or already exists:
  - An error message is displayed.

**API Endpoint** <br>
The subscription form sends a POST request to the API route at /api/subscribe/. The backend:

- Validates the email.
- Checks for duplicates in the database.
- Sends emails using Nodemailer.

## Database Configuration

The `schema.prisma` file defines a single model for storing email records:

```
model EmailRecord {
  id    Int     @id @default(autoincrement())
  email String  @unique
  createdAt DateTime @default(now())
}
```

Ensure your .env file contains the correct DATABASE_URL for your database.

## Environment Variables

<table>
	<thead>
		<td><b>Variable</b></td>
		<td><b>Description</b></td>
	</thead>
	<tbody>
		<tr>
			<td>DATABASE_URL</td>
			<td>The connection string for your Prisma-supported database.</td>
		</tr>
		<tr>
			<td>EMAIL_USER</td>
			<td>The email address used to send emails.</td>
		</tr>
		<tr>
			<td>EMAIL_PASS</td>
			<td>The app password or authentication token for the email.</td>
		</tr>
		<tr>
			<td>EMAIL_ADMIN</td>
			<td>The email address to receive admin notifications.</td>
		</tr>
	</tbody>
</table>

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any bugs or have feature requests.
