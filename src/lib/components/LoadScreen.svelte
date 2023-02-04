<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	onMount(() => {
		const tl = gsap.timeline();

		tl.to('.load', {
			duration: 2,
			y: '-100%',
			ease: 'power4.out'
		});
	});
</script>

<div
	class="fixed top-0 right-0 left-0 bottom-0 bg-[#A79A86] z-50 load flex justify-center items-center "
>
	<p class="text-white animate-pulse font-serif md:text-6xl text-3xl">Sisi Oni Dukia</p>
</div>
