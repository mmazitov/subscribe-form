import prisma from '@/app/lib/db';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Импортируем PrismaClient

export async function POST(req: Request) {
	try {
		const { email } = await req.json();

		if (!email || !email.includes('@')) {
			return NextResponse.json(
				{ error: 'Введите корректный email.' },
				{ status: 400 },
			);
		}

		// Логика для сохранения email в базу данных
		const existingEmail = await prisma.emailRecord.findUnique({
			where: {
				email,
			},
		});

		if (existingEmail) {
			return NextResponse.json(
				{ error: 'Этот email уже подписан на рассылку.' },
				{ status: 400 },
			);
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
			to: 'mazitov.nikolya@gmail.com', // Почта администратора
			subject: 'Новый подписчик на рассылку', // Тема письма
			text: `На ваш сайт подписался новый пользователь: ${email}`, // Текст письма
		});

		// Отправка письма подписчику
		await transporter.sendMail({
			from: process.env.EMAIL_USER, // Отправитель
			to: email, // Почта подписчика
			subject: 'Подтверждение подписки на рассылку', // Тема письма
			text: `Здравствуйте! Вы успешно подписались на нашу рассылку. Спасибо, что с нами!`, // Текст письма
		});

		return NextResponse.json(
			{ message: 'Подписка успешно оформлена!' },
			{ status: 200 },
		);
	} catch (error) {
		console.error('Ошибка при обработке подписки:', error);
		return NextResponse.json(
			{ error: 'Произошла ошибка. Попробуйте позже.' },
			{ status: 500 },
		);
	}
}
