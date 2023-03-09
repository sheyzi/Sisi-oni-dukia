<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { showToastr } from '../../lib/utils/helpers';

	onMount(async () => {
		const message = $page.url.searchParams.get('message');
		const type = $page.url.searchParams.get('type');

		if (message) {
			showToastr(message, type);
		}
	});
</script>

<Toaster />
<slot />
