<script lang="ts">
	import supabase from '$lib/supabase';
	import { onMount } from 'svelte';
	import type { HomePage } from '$lib/types/homepage.type';
	import { showToastr } from '../../../lib/utils/helpers';
	import HomeSection from '$lib/components/admin/HomeSection.svelte';
	import ImagePreview from '$lib/components/admin/ImagePreview.svelte';

	let loading = false;

	let homepage: HomePage;

	const fetchHomepage = async () => {
		// delay to simulate loading
		// await new Promise((resolve) => setTimeout(resolve, 5000));
		const { data, error } = await supabase.from('homepage').select('*').single();

		if (error) {
			showToastr(error.message, 'error');
		}

		homepage = data;
	};

	const saveChanges = async () => {
		loading = true;
		try {
			const { error } = await supabase.from('homepage').update(homepage).eq('id', homepage.id);
			if (error) {
				showToastr(error.message, 'error');
			} else {
				showToastr('Changes saved successfully', 'success');
			}
		} finally {
			loading = false;
		}
	};

	onMount(async () => {
		await fetchHomepage();
	});
</script>

<svelte:head>
	<title>Homepage - Admin</title>
</svelte:head>

<div>
	<div>
		<h1 class="text-2xl font-bold">Homepage</h1>
		<p class="mt-3">
			On this page, you can edit the content of the homepage of Sisi Oni Dukia. You can edit the
			content of the hero section, the about section, and so on.
		</p>
	</div>

	<!-- Floating Save Button -->
	<div class="fixed bottom-0 right-0 m-5">
		<button
			type="button"
			class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			on:click={saveChanges}
		>
			{#if loading}
				<iconify-icon icon="eos-icons:bubble-loading" width="20" />
			{:else}
				Save
			{/if}
		</button>
	</div>

	<div class="mt-10">
		{#if !homepage}
			<div class="flex justify-center mt-10">
				<iconify-icon icon="eos-icons:bubble-loading" width="50" />
			</div>
		{:else if homepage}
			<form>
				<!-- Hero Section -->
				<HomeSection
					title="Hero Section"
					description="This is the section that appears at the hero section. It contains a title, a
							description, and an image."
				>
					<div>
						<label for="hero_title" class="block text-sm font-medium text-gray-700">
							Hero Title
						</label>
						<div class="mt-1">
							<input
								type="text"
								name="hero_title"
								id="hero_title"
								class="my_input"
								bind:value={homepage.hero_title}
							/>
						</div>
					</div>

					<div>
						<label for="hero_image" class="block text-sm font-medium text-gray-700">
							Hero Image
						</label>
						<div class="mt-1">
							<div class="image_input_group">
								<input
									type="text"
									name="hero_image"
									id="hero_image"
									class="my_input"
									bind:value={homepage.hero_image}
								/>
								<!-- The button to open modal -->
								<ImagePreview image={homepage.hero_image} />
							</div>

							<p class="mt-2 text-sm text-gray-500">
								Enter the URL of the image you want to use for the hero section. The recommended
								image size is at least 1920px wide and 1080px tall.
							</p>
						</div>
					</div>

					<div>
						<label for="hero_description" class="block text-sm font-medium text-gray-700">
							Hero Description
						</label>
						<div class="mt-1">
							<textarea
								id="hero_description"
								name="hero_description"
								rows="7"
								class="my_input"
								bind:value={homepage.hero_description}
							/>
						</div>
					</div>
				</HomeSection>

				<!-- About Section -->
				<HomeSection
					title="About Section"
					description="This is the section that appears at the about section. It contains a title, a
							description, and an image."
				>
					<div>
						<label for="about_image" class="my_label"> About Image </label>
						<div class="mt-1">
							<div class="image_input_group">
								<input
									type="text"
									name="about_image"
									id="about_image"
									class="my_input"
									bind:value={homepage.about_image}
								/>
								<ImagePreview image={homepage.about_image} />
							</div>
							<p class="mt-2 text-sm text-gray-500">
								Enter the URL of the image you want to use for the about section. The recommended
								image size is at least 1920px wide and 1080px tall.
							</p>
						</div>
					</div>

					<div>
						<label for="about_text" class="my_label"> About Text </label>
						<div class="mt-1">
							<textarea
								id="about_text"
								name="about_text"
								rows="7"
								class="my_input"
								bind:value={homepage.about_text}
							/>
						</div>
					</div>
				</HomeSection>

				<HomeSection
					title="Availability Section"
					description="This is the section that appears at the about section. It contains a title, a description, and an image."
				>
					<div>
						<label for="availability_title" class="my_label">Title</label>
						<input type="text" bind:value={homepage.section1_title} class="my_input" />
					</div>

					<div>
						<label for="section1_image" class="my_label"> Image 1 </label>
						<div class="mt-1">
							<div class="image_input_group">
								<input
									type="text"
									name="section1_image"
									id="section1_image"
									class="my_input"
									bind:value={homepage.section1_image}
								/>
								<ImagePreview image={homepage.section1_image} />
							</div>
							<p class="mt-2 text-sm text-gray-500">
								Enter the URL of the image you want to use for the about section. The recommended
								image size is at least 1080px wide and 1920px tall.
							</p>
						</div>
					</div>

					<div>
						<label for="section1_image_2" class="my_label"> Image 2 </label>
						<div class="mt-1">
							<div class="image_input_group">
								<input
									type="text"
									name="section1_image_2"
									id="section1_image_2"
									class="my_input"
									bind:value={homepage.section1_image_2}
								/>
								<ImagePreview image={homepage.section1_image_2} />
							</div>
							<p class="mt-2 text-sm text-gray-500">
								Enter the URL of the image you want to use for the about section. The recommended
								image size is at least 1920px wide and 1080px tall.
							</p>
						</div>
					</div>

					<div>
						<label for="availability_text" class="my_label"> Text </label>
						<div class="mt-1">
							<textarea
								id="availability_text"
								name="availability_text"
								rows="7"
								class="my_input"
								bind:value={homepage.section1_text}
							/>
						</div>
					</div>
				</HomeSection>

				<HomeSection title="Contact Section" description="You can edit all contact details here">
					<div>
						<label for="ig" class="my_label">Instagram URL</label>
						<input type="text" bind:value={homepage.instagram_url} class="my_input" />
					</div>

					<div>
						<label for="fb" class="my_label">Facebook URL</label>
						<input type="text" bind:value={homepage.facebook_url} class="my_input" />
					</div>

					<div>
						<label for="twitter" class="my_label">Twitter URL</label>
						<input type="text" bind:value={homepage.twitter_url} class="my_input" />
					</div>

					<div>
						<label for="wa_url" class="my_label">Whatsapp URL</label>
						<input type="text" bind:value={homepage.whatsapp_url} class="my_input" />
					</div>

					<div>
						<label for="email" class="my_label">Email</label>
						<input type="email" bind:value={homepage.contact_email} class="my_input" />
					</div>

					<div>
						<label for="wa_no" class="my_label">Whatsapp Number</label>
						<input type="text" bind:value={homepage.whatsapp_number} class="my_input" />
					</div>
				</HomeSection>
			</form>
		{/if}
	</div>
</div>
