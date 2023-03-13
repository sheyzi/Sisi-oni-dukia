<script lang="ts">
	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	import type { Apartment } from '$lib/types/apartment.type';
	import { formatPrice } from '../../utils/format';
	import { getAdminApartmentUrl, getDefaultImage, showToastr } from '../../utils/helpers';

	export let apartments: Apartment[];

	const deleteImage = async (id: number) => {
		const { error } = await supabase.from('images').delete().eq('id', id);
		if (error) {
			showToastr(`There was an error deleting this apartment`, 'error');
			return;
		}
	};

	const deleteApartmentNow = async (apartment: Apartment) => {
		const { error } = await supabase.from('apartments').delete().eq('id', apartment.id);
		if (error) {
			showToastr(`There was an error deleting ${apartment.title}`, 'error');
			return;
		}

		apartments = apartments.filter((i) => i.id !== apartment.id);

		showToastr('Apartment deleted successfully', 'success');
	};

	const shouldRunDelete = async (apartment: Apartment) => {
		const { data, error } = await supabase
			.from('apartments')
			.select('*, images(*)')
			.eq('id', apartment.id);

		if (error) {
			console.log(error.message);
			throw error;
		}

		if (data[0].images.length === 0) {
			deleteApartmentNow(apartment);
		}
	};

	const deleteApartment = async (apartment: Apartment) => {
		apartment.images.forEach(async (image) => {
			await deleteImage(image.id);
			await shouldRunDelete(apartment);
		});
	};
</script>

<div class="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5">
	{#each apartments as apartment}
		<div class="card w-full bg-base-100 rounded shadow-sm transition-shadow hover:shadow  mt-10">
			<a href={getAdminApartmentUrl(apartment)}>
				<span class="badge absolute top-5 bg-black text-white right-5 z-10"
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
			<div />
			<div class="my-5 flex gap-2 items-center px-2">
				<a
					href={getAdminApartmentUrl(apartment)}
					class="uppercase text-sm bg-indigo-500 px-2 py-3 text-white rounded text-center flex items-center justify-center gap-2 w-full"
					>View details <iconify-icon icon="material-symbols:edit" /></a
				>
				<a
					href="#my-modal-2"
					class="flex items-center bg-red-500 px-2 py-3 text-sm gap-1 rounded text-white uppercase w-full justify-center	"
					>Delete <iconify-icon icon="uil:trash-alt" /></a
				>
				<div class="modal" id="my-modal-2">
					<div class="modal-box">
						<h3 class="font-bold text-xl">Warning!</h3>
						<p class="py-4">
							Are you sure you want to delete <b>{apartment.title}</b>
						</p>
						<div class="modal-action">
							<a href="#" class="btn rounded bg-indigo-500 border-none">No</a>
							<a href="#">
								<button
									on:click={() => deleteApartment(apartment)}
									class="btn bg-red-500 btn-error text-white border-none rounded">Yes</button
								>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="flex mt-20 justify-center">
			<p class="text-2xl text-center font-serif">No apartments found for your search</p>
		</div>
	{/each}
</div>
