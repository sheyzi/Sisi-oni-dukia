<script lang="ts">
	import { goto } from '$app/navigation';
	import Selector from '$lib/components/admin/Selector.svelte';
	import supabase from '$lib/supabase';
	import { sanitizeData, showToastr } from '$lib/utils/helpers';
	import { z } from 'zod';
	import { schema } from './schema';
	import slugify from 'slugify';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import NavigationLoader from '$lib/components/NavigationLoader.svelte';
	import type { Apartment } from '$lib/types/apartment.type';

	let apartment: Apartment;
	let errors: any = {};
	let loading = false;

	const updateApartment = async () => {
		loading = true;
		errors = {};
		try {
			schema.parse(sanitizeData(apartment));

			const { data, error } = await supabase
				.from('apartments')
				.update(apartment)
				.eq('id', apartment.id);

			if (error) {
				showToastr('There was an error updating the apartment', 'error');
				console.log(error.message);
				throw error;
			}

			showToastr('Apartment updated successfully', 'success');
			await goto('/admin/apartments');
		} catch (error) {
			if (error instanceof z.ZodError) {
				errors = error.flatten().fieldErrors;
			}
		} finally {
			loading = false;
		}
	};

	const handleAddAmenities = (e: CustomEvent) => {
		if (!apartment.additional_amenities) {
			apartment.additional_amenities = [];
		}
		if (e.detail.value) {
			apartment.additional_amenities.push(e.detail.value);
			return;
		}
		apartment.additional_amenities.push(e.detail);
	};

	const handleRemoveAmenities = (e: CustomEvent) => {
		apartment.additional_amenities = apartment.additional_amenities.filter(
			(i: string) => i !== e.detail
		);
	};

	let apartmentLoading = false;

	const fetchApartment = async () => {
		apartmentLoading = true;
		const { data, error } = await supabase
			.from('apartments')
			.select('*')
			.eq('slug', $page.params.slug)
			.single();

		if (error) {
			showToastr("Couldn't fetch apartment", 'error');
			console.log(error);
			apartmentLoading = false;
			return;
		}

		apartment = data;
		apartmentLoading = false;
	};

	onMount(async () => {
		await fetchApartment();
	});
</script>

<svelte:head>
	<title>Edit apartment - Admin</title>
</svelte:head>

