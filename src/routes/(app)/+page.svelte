<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Outstanding from '$lib/components/Outstanding.svelte';
	import Featured from '$lib/components/Featured.svelte';
	import Amenities from '$lib/components/Amenities.svelte';
	import Locations from '$lib/components/Locations.svelte';
	import SpecialRequest from '$lib/components/SpecialRequest.svelte';
	import type { HomePage } from '../../lib/types/homepage.type';

	export let data: any;
	const { featuredApartments } = data;
	const homepage: HomePage = data.homepage;
</script>

<svelte:head>
	<title>Sisi Oni Dukia - Your next door realtor</title>
	<meta name="description" content="Sisi Oni Dukia - Your next door realtor" />
	<!-- OG and Twitter meta tags -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Sisi Oni Dukia - Your next door realtor" />
	<meta
		property="og:description"
		content="Discover a world of luxury living at Sisi Oni Dukia, where every moment is elevated with exceptional comfort and style. Whether you're traveling for business or leisure, our fully-equipped apartments offer the perfect blend of convenience, privacy, and luxury, making us the ideal choice for your next stay. "
	/>
	<meta
		property="og:image"
		content="https://rplpttxffjajeysdeidt.supabase.co/storage/v1/object/public/public/spacejoy-q3Qd86sfaoU-unsplash_1_-min_xi1daf%20(1).jpg"
	/>
	<meta property="og:url" content="https://sisionidukia.com/" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@sisionidukia" />
	<meta name="twitter:creator" content="@sheyzi" />
	<meta name="twitter:title" content="Sisi Oni Dukia - Your next door realtor" />
	<meta
		name="twitter:description"
		content="Discover a world of luxury living at Sisi Oni Dukia, where every moment is elevated with exceptional comfort and style. Whether you're traveling for business or leisure, our fully-equipped apartments offer the perfect blend of convenience, privacy, and luxury, making us the ideal choice for your next stay. "
	/>
	<meta
		name="twitter:image"
		content="https://rplpttxffjajeysdeidt.supabase.co/storage/v1/object/public/public/spacejoy-q3Qd86sfaoU-unsplash_1_-min_xi1daf%20(1).jpg"
	/>
</svelte:head>

<Hero
	title={homepage.hero_title}
	description={homepage.hero_description}
	image={homepage.hero_image}
/>
<About image={homepage.about_image} text={homepage.about_text} />
<Featured apartments={featuredApartments} />
<Outstanding
	image={homepage.section1_image}
	text={homepage.section1_text}
	title={homepage.section1_title}
	image2={homepage.section1_image_2}
	whatsapp_url={homepage.whatsapp_url}
/>
<Amenities />
<Locations locations={homepage.home_locations} />
