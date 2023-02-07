<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Outstanding from '$lib/components/Outstanding.svelte';
	import Featured from '$lib/components/Featured.svelte';
	import Amenities from '../lib/components/Amenities.svelte';
	import Locations from '../lib/components/Locations.svelte';
	import SpecialRequest from '../lib/components/SpecialRequest.svelte';
	import { onMount } from 'svelte';

	export let data: any;
	const { homepage, featuredApartments } = data;

	onMount(() => {
		console.log(homepage);
	});
</script>

<svelte:head>
	<title>Sisi Oni Dukia - Your next door realtor</title>
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
<SpecialRequest />
