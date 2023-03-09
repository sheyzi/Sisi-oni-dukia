<script lang="ts">
	import '../styles/tailwind.css';
	import 'iconify-icon';
	import Lenis from '@studio-freight/lenis';
	import { onMount } from 'svelte';
	import supabase from '$lib/supabase';
	import { invalidate } from '$app/navigation';

	onMount(async () => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, session) => {
			invalidate('supabase:auth');
		});

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

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<slot />
