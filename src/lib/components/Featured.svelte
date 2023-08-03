<script lang="ts">
	import ApartmentGrid from './ApartmentGrid.svelte';

	export let apartments: any;
</script>

<section class="md:py-10 py-5 max-w-5xl mx-auto px-5 about text-black">
	<div>
		<h2 class="text-center text-4xl font-serif font-medium">Featured Apartments</h2>
		<ApartmentGrid {apartments} />
		<div class="flex justify-center mt-10">
			<a
				href="/apartments"
				class="btn border-[#A79A86] text-[#A79A86] hover:bg-[#A79A86] rounded-none btn-outline "
				>View All Apartments</a
			>
		</div>
	</div>
</section>
