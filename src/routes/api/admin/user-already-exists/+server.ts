import { createClient as createAdmin } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SERVICE_ROLE_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

const supabaseAdmin = createAdmin(PUBLIC_SUPABASE_URL, PRIVATE_SERVICE_ROLE_KEY, {
	auth: {
		autoRefreshToken: false,
		persistSession: false
	}
});

export const GET: RequestHandler = async ({ url }) => {
	const {
		data: { users },
		error
	} = await supabaseAdmin.auth.admin.listUsers();

	if (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: error.message }), {
			status: 500
		});
	}

	const email = url.searchParams.get('email');

	if (!email) {
		return new Response(JSON.stringify(users), {
			status: 200
		});
	}

	const user = users.find((user) => user.email === email);

	if (!user) {
		return new Response(JSON.stringify({ message: 'User not found' }), {
			status: 404
		});
	}

	return new Response(JSON.stringify({ user: user }), {
		status: 200
	});
};
