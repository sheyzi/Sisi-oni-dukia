<script lang="ts">
	export let instagram_url: string;
	export let twitter_url: string;
	export let email: string;
</script>

<footer class="md:py-10 py-5 block   footer bg-black text-white">
	<div
		class="flex justify-between md:px-10 px-5 max-w-5xl mx-auto items-center flex-col md:flex-row w-full"
	>
		<div class="text-center">
			<a
				href="/"
				class="text-[#A79A86] w-full items-center font-serif md:text-3xl text-2xl font-semibold md:space-x-2"
			>
				<p class="text-center ">Sisi Oni Dukia</p>
			</a>

			<a class="my-4 flex space-x-2 items-center" href="mailto:{email}">
				<iconify-icon icon="ic:round-mail-outline" width="20" />
				<p class="m-0 p-0">{email}</p>
			</a>
		</div>
		<div>
			<div class="flex space-x-5 justify-center md:justify-start">
				<a class="my-4 flex  items-center" href={instagram_url}>
					<iconify-icon icon="mdi:instagram" width="20" />
				</a>
				<a class="my-4 flex items-center" href={twitter_url}>
					<iconify-icon icon="ph:twitter-logo-fill" width="20" />
				</a>
			</div>

			<div class="flex space-x-5">
				<a class="my-4 flex space-x-2 items-center" href="/"> Home </a>
				<a class="my-4 flex space-x-2 items-center" href="/"> About </a>
				<a class="my-4 flex space-x-2 items-center" href="/"> Apartments </a>
				<a class="my-4 flex space-x-2 items-center" href="/"> Contact </a>
			</div>
		</div>
	</div>

	<div class="border-t block w-full text-center mt-5 p-2">© 2023 Sisi Oni Dukia</div>
</footer>
