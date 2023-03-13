<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { string } from 'zod';

	const dispatch = createEventDispatcher();
	let open = false;

	export let name: string;
	export let selectMultiple: boolean = false;
	export let maxSelectable: number = 5;
	export let addUnavailable: boolean = false;

	function toggle() {
		open = !open;
	}

	type Option = {
		value: string;
		label: string;
	};

	export let placeholder: string;

	let selected: any;
	let selectedArray: any = [];

	function onSelected(option: any) {
		dispatch('selected', option);
		selected = option;

		if (selected !== '') {
			if (selectedArray.length >= 1) {
				if (selectedArray.length < maxSelectable) {
					if (selectedArray.includes(selected.label || selected) === false) {
						selectedArray = [...selectedArray, selected.label || selected];
					}
				}
			} else selectedArray = [selected.label || selected.trim()];
		}

		toggle();
		search = '';
	}
	function removeSelected(e: any) {
		dispatch('remove', e);
		selectedArray = selectedArray.filter((array: string) => array !== `${e}`);
	}

	function addUnavailableChoice(search: string) {
		dispatch('addUnavailable', search);
		selected = search;
		if (selectedArray.length >= 1) {
			if (selectedArray.length < maxSelectable) {
				if (selectedArray.includes(search) === false) {
					selectedArray = [...selectedArray, search];
				}
			}
		} else selectedArray = [selected];
		search = '';
	}

	export let options: Option[];

	let search = '';
</script>

<div class="wrapper">
	<div
		class="bg-white border-b-2  text-base  w-full p-1 flex items-center justify-between  cursor-pointer"
		on:click={toggle}
	>
		<div>
			{#if selectMultiple}
				{#if selected}
					<div class="flex gap-1 flex-wrap w-full">
						{#each selectedArray as selectedArrayElement}
							<p class="p-1 bg-[#f0f0f0] rounded">
								{selectedArrayElement}
								<iconify-icon
									icon="iconoir:cancel"
									on:click={(e) => removeSelected(selectedArrayElement)}
								/>
							</p>
						{/each}
					</div>
				{:else}
					{placeholder}
				{/if}
			{:else if selected}
				{#if selected.label}
					{selected.label.length > 30 ? selected.label.slice(0, 30) + '...' : selected.label}
				{:else}
					{selected.length > 30 ? selected.slice(0, 30) + '...' : selected}
				{/if}
			{:else}
				{placeholder}
			{/if}
		</div>

		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-4 h-4"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
			</svg>
		</div>
	</div>
	{#if open}
		<ul
			in:slide={{ duration: 200 }}
			out:slide={{ duration: 200 }}
			class="bg-white max-h-60 overflow-y-auto border-[#e5e5e5] border text-[14px] text-[#454545] rounded-[5px] mt-2"
		>
			<div class="flex items-center px-2 sticky top-0 bg-white">
				<div class="text-[#1a1a1a]">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-4 h-4"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				</div>

				<div class="flex w-full items-center">
					<input bind:value={search} type="text" {placeholder} class=" p-2 outline-none w-full" />
					{#if addUnavailable}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							class="cursor-pointer"
							viewBox="0 0 24 24"
							on:click={() => onSelected(search)}
							><path
								fill="#a52921"
								d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4v4Zm1 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
							/></svg
						>
					{/if}
				</div>
			</div>
			{#each options as option}
				<li
					class="p-2 text-[14px] hover:bg-primary cursor-pointer hover:bg-primary hover:text-white
					{option.label === selected?.label && 'bg-primary text-white'} {option.label
						.toLowerCase()
						.startsWith(search.toLowerCase())
						? 'block'
						: 'hidden'}"
					on:click={() => onSelected(option)}
					on:keyup={() => onSelected(option)}
				>
					{option.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.wrapper {
		width: 100%;
	}

	@media (max-width: 1200px) {
		.wrapper {
			width: 100%;
		}
	}

	@media (max-width: 768px) {
		.wrapper {
			width: 100%;
		}
	}
</style>
