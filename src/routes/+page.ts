import supabase from '../lib/supabase';

export const load = async () => {
	const { data } = await supabase
		.from('apartments')
		.select('*, images(*)')
		.filter('isFeatured', 'eq', true)
		.order('created_at', { ascending: false })
		.limit(6);

	return {
		featuredApartments: data
	};
};
