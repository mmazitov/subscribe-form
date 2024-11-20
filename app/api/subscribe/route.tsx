import prisma from '@/app/lib/db';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Импортируем PrismaClient

export async function POST(req: Request) {
	try {
		const { email } = await req.json();

		if (!email || !email.includes('@')) {
			return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
		}

		// Логика для сохранения email в базу данных
		const existingEmail = await prisma.emailRecord.findUnique({
			where: {
				email,
			},
		});

		if (existingEmail) {
			return NextResponse.json({ error: 'Already exist' }, { status: 400 });
		}

		// Сохраняем email в базу данных
		await prisma.emailRecord.create({
			data: {
				email,
			},
		});

		// Настройка Nodemailer
		const transporter = nodemailer.createTransport({
			service: 'gmail', // Или другой email-сервис
			auth: {
				user: process.env.EMAIL_USER, // Ваш email
				pass: process.env.EMAIL_PASS, // Пароль/ключ приложения
			},
		});

		// Отправка письма админу
		await transporter.sendMail({
			from: process.env.EMAIL_USER, // Отправитель
			to: process.env.EMAIL_ADMIN, // Почта администратора
			subject: 'New Subscriber', // Тема письма
			text: `New Subscriber: ${email}`, // Текст письма
		});

		// Отправка письма подписчику
		await transporter.sendMail({
			from: process.env.EMAIL_USER, // Отправитель
			to: email, // Почта подписчика
			subject: 'Subscribed', // Тема письма
			text: `Thanks for subscribe`, // Текст письма
		});

		return NextResponse.json({ message: 'Success' }, { status: 200 });
	} catch (error) {
		console.error('Something went wrong', error);
		return NextResponse.json({ error: 'Error' }, { status: 500 });
	}
}
