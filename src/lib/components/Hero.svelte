<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	export let title: string;
	export let description: string;
	export let image: string;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#hero',
				start: 'top 90%'
			}
		});

		tl.from('.hero-title', {
			duration: 1,
			y: 100,
			opacity: 0,
			ease: 'power4.out'
		});

		tl.from(
			'.description',
			{
				duration: 1,
				y: 100,
				opacity: 0,
				ease: 'power4.out'
			},
			'-=0.5'
		);
	});
</script>

<section id="hero" class="max-w-[1500px] mx-auto p-5">
	<div class="wrapper min-h-[600px] relative" style="background-image: url({image});">
		<div
			class="absolute bottom-0 left-0 md:px-10 p-5 md:py-5 md:space-y-10 space-y-5 text-white content h-full  flex flex-col justify-end "
		>
			<p class="md:text-2xl text-lg uppercase hero-title ">{title}</p>
			<p class="font-serif text-3xl md:text-6xl description ">{description}</p>
		</div>
	</div>
</section>

<style>
	.wrapper {
		background-position: center;
		background-size: cover;
		background-color: rgba(0, 0, 0, 0.3);
		background-blend-mode: multiply;
	}

	.content {
		color: white;
	}
</style>
