<script lang="ts">
	import { onMount } from 'svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Outstanding from '$lib/components/Outstanding.svelte';
	import Featured from '$lib/components/Featured.svelte';
	import Amenities from '../lib/components/Amenities.svelte';
	import Locations from '../lib/components/Locations.svelte';
	import SpecialRequest from '../lib/components/SpecialRequest.svelte';

	export let data: any;
	const { homepage } = data;
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
<Featured />
<Outstanding
	image={homepage.section1_image}
	text={homepage.section1_text}
	title={homepage.section1_title}
	image2={homepage.section1_image_2}
/>
<Amenities />
<Locations />
<SpecialRequest />
