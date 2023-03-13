import toast from 'svelte-french-toast';

export const getDefaultImage = (images: any) => {
	const image = images.find((image: any) => image.default);
	return image
		? image.url
		: 'https://rplpttxffjajeysdeidt.supabase.co/storage/v1/object/public/public/roberto-nickson-emqnSQwQQDo-unsplash.jpg';
};

export const getApartmentUrl = (apartment: any) => {
	return `/apartments/${apartment.slug}`;
};

export const getAdminApartmentUrl = (apartment: any) => {
	return `/admin/apartments/edit/${apartment.slug}`;
};

export const generateApartmentWhatsAppLink = (
	apartment: any,
	whatsapp_number: string,
	base_url: string
) => {
	// Generate link with text asking if the apartment is available in english
	const link = `https://wa.me/${whatsapp_number}?text=Hi%2C%20is%20this%20apartment%20*${
		apartment.title
	}*%20available%3F%20I%20saw%20it%20on%20${base_url}${getApartmentUrl(apartment)}`;
	return link;
};

export const sanitizeData = (obj: any) => {
	const newObj = JSON.parse(JSON.stringify(obj));
	// It removes empty strings or empty arrays from data objects
	Object.keys(newObj).forEach((key) => {
		if (newObj[key] && typeof newObj[key] === 'object' && !Array.isArray(newObj[key]))
			sanitizeData(newObj[key]);
		else if (newObj[key] === '' || (Array.isArray(newObj[key]) && newObj[key].length === 0))
			delete newObj[key];
	});
	return newObj;
};

export const showToastr = (message: string, type: string | null) => {
	if (message) {
		if (type === 'success') {
			toast(message, {
				style: 'background: #c6f6d5; color: #38a169;',
				position: 'bottom-right'
			});
		} else if (type === 'error') {
			toast(message, {
				style: 'background: #fed7d7; color: #e53e3e;',
				position: 'bottom-right'
			});
		} else if (type === 'warning') {
			toast(message, {
				style: 'background: #fff3cd; color: #fbbf24;',
				position: 'bottom-right'
			});
		} else if (type === 'info') {
			// Blue background with white text
			toast(message, {
				style: 'background: #e2e8f0; color: #4299e1;',
				position: 'bottom-right'
			});
		} else {
			toast(message, {
				style: 'background: #e2e8f0; color: #4299e1;',
				position: 'bottom-right'
			});
		}
	}
};
