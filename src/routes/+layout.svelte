<script lang="ts">
	import '../styles/tailwind.css';
	import 'iconify-icon';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import LoadScreen from '$lib/components/LoadScreen.svelte';
	import Lenis from '@studio-freight/lenis';
	import { onMount } from 'svelte';

	export let data: any;
	const { homepage } = data;

	onMount(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
			direction: 'vertical', // vertical, horizontal
			gestureDirection: 'vertical', // vertical, horizontal, both
			smooth: true,
			mouseMultiplier: 1,
			smoothTouch: false,
			touchMultiplier: 2,
			infinite: false
		});

		lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }: any) => {
			// console.log({ scroll, limit, velocity, direction, progress });
		});

		function raf(time: any) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	});
</script>

<div class="flex flex-col min-h-screen">
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
