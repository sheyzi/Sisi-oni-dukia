import { z } from 'zod';

export const registerSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required'
		})
		.email('Email must be a valid email address'),
	password: z
		.string({
			required_error: 'Password is required'
		})
		.min(8, 'Password must be at least 8 characters long')
});
