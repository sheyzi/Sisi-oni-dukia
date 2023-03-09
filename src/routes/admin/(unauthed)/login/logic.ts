import supabase from '$lib/supabase';

export interface Login {
	email: string;
	password: string;
}

export const signInWithEmail = async (cred: Login) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		...cred
	});

	if (error) {
		throw error;
	}

	return data;
};

export const signOut = async () => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw error;
	}
};
