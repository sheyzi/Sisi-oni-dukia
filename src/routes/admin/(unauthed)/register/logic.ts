import supabase from '$lib/supabase';
import client from '$lib/client';
import { AxiosError } from 'axios';

interface SignUpType {
	email: string;
	password: string;
}

const checkIfUserExists = async (email: string) => {
	try {
		await client.get('/api/admin/user-already-exists', {
			params: {
				email
			}
		});
		return true;
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.status === 404) {
				return false;
			}
		}
		console.log(error);
	}
};

export const signUp = async (credentials: SignUpType) => {
	const userExists = await checkIfUserExists(credentials.email);

	if (userExists) {
		throw new Error('User already exists');
	}

	const { data, error } = await supabase.auth.signUp({
		email: credentials.email,
		password: credentials.password
	});

	if (error) {
		throw error;
	}

	return data;
};
