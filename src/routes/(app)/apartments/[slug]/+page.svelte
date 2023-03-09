<script lang="ts">
	import { formatPrice } from '$lib/utils/format';
	import {
		generateApartmentWhatsAppLink,
		getApartmentUrl,
		getDefaultImage
	} from '$lib/utils/helpers';
	import { page } from '$app/stores';

	export let data: any;

	export let { apartment, relatedApartments, homepage } = data;
</script>

<svelte:head>
	<title>{apartment.title} - Sisi Oni Dukia</title>
</svelte:head>

<div class="max-w-5xl mx-auto md:px-10 px-5 py-10 text-black">
	<div class="w-full bg-blue-600" style="aspect-ratio: 16/9">
		<img
			src={getDefaultImage(apartment.images)}
			class="w-full h-full object-cover "
			alt={apartment.title}
		/>
	</div>
	<div class="md:px-10 mt-10">
		<div class="">
			<div class="col-span-2">
				<p class="md:text-xl">{formatPrice(apartment.price)} / Night</p>
				<h1 class="md:text-4xl text-2xl font-serif md:mt-5 mt-3">{apartment.title}</h1>
				<div class="flex items-center">
					<iconify-icon inline icon="material-symbols:location-on" class="location-icon" />
					<p class="md:text-lg  uppercase text-[#CD396B] text-sm">
						{apartment.location}
					</p>
				</div>
			</div>
			<div class="mt-5">
				<a
					href={generateApartmentWhatsAppLink(
						apartment,
						homepage.whatsapp_number,
						$page.url.origin
					)}
					class="btn hover:bg-black text-black border-black rounded-none btn-outline"
					>Check Availability</a
				>
			</div>
		</div>
		<div class="section">
			<div class="flex md:justify-around justify-between">
				<div class="flex flex-col justify-center items-center">
					<iconify-icon icon="fluent:luggage-20-regular" class="amenities-icon" />
					<p class="mt-2 text-sm md:text-base">{apartment.guests} guests</p>
				</div>
				<div class="flex flex-col justify-center items-center">
					<iconify-icon icon="ph:door-light" class="amenities-icon" />
					<p class="mt-2 text-sm md:text-base">{apartment.bedrooms} bedrooms</p>
				</div>
				<div class="flex flex-col justify-center items-center">
					<iconify-icon icon="fluent:bed-20-regular" class="amenities-icon" />
					<p class="mt-2 text-sm md:text-base">{apartment.beds} beds</p>
				</div>
				<div class="flex flex-col justify-center items-center">
					<iconify-icon icon="ph:bathtub-light" class="amenities-icon" />
					<p class="mt-2 text-sm md:text-base">{apartment.bathrooms} bathrooms</p>
				</div>
			</div>
		</div>
		<div class=" section">
			<h3 class="section-title">About this place</h3>
			<div class="md:prose max-w-none prose-sm text-black ">
				{@html apartment.description}
			</div>
		</div>
		<div class=" section ">
			<h3 class="section-title">Amenities</h3>
			<div class="flex gap-10 flex-wrap mt-5">
				{#if apartment.power_supply}
					<div class="flex items-center space-x-5">
						<iconify-icon icon="healthicons:electricity-outline" width="40" />
						<p class="text-sm">24/7 Power Supply</p>
					</div>
				{/if}
				{#if apartment.wifi}
					<div class="flex items-center space-x-5">
						<iconify-icon icon="ant-design:wifi-outlined" width="40" />
						<p class="text-sm">Free Wifi</p>
					</div>
				{/if}
				{#if apartment.air_condition}
					<div class="flex items-center space-x-5">
						<iconify-icon icon="iconoir:air-conditioner" width="40" />
						<p class="text-sm">Air Conditioning</p>
					</div>
				{/if}
				{#if apartment.cleaning}
					<div class="flex items-center space-x-5">
						<iconify-icon icon="arcticons:leon-urlcleaner" width="40" />
						<p class="text-sm">House Keeping</p>
					</div>
				{/if}
				{#if apartment.security}
					<div class="flex items-center space-x-5">
						<iconify-icon icon="arcticons:security" width="40" />
						<p class="text-sm">24/7 Security</p>
					</div>
				{/if}
				{#if apartment.netflix}
					<div class="flex items-center space-x-5">
						<iconify-icon icon="arcticons:netflix" width="40" />
						<p class="text-sm">Netflix</p>
					</div>
				{/if}
			</div>
		</div>
		{#if apartment.additional_amenities}
			<div class="section">
				<h3 class="section-title">Additional Amenities</h3>
				<div class="flex space-x-3">
					{#each apartment.additional_amenities as amenity}
						<p>{amenity}</p>
					{/each}
				</div>
			</div>
		{/if}

		<div class="section">
			<h3 class="section-title">Photos</h3>
			<div class="grid md:grid-cols-4 grid-cols-2 gap-5 mt-5">
				{#each apartment.images as photo}
					<div style="object-position: center; aspect-ratio: 16/12;" class="relative photo-wrapper">
						<div class="overlay" />
						<img
							src={photo.url}
							alt=""
							class="object-cover w-full h-full hover:scale-110 relative photo"
						/>
					</div>
				{/each}
			</div>
		</div>

		{#if relatedApartments.length}
			<div class="section">
				<h3 class="section-title">Related Apartments</h3>
				<div class="grid md:grid-cols-3 gap-5 mt-5">
					{#each relatedApartments as apartment}
						<div class="shadow rounded">
							<a href={getApartmentUrl(apartment)}>
								<div class="relative rounded-t photo-wrapper" style="aspect-ratio: 16/12;">
									<div class="overlay" />
									<div
										class="badge md:text-xs absolute md:right-2 right-5 z-50 md:top-2 top-5 bg-black"
									>
										{apartment.location}
									</div>
									<img
										src={getDefaultImage(apartment.images)}
										alt=""
										class="object-cover w-full h-full hover:scale-110 relative photo"
									/>
								</div>
							</a>
							<div class="p-2 mt-5">
								<a href={getApartmentUrl(apartment)}>
									<h3 class="md:text-xl font-serif text-2xl hover:text-[#a79a86]">
										{apartment.title}
									</h3>
								</a>
								<p class="font-serif">{formatPrice(apartment.price)}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.section-title {
		font-family: 'Amiri', serif;
		font-size: 2rem;
		font-weight: 500;
	}

	.section {
		margin-top: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid #000;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		z-index: 1;
	}

	.photo {
		transition: all 0.3s ease-in-out;
	}

	.photo-wrapper {
		overflow: hidden;
	}

	.photo-wrapper:hover .photo {
		transform: scale(1.1);
	}

	.location-icon {
		font-size: 24px;
		color: #000;
	}

	.amenities-icon {
		font-size: 40px;
	}

	@media (max-width: 768px) {
		.location-icon {
			font-size: 18px;
		}

		.amenities-icon {
			font-size: 30px;
		}

		.section-title {
			font-size: 1.5rem;
			font-weight: 600;
		}
	}
</style>
