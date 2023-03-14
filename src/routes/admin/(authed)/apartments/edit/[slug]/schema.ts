import { z } from 'zod';

export const schema = z.object({
	title: z.string({ required_error: 'Title is required' }),
	description: z.string({ required_error: 'Description is required' }),
	bedrooms: z
		.number({ required_error: 'Number of available bedrooms is required' })
		.min(1, 'There must be at least 1 bedroom'),
	guests: z
		.number({ required_error: 'Number of allowed guests is required' })
		.min(1, 'At least a minimum of 1 guest must be allowed'),
	beds: z
		.number({ required_error: 'Number of available beds is required' })
		.min(1, 'There must be at least 1 available bed'),
	bathrooms: z
		.number({ required_error: 'Number of available bathrooms is required' })
		.min(1, 'There must be at least 1 available bathroom'),
	location: z.string({ required_error: 'Location is required' }),
	isFeatured: z.boolean().optional(),
	power_supply: z.boolean().optional(),
	wifi: z.boolean().optional(),
	air_condition: z.boolean().optional(),
	cleaning: z.boolean().optional(),
	security: z.boolean().optional(),
	netflix: z.boolean().optional(),
	price: z
		.number({ required_error: 'Price is required' })
		.min(0, 'The price cannot be a negative number'),
	additional_amenities: z.array(z.string()).optional()
});
