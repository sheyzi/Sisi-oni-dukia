<svelte:head>
	<title>Your next door realtor</title>
</svelte:head>

<main class="max-w-[1200px] mx-auto flex-grow">
	<div class="md:px-10 md:my-20 mt-10 flex md:flex-row flex-col-reverse items-center">
		<div class=" relative">
			<div class="md:px-0 px-10">
				<div class="hero-title">
					<h1 class="text-primary md:text-[30px] text-[22px] md:text-left text-center z-50">
						Your next door realtor is here to handle all your real estate business.
					</h1>
				</div>
				<div
					class="absolute md:w-[8rem] w-[4rem] h-[2.1875rem] top-2 left-20 z-[-1] clear-both bg-[#FAFE4B] md:p-5 py-1 px-5 md:top-7 md:left-5"
				/>
			</div>
			<div
				class=" px-10 md:px-0 md:py-0 py-10 md:my-10 mt-5 text-[#474747] md:bg-white bg-[#F9F9F9]"
			>
				<ul
					class="md:text-[1.526rem] space-y-5 text-lg md:text-[#333] text-[#3799DD] md:text-left text-center"
				>
					<li>Want to buy a house or a land?</li>
					<li>Want to rent a shortlet serviced apartment?</li>
					<li>Do you have shortlet apartments? List with us.</li>
				</ul>
			</div>
		</div>
		<div class="mb-10 md:px-0 px-10 md:my-0">
			<img src="bg-house.png" width="787px" alt="House with blue elipse bg" />
		</div>
	</div>
</main>

<style>
	@media (min-width: 768px) {
		ul {
			list-style-image: url('list-point.png');
		}
	}
</style>
