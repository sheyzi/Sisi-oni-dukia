<script lang="ts">
	import AdminApartmentGrid from '$lib/components/admin/AdminApartmentGrid.svelte';
	import supabase from '$lib/supabase';
	import type { Apartment } from '$lib/types/apartment.type';
	import { showToastr } from '$lib/utils/helpers';
	import { onMount } from 'svelte';

	let apartments: Apartment[];

	const fetchApartments = async () => {
		const { data, error } = await supabase
			.from('apartments')
			.select('*, images(*)')
			.order('created_at', { ascending: false });

		if (error) {
			showToastr(error.message, 'error');
			return;
		}

		apartments = data;
	};

	onMount(async () => {
		await fetchApartments();
	});
</script>

<svelte:head>
	<title>All Apartments - Admin</title>
</svelte:head>

<div class="flex justify-end">
	<a href="/admin/apartments/add" class="btn bg-indigo-500 btn-primary rounded">Add Apartment</a>
</div>
{#if apartments}
	<AdminApartmentGrid {apartments} />
{:else if apartments === undefined}
	<div class="flex mt-20 justify-center">
		<iconify-icon icon="eos-icons:bubble-loading" width="50" style="color: #A79A86;" />
	</div>
{/if}
