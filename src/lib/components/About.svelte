<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	export let image: string;
	export let text: string;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		// Create scale animation
		gsap.from('.welcome-title', {
			scrollTrigger: {
				trigger: '.about',
				start: 'top 90%'
			},
			duration: 1,
			scale: 0.5,
			opacity: 0,
			ease: 'power4.out'
		});
	});
</script>

<section class="md:py-10 py-5 max-w-5xl mx-auto px-5 about">
	<div class="grid items-center">
		<div class="title-cover" style="background-image: url({image});">
			<!-- <img src={image} class="hidden md:block" alt="" /> -->
			<div class="md:hidden">
				<h1 class="md:text-3xl  text-3xl text-center  font-kaushan text-white welcome-title">
					Welcome to <br /><span class="font-serif md:text-4xl text-4xl">Sisi Oni Dukia</span>
				</h1>
			</div>
		</div>
		<div class="space-y-3 item-2 text-center md:text-left">
			<h1 class="md:text-3xl hidden md:block text-3xl  font-kaushan text-black welcome-title">
				Welcome to <br /><span class="font-serif md:text-4xl text-4xl">Sisi Oni Dukia</span>
			</h1>
			<p class="text-black">
				{text}
			</p>
			<a href="/apartments" class="btn rounded-none hover:scale-90">Get your next apartment</a>
		</div>
	</div>
</section>

<style>
	.welcome-title {
		line-height: 1.2;
		z-index: 2;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 2rem;
	}

	/* Make img element in title cover the background */
	.title-cover {
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		background-size: cover;
		background-position: center;
		height: 100%;
	}

	@media (max-width: 768px) {
		.grid {
			grid-template-columns: 1fr;
		}

		.title-cover {
			height: 300px;
			background-color: rgba(0, 0, 0, 0.3);
			background-blend-mode: multiply;
		}
	}

	@media (min-width: 768px) {
		.title-cover {
			background-image: none;
		}
	}
</style>
