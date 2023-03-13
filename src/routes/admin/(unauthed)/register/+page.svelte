<script lang="ts">
	import { z } from 'zod';
	import { sanitizeData } from '$lib/utils/helpers';
	import { registerSchema } from './schema';
	import { signUp } from './logic';
	import { goto } from '$app/navigation';

	let data: any = {};
	let loading = false;
	let errors: any = {};

	const register = async () => {
		loading = true;
		errors = {};

		try {
			registerSchema.parse(sanitizeData(data));
			await signUp(data);
			await goto('/admin/register/success');
		} catch (err: any) {
			if (err instanceof z.ZodError) {
				errors = err.flatten().fieldErrors;
				return;
			}

			errors.server = err.message;
		} finally {
			loading = false;
		}
	};
</script>

<svelte:head>
	<title>Complete admin setup</title>
</svelte:head>

<div class="w-[80%] max-w-[480px]">
	<h1 class="text-2xl font-bold md:text-center">Create admin account</h1>
	<p class="text-sm mt-3">
		You are about to create the first admin account. This account will have full access to the
		application.
	</p>
	<form class="mt-5" on:submit|preventDefault={register}>
		{#if errors.server}
			<p class="mb-5 text-sm p-2 rounded-sm bg-red-300 font-bold text-red-900">{errors.server}</p>
		{/if}
		<div class="form-control">
			<label for="email" class="form-label">Email</label>
			<input
				type="text"
				class="input input-bordered"
				bind:value={data.email}
				placeholder="Enter your email"
			/>
			{#if errors.email} <p class="text-sm text-red-500">{errors.email}</p> {/if}
		</div>
		<div class="form-control">
			<label for="email" class="form-label">Password</label>
			<input
				type="password"
				class="input input-bordered"
				bind:value={data.password}
				placeholder="Enter your password"
			/>
			{#if errors.password} <p class="text-sm text-red-500">{errors.password}</p> {/if}
		</div>
		<div class="form-control">
			<button class="btn ">
				{#if loading}
					<iconify-icon icon="eos-icons:bubble-loading" width="24" />{:else}
					Create account
				{/if}
			</button>
		</div>
	</form>
</div>

<style>
	.form-control {
		margin-bottom: 1rem;
	}

	.form-label {
		margin-bottom: 5px;
	}
	.form-label::after {
		content: ':';
	}

	.input {
		border-radius: 0px;
	}

	.btn {
		background-color: #000;
		border: none;
		border-radius: 0px;
	}
</style>
