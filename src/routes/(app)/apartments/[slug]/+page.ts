import type { PageLoad } from '../$types';
import supabase from '$lib/supabase';

export const load = async ({ params }: PageLoad) => {
	const { slug } = params;

	const { data } = await supabase
		.from('apartments')
		.select('*, images(*)')
		.eq('slug', slug)
		.single();

	const relatedApartments = await supabase
		.from('apartments')
		.select('*, images(*)')
		.textSearch('location', `'${data.location}'`)
		.neq('id', data.id)
		.limit(6);

	return {
		apartment: data,
		relatedApartments: relatedApartments.data || []
	};
};
