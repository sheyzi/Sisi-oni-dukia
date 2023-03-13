<script lang="ts">
	import { signInWithEmail } from './logic';
	import { loginSchema } from './schema';
	import { z } from 'zod';
	import { sanitizeData } from '$lib/utils/helpers';
	import { goto } from '$app/navigation';

	let data: any = {};
	let errors: any = {};
	let loading = false;

	export const login = async () => {
		loading = true;
		errors = {};
		try {
			await loginSchema.parse(sanitizeData(data));
			const result = await signInWithEmail(data);
			await goto('/admin');
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
	<title>Admin - Login</title>
</svelte:head>

<div class="w-[80%] max-w-[480px]">
	<h1 class="text-2xl font-bold md:text-center mb-5">Sisi Oni Dukia</h1>
	<form on:submit|preventDefault={login} class="mt-10">
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
			<a class="form-link" href="/admin/forgot-password">Forgot password?</a>
		</div>
		<div class="form-control">
			<button class="btn ">
				{#if loading} <iconify-icon icon="eos-icons:bubble-loading" width="24" />{:else} Login {/if}
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

	.form-link {
		text-align: right;
		font-size: small;
	}

	.form-link:hover {
		color: #7b7162;
	}
</style>
