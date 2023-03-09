<script lang="ts">
	import supabase from '$lib/supabase';
	import { onMount } from 'svelte';
	import type { HomePage } from '$lib/types/homepage.type';
	import { showToastr } from '../../../lib/utils/helpers';

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
		console.log(homepage);
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
				<div class="mt-10 shadow-xl p-10 rounded">
					<div class="form-header">
						<h2 class="text-xl font-bold">Hero Section</h2>
						<p class="mt-3">
							This is the section that appears at the top of the homepage. It contains a title, a
							description, and an image.
						</p>
					</div>
					<div class="space-y-5 mt-5">
						<div>
							<label for="hero_title" class="block text-sm font-medium text-gray-700">
								Hero Title
							</label>
							<div class="mt-1">
								<input
									type="text"
									name="hero_title"
									id="hero_title"
									class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									bind:value={homepage.hero_title}
								/>
							</div>
						</div>

						<div>
							<label for="hero_image" class="block text-sm font-medium text-gray-700">
								Hero Image
							</label>
							<div class="mt-1">
								<input
									type="text"
									name="hero_image"
									id="hero_image"
									class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									bind:value={homepage.hero_image}
								/>
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
									rows="3"
									class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									bind:value={homepage.hero_description}
								/>
							</div>
						</div>
					</div>
				</div>

				<!-- About Section -->
				<div class="mt-10 shadow-2xl p-10">
					<div class="form-header p-8 bg-indigo-500 rounded-t-lg">
						<!-- bg-indigo-500 -->
						<h2 class="text-5xl text-white font-bold">About Section</h2>
						<p class=" text-white text-l	mt-3">
							This is the section that appears at the about section. It contains a title, a
							description, and an image.
						</p>
					</div>
					<div class="space-y-5 mt-5">
						<div>
							<label for="hero_title" class="block text-sm font-medium text-gray-700">
								Hero Title
							</label>
							<div class="mt-1">
								<input
									type="text"
									name="hero_title"
									id="hero_title"
									class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									bind:value={homepage.hero_title}
								/>
							</div>
						</div>

						<div>
							<label for="hero_image" class="block text-sm font-medium text-gray-700">
								Hero Image
							</label>
							<div class="mt-1">
								<input
									type="text"
									name="about_image"
									id="about_image"
									class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									bind:value={homepage.about_image}
								/>
								<p class="mt-2 text-sm text-gray-500">
									Enter the URL of the image you want to use for the hero section. The recommended
									image size is at least 1920px wide and 1080px tall.
								</p>
							</div>
						</div>

						<div>
							<label for="hero_description" class="block text-sm font-medium text-gray-700">
								About Description
							</label>
							<div class="mt-1">
								<textarea
									id="hero_description"
									name="hero_description"
									rows="3"
									class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									bind:value={homepage.about_text}
								/>
							</div>
						</div>
					</div>
				</div>
			</form>
		{/if}
	</div>
</div>
