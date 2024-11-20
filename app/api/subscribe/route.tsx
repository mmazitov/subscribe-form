import prisma from '@/app/lib/db';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Handles POST requests to the `/api/subscribe/` endpoint
export async function POST(req: Request) {
	try {
		// Parse email from the request body
		const { email } = await req.json();

		// Validate email format
		if (!email || !email.includes('@')) {
			return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
		}

		// Check if the email already exists in the database
		const existingEmail = await prisma.emailRecord.findUnique({
			where: {
				email,
			},
		});

		// Return error if the email already exists
		if (existingEmail) {
			return NextResponse.json({ error: 'Already exist' }, { status: 400 });
		}

		// Save the email in the database
		await prisma.emailRecord.create({
			data: {
				email,
			},
		});

		// Set up Nodemailer transporter with email credentials
		const transporter = nodemailer.createTransport({
			service: 'gmail', // Email service provider
			auth: {
				user: process.env.EMAIL_USER, // Sender's email address
				pass: process.env.EMAIL_PASS, // App password for the email account
			},
		});

		// Send notification email to the admin
		await transporter.sendMail({
			from: process.env.EMAIL_USER, // Sender's email address
			to: process.env.EMAIL_ADMIN, // Admin's email address
			subject: 'New Subscriber', // Email subject
			text: `New Subscriber: ${email}`, // Email body
		});

		// Send confirmation email to the subscriber
		await transporter.sendMail({
			from: process.env.EMAIL_USER, // Sender's email address
			to: email, // Subscriber's email address
			subject: 'Subscribed', // Email subject
			text: `Thanks for subscribe`, // Email body
		});

		// Respond with success message
		return NextResponse.json({ message: 'Success' }, { status: 200 });
	} catch (error) {
		// Log and handle any server errors
		console.error('Something went wrong', error);
		return NextResponse.json({ error: 'Error' }, { status: 500 });
	}
}
