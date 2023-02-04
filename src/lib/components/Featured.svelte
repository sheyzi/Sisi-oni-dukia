<section class="md:py-10 py-5 max-w-5xl mx-auto px-5 about text-black">
	<div>
		<h2 class="text-center text-4xl font-serif font-medium">Featured Apartments</h2>
		<div class="grid md:grid-cols-3 grid-cols-1 gap-10">
			{#each [1, 2, 3, 4, 5, 6] as _}
				<div
					class="card w-full bg-base-100 rounded shadow transition-shadow hover:shadow-xl border border-gray-400 mt-10"
				>
					<a href="/apartments">
						<span class="badge absolute top-5 bg-black text-white right-5 z-10">Lekki</span>
						<figure>
							<img
								src="https://rplpttxffjajeysdeidt.supabase.co/storage/v1/object/public/public/roberto-nickson-emqnSQwQQDo-unsplash.jpg"
								alt="Shoes"
								class="hover:blur-0 blur-[1px] transition-all duration-500 relative"
							/>
						</figure>
					</a>
					<div class="card-body text-center p-2 ">
						<h3 class="card-title font-normal font-serif text-lg text-center block">
							4 Bedroom Terrace Apartment
						</h3>
						<p class="text-sm">&#8358;95,000 / night</p>
					</div>
					<div class="my-5 flex justify-center">
						<a href="/apartment" class="uppercase text-sm underline text-center">View details</a>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex justify-center mt-10">
			<a
				href="/apartments"
				class="btn border-black text-black hover:bg-black rounded-none btn-outline"
				>View All Apartments</a
			>
		</div>
	</div>
</section>
