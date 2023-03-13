export interface Apartment {
	id: string;
	title: string;
	slug: string;
	description: string;
	bedrooms: number;
	guests: number;
	beds: number;
	bathrooms: number;
	location: string;
	isBooked: boolean;
	created_at: Date;
	isFeatured: boolean;
	power_supply: boolean;
	wifi: boolean;
	air_condition: boolean;
	cleaning: boolean;
	security: boolean;
	netflix: boolean;
	price: number;
	additional_amenities: string[];
	images: Image[];
}

export interface Image {
	id: number;
	created_at: Date;
	url: string;
	default: boolean;
	apartment: string;
}
