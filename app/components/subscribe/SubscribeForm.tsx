'use client';

import React, { useState } from 'react';
import './SubscribeForm.css';

const SubscribeForm: React.FC = () => {
	// State for storing the email, success message, and error message
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	// Helper function to validate the email format
	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
		return emailRegex.test(email);
	};

	// Handles form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevent default form submission

		// Client-side validation for email input
		if (!email) {
			setError('Please enter your email.');
			return;
		}
		if (!isValidEmail(email)) {
			setError('Please enter a valid email.');
			return;
		}

		setError(''); // Clear any existing errors before sending the request

		try {
			// Make a POST request to the `/api/subscribe/` endpoint
			const response = await fetch('/api/subscribe/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }), // Send email as JSON
			});

			const data = await response.json();

			// Handle the response
			if (response.ok) {
				setMessage('You have successfully subscribed!');
				setEmail(''); // Clear the email input
			} else {
				setMessage(data.error || 'Something went wrong. Please try again.');
			}
		} catch (error) {
			// Handle network or server errors
			setMessage('Something went wrong. Please try again.');
		}
	};

	return (
		<div className="flex flex-col justify-center px-[34px] pt-[180px] pb-[420px] w-100 text-[#1C1C1C] text-center subscribe-form">
			{/* Heading */}
			<h2 className="mb-[58px]">Subscribe for news</h2>
			{/* Description */}
			<p className="mb-[93px]">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
				voluptatum dolore eius sed inventore quos debitis voluptas, a asperiores
				dicta sapiente molestias consequatur neque natus pariatur, iure, esse
				culpa velit.
			</p>
			{/* Subscription form */}
			<form
				className="flex flex-row justify-center gap-[26px]"
				onSubmit={handleSubmit}
			>
				{/* Email input field */}
				<input
					className={`border-[#2c4893] border-[2px] px-[27px] py-[10px] rounded-[55px] min-w-[427px] text-[#BEC9F0] text-[16px] placeholder:text-[#BEC9F0] outline-none ${
						error ? 'border-red-500' : '' // Add red border if there's an error
					}`}
					type="email"
					placeholder="example@gmail.com" // Placeholder for email input
					value={email} // Controlled input value
					onChange={(e) => setEmail(e.target.value)} // Update email state
					required
				/>
				{/* Submit button */}
				<button
					className="border-[#2c4893] border-[2px] bg-[#2C4893] hover:bg-[#fff] p-[10px] rounded-[67px] min-w-[290px] text-[#fff] text-[16px] text-center hover:text-[#2C4893] uppercase transition-[color_bg] delay-300 ease-in-out"
					type="submit"
				>
					Subscribe
				</button>
			</form>
			{/* Error message */}
			{error && <p className="mt-[10px] text-red-500">{error}</p>}
			{/* Success message */}
			{message && <p className="mt-[10px] text-green-500">{message}</p>}
		</div>
	);
};

export default SubscribeForm;
