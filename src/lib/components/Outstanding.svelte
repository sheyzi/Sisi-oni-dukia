<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	export let title: string;
	export let text: string;
	export let image: string;
	export let image2: string;

	export let whatsapp_url: any;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const mm = gsap.matchMedia();

		mm.add('(max-width: 768px)', () => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: '.outstanding',
					start: 'top 90%'
				}
			});

			tl.from('.outstanding-title', {
				duration: 1,
				y: 100,
				opacity: 0,
				ease: 'power4.out'
			});

			tl.from(
				'.outstanding-text',
				{
					duration: 1,
					y: 100,
					opacity: 0,
					ease: 'power4.out'
				},
				'-=0.5'
			);

			tl.fromTo(
				'.outstanding-button-wrapper',
				{
					duration: 1,
					scale: 0,
					opacity: 0,
					ease: 'power4.out'
				},
				{
					scale: 1,
					opacity: 1
				},
				'-=0.5'
			);

			tl.fromTo(
				'.image',
				{
					duration: 1,
					scale: 0,
					opacity: 0,
					ease: 'power4.out'
				},
				{
					scale: 1,
					opacity: 1
				}
			);

			tl.fromTo(
				'.image2',
				{
					duration: 1,
					scale: 0,
					opacity: 0,
					ease: 'power4.out'
				},
				{
					scale: 1,
					opacity: 1
				}
			);
		});

		mm.add('(min-width: 768px)', () => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: '.outstanding',
					start: 'top 90%'
				}
			});

			tl.fromTo(
				'.image',
				{
					duration: 1,
					scale: 0,
					opacity: 0,
					ease: 'power4.out'
				},
				{
					scale: 1,
					opacity: 1
				}
			);

			tl.fromTo(
				'.image2',
				{
					duration: 1,
					scale: 0,
					opacity: 0,
					ease: 'power4.out'
				},
				{
					scale: 1,
					opacity: 1
				}
			);

			tl.from('.outstanding-title', {
				duration: 1,
				y: 100,
				opacity: 0,
				ease: 'power4.out'
			});

			tl.from(
				'.outstanding-text',
				{
					duration: 1,
					y: 100,
					opacity: 0,
					ease: 'power4.out'
				},
				'-=0.5'
			);

			tl.fromTo(
				'.outstanding-button-wrapper',
				{
					duration: 1,
					scale: 0,
					opacity: 0,
					ease: 'power4.out'
				},
				{
					scale: 1,
					opacity: 1
				},
				'-=0.5'
			);
		});
	});
</script>

<section class="md:py-10 py-5 max-w-5xl mx-auto md:px-10 px-5 outstanding">
	<div class="grid">
		<div>
			<h3 class="text-4xl text-black font-serif outstanding-title">{title}</h3>
			<div class="pl-10 space-y-10 mt-5">
				<p class="text-black outstanding-text">
					{text}
				</p>
				<div class="outstanding-button-wrapper">
					<a href={whatsapp_url} class="outstanding-button text-[#A79A86]">Request Availability</a>
				</div>
			</div>
		</div>

		<div class="relative flex justify-end">
			<img
				src={image2}
				class="absolute md:block h-[200px] left-0 -bottom-10 image2 z-10"
				style="aspect-ratio: 3/2;"
				alt=""
			/>
			<img
				src={image}
				class="md:block h-[400px] right-0 top-0 image"
				style="aspect-ratio: 12/16;"
				alt=""
			/>
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 4rem;
		align-items: center;
	}

	.outstanding-button {
		padding: 1rem 2rem;
		border: 1px solid #a79a86;
		color: #000;
		margin-top: 1rem;
		font-weight: 600;
		transition: transform 300ms ease;
	}

	.outstanding-button:hover {
		background-color: #a79a86;
		color: #fff;
	}

	@media (max-width: 768px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
