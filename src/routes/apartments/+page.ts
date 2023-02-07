import supabase from '$lib/supabase';

export const load = async () => {
	const { data } = await supabase
		.from('apartments')
		.select('*, images(*)')
		.order('created_at', { ascending: false });

	return {
		apartments: data ? data : []
	};
};
