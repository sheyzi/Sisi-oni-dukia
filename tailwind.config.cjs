module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				Margaret: ['Margaret', 'serif'],
				DMSans: ['DM Sans', 'sans-serif']
			},
			colors: {
				primary: '#034473',
				accent: '#D2ECFF'
			},
			'font-size': {
				heading: '3.375rem'
			}
		}
	},
	plugins: []
};
