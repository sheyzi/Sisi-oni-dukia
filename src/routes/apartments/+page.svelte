<script lang="ts">
	import ApartmentGrid from '$lib/components/ApartmentGrid.svelte';
	import supabase from '../../lib/supabase';

	export let data: any;

	let { apartments } = data;

	let location: string = '';
	let min_price: number;
	let max_price: number;
	let rooms: number;
	let loading = false;

	const filter = async () => {
		console.log(rooms);
		loading = true;

		// Conditionally add filters to the query
		let response = supabase.from('apartments').select('*, images(*)');

		if (location) {
			response = response.textSearch('location', location);
		}

		if (min_price) {
			response = response.gte('price', min_price);
		}

		if (max_price) {
			response = response.lte('price', max_price);
		}

		if (rooms) {
			response = response.eq('bedrooms', rooms);
		}

		const { data } = await response.order('price', { ascending: true });

		apartments = data;

		loading = false;
	};
</script>

<header class="header">
	<div class="overlay" />
	<div class="header-content max-w-5xl mx-auto px-10 ">
		<h2 class="header-title font-serif">Feeling cool like your favorite place</h2>
	</div>

	<div class="header-filter bg-white px-5 md:space-y-5 py-5 items-end">
		<h3 class="font-serif text-3xl text-center">Maximize your search</h3>
		<div class="header-filter-content">
			<div class="form-control">
				<input
					id="rooms"
					type="number"
					bind:value={rooms}
					class="filter-input"
					placeholder="No of Rooms"
				/>
			</div>
			<div class="form-control">
				<input type="text" bind:value={location} class="filter-input" placeholder="Location" />
			</div>
			<div class="form-control">
				<input type="number" bind:value={min_price} class="filter-input" placeholder="Min Price" />
			</div>
			<div class="form-control">
				<input type="number" bind:value={max_price} class="filter-input" placeholder="Max Price" />
			</div>
			<button on:click={filter} class="filter-button">Search</button>
		</div>
	</div>
</header>

<div class="max-w-5xl mx-auto md:px-10 px-5">
	<section class="py-16">
		{#if loading}
			<div class="flex mt-20 justify-center">
				<iconify-icon icon="eos-icons:bubble-loading" width="50" style="color: #A79A86;" />
			</div>
		{:else}
			<ApartmentGrid {apartments} />
		{/if}
	</section>
</div>

<style>
	.header {
		background: url('https://rplpttxffjajeysdeidt.supabase.co/storage/v1/object/public/public/spacejoy-q3Qd86sfaoU-unsplash.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		height: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.header-content {
		position: relative;
		z-index: 1;
	}

	.header-title {
		color: white;
		font-size: 4rem;
		text-align: center;
		font-weight: 500;
	}

	.header-filter {
		position: absolute;
		bottom: -40px;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.header-filter-content {
		display: flex;
	}

	.overlay {
		background: rgba(0, 0, 0, 0.4);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.form-control {
	}

	.filter-input {
		border: none;
		border: 1px solid #ccc;
		padding: 10px;
		width: 200px;
		border-radius: 5px;
		margin-right: 10px;
	}

	.filter-input:focus {
		outline: none;
		border: 1px solid #a79a86;
	}

	.filter-button {
		background: #a79a86;
		color: white;
		border: none;
		padding: 12px 20px;
		border-radius: 5px;
		margin-right: 10px;
		transition: all 0.3s ease-in-out;
	}

	.filter-button:hover {
		transform: scale(0.9);
	}

	@media (max-width: 768px) {
		.header-filter {
			width: 90vw;
			bottom: -60px;
		}

		.header-title {
			font-size: 2rem;
		}

		.header-filter-content {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 10px;
		}

		.header-filter h3 {
			display: none;
		}

		.filter-input {
			width: 100%;
		}

		.filter-button {
			padding: 10px 15px;
			grid-column: span 2;
			margin: 0;
			width: 100%;
		}
	}
</style>
