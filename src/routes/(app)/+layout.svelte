<script lang="ts">
	import '../../styles/tailwind.css';
	import 'iconify-icon';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import LoadScreen from '$lib/components/LoadScreen.svelte';

	import { navigating } from '$app/stores';
	import NavigationLoader from '$lib/components/NavigationLoader.svelte';

	export let data: any;
	const { homepage } = data;
</script>

<div class="flex flex-col min-h-screen">
	{#if $navigating}
		<NavigationLoader />
	{/if}
	<LoadScreen />
	<Navbar />
	<main class="grow">
		<slot />
	</main>
	<Footer
		instagram_url={homepage.instagram_url}
		twitter_url={homepage.twitter_url}
		email={homepage.contact_email}
	/>
</div>
