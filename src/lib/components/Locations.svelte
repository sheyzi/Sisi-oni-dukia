<section class="md:py-10 py-5 max-w-5xl mx-auto md:px-10 px-5 locations">
	<div>
		<h2 class="text-black font-serif text-4xl text-center">Some Of Our Locations</h2>
		<p class="text-center mt-5">
			Take a look at some pretty pictures captured in and around Various Shortlets.
		</p>
		<div class="accordion mt-5">
			<a href="/apartments" class="image default">
				<div class="overlay"><p>Lekki Phase 1</p></div>
				<img
					src="https://www.tobitemplehomes.com/wp-content/uploads/2022/08/IMG-20220813-WA0054.jpg"
					alt=""
				/>
			</a>
			<a href="/apartments" class="image">
				<div class="overlay"><p>Lekki Phase 1</p></div>
				<img
					src="https://www.tobitemplehomes.com/wp-content/uploads/2022/08/insta529928-___CeInxUEunB9___-2.jpg"
					alt=""
				/>
			</a>
			<a href="/apartments" class="image">
				<div class="overlay"><p>Lekki Phase 1</p></div>
				<img
					src="https://www.tobitemplehomes.com/wp-content/uploads/2022/08/insta335793-___CXEDH0hovRa___-6.jpg"
					alt=""
				/>
			</a>
			<a href="/apartments" class="image">
				<div class="overlay"><p>Lekki Phase 1</p></div>
				<img
					src="https://www.tobitemplehomes.com/wp-content/uploads/2022/08/insta350638-___CbvKN7oguhZ___-1.jpg"
					alt=""
				/>
			</a>
		</div>
	</div>
</section>

<style>
	.accordion {
		display: flex;
		height: 600px;
	}

	.image {
		flex: 1;
		transition: flex 0.5s;
	}

	.image.default {
		flex: 3 1 0%;
	}

	.image img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	.image:hover {
		flex: 3 1 0%;
	}

	.overlay {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
		font-family: 'Amiri', serif;
		font-size: 2rem;
		background-color: rgba(0, 0, 0, 0.2);
		background-blend-mode: multiply;
	}

	.overlay p {
		transition: all 0.5s ease;
		transform: translateY(-100%);
		opacity: 0;
	}

	.image:hover .overlay,
	.image.default .overlay {
		background-color: rgba(0, 0, 0, 0.3);
	}

	.image:hover .overlay p,
	.image.default .overlay p {
		opacity: 1;
		transform: translateY(0);
	}

	@media (max-width: 768px) {
		.accordion {
			flex-direction: column;
			height: 100%;
			gap: 16px;
		}

		.image {
			height: 50%;
			border-radius: 5px;
		}

		.image img {
			border-radius: 5px;
		}

		.image.default {
			flex: 1 1 0%;
		}

		.image:hover {
			flex: 1 1 0%;
		}

		.image .overlay,
		.image.default .overlay {
			background-color: rgba(0, 0, 0, 0.3);
		}

		.image .overlay p,
		.image.default .overlay p {
			opacity: 1;
			transform: translateY(0);
		}

		.image img {
			height: 100%;
			width: 100%;
			object-fit: cover;
			aspect-ratio: 12/9;
		}
	}
</style>
