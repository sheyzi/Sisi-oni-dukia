<script lang="ts">
	import { formatPrice } from '../utils/format';
	import { getApartmentUrl, getDefaultImage } from '../utils/helpers';

	export let apartments: any;
</script>

<div class="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5">
	{#each apartments as apartment}
		<div class="card w-full bg-base-100 rounded shadow-sm transition-shadow hover:shadow  mt-10">
			<a href={getApartmentUrl(apartment)}>
				<span class="badge bg-[#a79a86] border-[#a79a86] absolute top-5  text-black right-5 z-10"
					>{apartment.location}</span
				>
				<figure>
					<img
						src={getDefaultImage(apartment.images)}
						alt="Shoes"
						class="hover:blur-0 md:blur-[1px] transition-all duration-500 relative"
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
				<a href={getApartmentUrl(apartment)} class="uppercase text-sm underline text-center"
					>View details</a
				>
			</div>
		</div>
	{:else}
		<div class="flex mt-20 justify-center">
			<p class="text-2xl text-center font-serif">No apartments found for your search</p>
		</div>
	{/each}
</div>
