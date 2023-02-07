export const formatPrice = (price: number) => {
	return Intl.NumberFormat('en-NG', {
		style: 'currency',
		currency: 'NGN',
		minimumFractionDigits: 0
	}).format(price);
};