<div class="mb-10">
	{#if apartment}
		<h2 class="text-3xl font-semibold">Edit {apartment.title}</h2>
		<form class="mt-5" on:submit|preventDefault={updateApartment}>
			<div class="form-control">
				<label for="title" class="my_label">Title</label>
				<input type="text" class="my_input" id="title" bind:value={apartment.title} />
				{#if errors.title}
					<p class="field-error">{errors.title}</p>
				{/if}
			</div>

			<div class="form-control">
				<label for="price" class="my_label">Price</label>
				<input type="number" class="my_input" id="price" bind:value={apartment.price} />
				{#if errors.price}
					<p class="field-error">{errors.price}</p>
				{/if}
			</div>

			<div class="form-control">
				<label for="location" class="my_label">Location</label>
				<input type="text" class="my_input" id="location" bind:value={apartment.location} />
				{#if errors.location}
					<p class="field-error">{errors.location}</p>
				{/if}
			</div>

			<div class="form-control">
				<label for="description" class="my_label">Description</label>

				<textarea class="my_input" id="" bind:value={apartment.description} rows="10" />
				{#if errors.description}
					<p class="field-error">{errors.description}</p>
				{/if}
			</div>

			<div class="form-control">
				<label for="bedrooms" class="my_label">Bedrooms</label>
				<input type="number" class="my_input" id="bedrooms" bind:value={apartment.bedrooms} />
				{#if errors.bedrooms}
					<p class="field-error">{errors.bedrooms}</p>
				{:else}
					<p class="field-helper">Number of available bedrooms</p>
				{/if}
			</div>

			<div class="form-control">
				<label for="guests" class="my_label">Guests</label>
				<input type="number" class="my_input" id="guests" bind:value={apartment.guests} />
				{#if errors.guests}
					<p class="field-error">{errors.guests}</p>
				{:else}
					<p class="field-helper">Number of allowed guests</p>
				{/if}
			</div>

			<div class="form-control">
				<label for="beds" class="my_label">Beds</label>
				<input type="number" class="my_input" id="beds" bind:value={apartment.beds} />
				{#if errors.beds}
					<p class="field-error">{errors.beds}</p>
				{:else}
					<p class="field-helper">Number of available beds</p>
				{/if}
			</div>

			<div class="form-control">
				<label for="bathrooms" class="my_label">Bathrooms</label>
				<input type="number" class="my_input" id="bathrooms" bind:value={apartment.bathrooms} />
				{#if errors.bathrooms}
					<p class="field-error">{errors.bathrooms}</p>
				{:else}
					<p class="field-helper">Number of available bathrooms</p>
				{/if}
			</div>

			<div class=" form-control">
				<div class="image_input_group">
					<label for="isFeatured" class="font-semibold">Is Featured</label>
					<input
						type="checkbox"
						id="isFeatured"
						bind:checked={apartment.isFeatured}
						class="toggle toggle-sm toggle-primary "
					/>
				</div>
				<p class="field-helper">If selected the apartment will appear in the featured section</p>
			</div>
			<div class="mt-5">
				<h3 class="text-lg font-medium">Amenities</h3>
				<div class="flex gap-5 flex-wrap mt-5">
					<div class=" form-control">
						<div class="image_input_group">
							<label for="power_supply" class="text-sm">24/7 Power supply</label>
							<input
								type="checkbox"
								id="power_supply"
								bind:checked={apartment.power_supply}
								class="toggle toggle-sm toggle-primary"
							/>
						</div>
					</div>

					<div class=" form-control">
						<div class="image_input_group">
							<label for="wifi" class="text-sm">Free Wifi</label>
							<input
								type="checkbox"
								id="wifi"
								bind:checked={apartment.wifi}
								class="toggle toggle-sm toggle-primary"
							/>
						</div>
					</div>

					<div class=" form-control">
						<div class="image_input_group">
							<label for="air_condition" class="text-sm">Air Conditioning</label>
							<input
								type="checkbox"
								id="air_condition"
								bind:checked={apartment.air_condition}
								class="toggle toggle-sm toggle-primary"
							/>
						</div>
					</div>

					<div class=" form-control">
						<div class="image_input_group">
							<label for="cleaning" class="text-sm">House Keeping</label>
							<input
								type="checkbox"
								id="cleaning"
								bind:checked={apartment.cleaning}
								class="toggle toggle-sm toggle-primary"
							/>
						</div>
					</div>

					<div class=" form-control">
						<div class="image_input_group">
							<label for="security" class="text-sm">24/7 Security</label>
							<input
								type="checkbox"
								id="security"
								bind:checked={apartment.security}
								class="toggle toggle-sm toggle-primary"
							/>
						</div>
					</div>

					<div class=" form-control">
						<div class="image_input_group">
							<label for="netflix" class="text-sm">Netflix</label>
							<input
								type="checkbox"
								id="netflix"
								bind:checked={apartment.netflix}
								class="toggle toggle-sm toggle-primary"
							/>
						</div>
					</div>
				</div>
			</div>

			<div class="form-control mt-5">
				<Selector
					name="Additional amenities"
					selectMultiple={true}
					maxSelectable={30}
					placeholder="Additional amenities"
					options={[
						{
							label: 'Swimming Pool',
							value: 'Swimming Pool'
						}
					]}
					addUnavailable={true}
					on:selected={handleAddAmenities}
					on:remove={handleRemoveAmenities}
					selectedArray={apartment.additional_amenities || []}
				/>
				{#if errors.additional_amenities}
					{errors.additional_amenities}
				{/if}
			</div>

			<div class="form-control">
				<button class="btn"
					>{#if loading}
						<iconify-icon icon="eos-icons:bubble-loading" width="20" />
					{:else}
						Update
					{/if}</button
				>
			</div>
		</form>
	{:else if apartment === undefined}
		<div class="flex mt-20 justify-center">
			<iconify-icon icon="eos-icons:bubble-loading" width="50" style="color: #A79A86;" />
		</div>
	{/if}
</div>

<style>
	.form-control {
		margin-bottom: 10px;
	}

	.field-error {
		font-size: small;
		color: red;
	}

	.field-helper {
		font-size: small;
	}
</style>
