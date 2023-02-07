<script lang="ts">
	let menuOpen = false;

	const toggleMenu = () => {
		menuOpen = !menuOpen;
	};
</script>

<div class="bg-black text-white">
	<nav class="max-w-6xl mx-auto md:p-8 p-5 flex items-center justify-between">
		<ul>
			<li>
				<a
					href="/"
					class="text-[#A79A86] flex items-center font-serif md:text-3xl text-2xl font-semibold space-x-2"
				>
					<!-- <iconify-icon inline icon="clarity:dot-circle-line" /> -->
					<p>Sisi Oni Dukia</p>
					<!-- <iconify-icon inline icon="clarity:dot-circle-line" /> -->
				</a>
			</li>
		</ul>

		<div class="md:flex items-center hidden space-x-5 uppercase">
			<a href="/" class="nav-item ">Home</a>
			<a href="/apartments" class="nav-item ">Apartments</a>

			<a href="/about" class="nav-item ">About</a>

			<a href="/contact" class="nav-item ">Contact</a>
		</div>

		<div class="md:hidden">
			<button on:click={toggleMenu} type="button">
				<iconify-icon
					icon="material-symbols:menu"
					height="30"
					class="transition hover:text-[#A79A86] duration-500"
				/>
			</button>
		</div>
	</nav>
	<div class="mobileMenu md:hidden" class:active={menuOpen}>
		<button on:click={toggleMenu}>
			<iconify-icon
				icon="typcn:times"
				height="30"
				class="transition duration-500 hover:text-[#A79A86]"
			/>
		</button>
		<div class="mobile-content">
			<a href="/" class="nav-item">Home</a>

			<a href="/apartments" class="nav-item">Apartments</a>
			<a href="/about" class="nav-item">About</a>

			<a href="/contact" class="nav-item">Contact</a>
		</div>
	</div>
</div>

<style>
	.nav-item {
		color: #fff;
		text-transform: uppercase;
		transition: all 0.3s ease;
		font-size: 0.9rem;
	}

	.nav-item:hover {
		color: #a79a86;
		transform: translateY(-8px);
	}

	.mobileMenu {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.3s ease;
		transform: translateX(-100%);
	}

	.mobileMenu.active {
		transform: translateX(0);
	}

	.mobileMenu button {
		position: absolute;
		top: 20px;
		right: 20px;
	}

	.mobileMenu .mobile-content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.mobileMenu .mobile-content .nav-item {
		font-size: 1.5rem;
		margin: 1rem 0;
	}
</style>
