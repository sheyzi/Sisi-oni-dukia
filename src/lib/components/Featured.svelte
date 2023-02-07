<script lang="ts">
	import { formatPrice } from '../utils/format';

	export let apartments: any;

	const getDefaultImage = (images: any) => {
		const image = images.find((image: any) => image.default);
		return image
			? image.url
			: 'https://rplpttxffjajeysdeidt.supabase.co/storage/v1/object/public/public/roberto-nickson-emqnSQwQQDo-unsplash.jpg';
	};

	const getUrl = (apartment: any) => {
		return `/apartments/${apartment.slug}`;
	};
</script>

<section class="md:py-10 py-5 max-w-5xl mx-auto px-5 about text-black">
	<div>
		<h2 class="text-center text-4xl font-serif font-medium">Featured Apartments</h2>
		<div class="grid md:grid-cols-3 grid-cols-1 gap-10">
			{#each apartments as apartment}
				<div
					class="card w-full bg-base-100 rounded shadow transition-shadow hover:shadow-xl border border-gray-400 mt-10"
				>
					<a href={getUrl(apartment)}>
						<span class="badge absolute top-5 bg-black text-white right-5 z-10"
							>{apartment.location}</span
						>
						<figure>
							<img
								src={getDefaultImage(apartment.images)}
								alt="Shoes"
								class="hover:blur-0 blur-[1px] transition-all duration-500 relative"
								style="aspect-ratio: 16/9; object-fit: cover; object-position: center;"
							/>
						</figure>
					</a>
					<div class="card-body text-center p-2 ">
						<h3 class="card-title font-normal font-serif text-lg text-center block">
							{apartment.title}
						</h3>
						<p class="text-sm">{formatPrice(apartment.price)} / night</p>
					</div>
					<div class="my-5 flex justify-center">
						<a href={getUrl(apartment)} class="uppercase text-sm underline text-center"
							>View details</a
						>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex justify-center mt-10">
			<a
				href="/apartments"
				class="btn border-black text-black hover:bg-black rounded-none btn-outline"
				>View All Apartments</a
			>
		</div>
	</div>
</section>
