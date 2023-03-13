<script lang="ts">
	import { goto } from '$app/navigation';
	import Selector from '$lib/components/admin/Selector.svelte';
	import supabase from '$lib/supabase';
	import { sanitizeData, showToastr } from '$lib/utils/helpers';
	import { z } from 'zod';
	import { schema } from './schema';
	import slugify from 'slugify';

	let values: any = {
		power_supply: true,
		wifi: true,
		air_condition: true,
		cleaning: true,
		security: true,
		netflix: true,
		additional_amenities: [],
		images: []
	};
	let errors: any = {};
	let loading = false;

	const addImagesToApartment = async (url: string, id: string, def: boolean) => {
		console.log(id);
		const { data, error } = await supabase.from('images').insert({
			apartment: id,
			url,
			default: def
		});

		if (error) {
			showToastr('There was an error linking the images to the apartment', 'error');
			throw error;
		}

		return data;
	};

	const createApartment = async () => {
		loading = true;
		errors = {};
		try {
			const result = schema.parse(sanitizeData(values));

			const images = values.images;

			const toSend = {
				...values,
				slug: slugify(values.title)
			};

			delete toSend.images;

			const { data, error } = await supabase.from('apartments').insert(toSend).select('*');

			if (error) {
				showToastr('There was an error adding the apartment', 'error');
				console.log(error.message);
				throw error;
			}

			images.forEach(async (image: any, index: number) => {
				await addImagesToApartment(image, data[0].id, index === 0);
			});

			showToastr('Apartment added successfully', 'success');
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
		if (e.detail.value) {
			values.additional_amenities.push(e.detail.value);
			return;
		}
		values.additional_amenities.push(e.detail);
	};

	const handleAddImages = (e: CustomEvent) => {
		if (e.detail.value) {
			values.additional_amenities.push(e.detail.value);
			return;
		}
		values.images.push(e.detail);
	};

	const handleRemoveAmenities = (e: CustomEvent) => {
		values.additional_amenities = values.additional_amenities.filter((i: string) => i !== e.detail);
	};

	const handleRemoveImages = (e: CustomEvent) => {
		values.images = values.images.filter((i: string) => i !== e.detail);
	};
</script>

<svelte:head>
	<title>Add new apartment - Admin</title>
</svelte:head>

<div>
	<h2 class="text-3xl font-semibold">Add a new apartment</h2>

	<form class="mt-5" on:submit|preventDefault={createApartment}>
		<div class="form-control">
			<label for="title" class="my_label">Title</label>
			<input type="text" class="my_input" id="title" bind:value={values.title} />
			{#if errors.title}
				<p class="field-error">{errors.title}</p>
			{/if}
		</div>

		<div class="form-control">
			<label for="price" class="my_label">Price</label>
			<input type="number" class="my_input" id="price" bind:value={values.price} />
			{#if errors.price}
				<p class="field-error">{errors.price}</p>
			{/if}
		</div>

		<div class="form-control">
			<label for="location" class="my_label">Location</label>
			<input type="text" class="my_input" id="location" bind:value={values.location} />
			{#if errors.location}
				<p class="field-error">{errors.location}</p>
			{/if}
		</div>

		<div class="form-control">
			<label for="description" class="my_label">Description</label>

			<textarea class="my_input" id="" bind:value={values.description} rows="10" />
			{#if errors.description}
				<p class="field-error">{errors.description}</p>
			{/if}
		</div>

		<div class="form-control">
			<label for="bedrooms" class="my_label">Bedrooms</label>
			<input type="number" class="my_input" id="bedrooms" bind:value={values.bedrooms} />
			{#if errors.bedrooms}
				<p class="field-error">{errors.bedrooms}</p>
			{:else}
				<p class="field-helper">Number of available bedrooms</p>
			{/if}
		</div>

		<div class="form-control">
			<label for="guests" class="my_label">Guests</label>
			<input type="number" class="my_input" id="guests" bind:value={values.guests} />
			{#if errors.guests}
				<p class="field-error">{errors.guests}</p>
			{:else}
				<p class="field-helper">Number of allowed guests</p>
			{/if}
		</div>

		<div class="form-control">
			<label for="beds" class="my_label">Beds</label>
			<input type="number" class="my_input" id="beds" bind:value={values.beds} />
			{#if errors.beds}
				<p class="field-error">{errors.beds}</p>
			{:else}
				<p class="field-helper">Number of available beds</p>
			{/if}
		</div>

		<div class="form-control">
			<label for="bathrooms" class="my_label">Bathrooms</label>
			<input type="number" class="my_input" id="bathrooms" bind:value={values.bathrooms} />
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
					bind:checked={values.isFeatured}
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
							bind:checked={values.power_supply}
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
							bind:checked={values.wifi}
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
							bind:checked={values.air_condition}
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
							bind:checked={values.cleaning}
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
							bind:checked={values.security}
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
							bind:checked={values.netflix}
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
			/>
			{#if errors.additional_amenities}
				{errors.additional_amenities}
			{/if}
		</div>

		<div class="form-control mt-5">
			<Selector
				name="Images"
				selectMultiple={true}
				maxSelectable={5}
				placeholder="Images"
				options={[]}
				addUnavailable={true}
				on:selected={handleAddImages}
				on:remove={handleRemoveImages}
			/>
			{#if errors.images}
				<p class="field-error">{errors.images}</p>
			{:else}
				<p class="field-helper">Paste the url of the images</p>
			{/if}
		</div>

		<div class="form-control">
			<button class="btn">Create</button>
		</div>
	</form>
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
