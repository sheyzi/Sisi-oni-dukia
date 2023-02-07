export const getDefaultImage = (images: any) => {
	const image = images.find((image: any) => image.default);
	return image
		? image.url
		: 'https://rplpttxffjajeysdeidt.supabase.co/storage/v1/object/public/public/roberto-nickson-emqnSQwQQDo-unsplash.jpg';
};

export const getApartmentUrl = (apartment: any) => {
	return `/apartments/${apartment.slug}`;
};

export const generateApartmentWhatsAppLink = (
	apartment: any,
	whatsapp_number: string,
	base_url: string
) => {
	// Generate link with text asking if the apartment is available in english
	const link = `https://wa.me/${whatsapp_number}?text=Hi%2C%20is%20the%20apartment%20*${
		apartment.title
	}*%20available%3F%20I%20saw%20it%20on%20${base_url}${getApartmentUrl(apartment)}`;
	return link;
};
