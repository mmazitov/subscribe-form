'use client';

import './SubscribeForm.css';

import React, { useState } from 'react';

const SubscribeForm: React.FC = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	// Функция для проверки email
	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Клиентская валидация
		if (!email) {
			setError('Введите ваш email.');
			return;
		}
		if (!isValidEmail(email)) {
			setError('Введите корректный email.');
			return;
		}

		setError(''); // Очистить ошибку перед отправкой

		try {
			const response = await fetch('/api/subscribe/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});

			const data = await response.json();

			if (response.ok) {
				setMessage('Вы успешно подписались на рассылку!');
				setEmail('');
			} else {
				setError(data.error || 'Что-то пошло не так. Попробуйте снова.');
			}
		} catch (error) {
			setError('Что-то пошло не так. Попробуйте снова.');
		}
	};

	return (
		<div className="flex flex-col justify-center bg-[center_-25px] bg-[url('../public/subscribe-bg.png')] bg-[length:calc(100%-68px)_auto] bg-no-repeat px-[34px] pt-[180px] pb-[420px] w-100 text-[#1C1C1C] text-center subscribe-form">
			<h2 className="mb-[58px]">Будь у курсі наших новин</h2>
			<p className="mb-[93px]">
				Тут фейковий текст. Charity Lab Foundation <br /> - це благодійна
				організація, метою боротьби з голодом серед українців.{' '}
			</p>
			<form
				className="flex flex-row justify-center gap-[26px]"
				onSubmit={handleSubmit}
			>
				<input
					className={`border-[#2c4893] border-[2px] px-[27px] py-[10px] rounded-[55px] min-w-[427px] text-[#BEC9F0] text-[16px] placeholder:text-[#BEC9F0] outline-none ${
						error ? 'border-red-500' : ''
					}`}
					type="email"
					placeholder="example@gmail.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<button
					className="border-[#2c4893] border-[2px] bg-[#2C4893] hover:bg-[#fff] p-[10px] rounded-[67px] min-w-[290px] text-[#fff] text-[16px] text-center hover:text-[#2C4893] uppercase transition-[color_bg] delay-300 ease-in-out"
					type="submit"
				>
					Підписатись
				</button>
			</form>
			{error && <p className="mt-[10px] text-red-500">{error}</p>}
			{message && <p className="mt-[10px] text-green-500">{message}</p>}
		</div>
	);
};

export default SubscribeForm;
