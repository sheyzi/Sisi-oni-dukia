import type { LayoutLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import client from '$lib/client';
import { redirect } from '@sveltejs/kit';

const checkIfAdminExists = async (origin: string) => {
	try {
		const response = await client.get(origin + '/api/admin/user-already-exists');

		if (response.data.length > 0) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		console.log(err);
	}
};

export const load: LayoutLoad = async (event) => {
	const adminExists = await checkIfAdminExists(event.url.origin);

	if (!adminExists && event.url.pathname !== '/admin/register') {
		throw redirect(
			307,
			'/admin/register?message=No%20admin%20account%20found.%20Please%20create%20one.&type=info'
		);
	} else if (adminExists && event.url.pathname === '/admin/register') {
		// Throw a redirect if the user exists and tries to access the register page
		// This is to prevent the user from creating a new admin account
		throw redirect(
			307,
			'/admin/login?message=You%20already%20have%20an%20admin%20account.%20Please%20login%20instead.&type=info'
		);
	}

	const { session } = await getSupabase(event);
	if (!session && event.url.pathname !== '/admin/login') {
		throw redirect(307, '/admin/login?message=You%20need%20to%20login%20first.&type=info');
	} else if (session && event.url.pathname === '/admin/login') {
		// Throw a redirect if the user is logged in and tries to access the login page
		// This is to prevent the user from logging in again
		throw redirect(307, '/admin?message=You%20are%20already%20logged%20in.&type=info');
	}
	return { session };
};
