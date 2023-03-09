import supabase from '$lib/supabase';

export const load = async () => {
	const { data } = await supabase
		.from('homepage')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(1);

	return {
		homepage: data ? data[0] : {}
	};
};
