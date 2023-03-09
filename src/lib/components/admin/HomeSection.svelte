<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<div class="mt-10 shadow rounded pb-5">
	<div class="form-header p-5 bg-indigo-500 rounded-t-lg">
		<!-- bg-indigo-500 -->
		<h2 class="text-3xl mb-3 text-white font-bold">{title}</h2>
		<p class=" text-white text-lg">
			{description}
		</p>
	</div>
	<form class="space-y-5 mt-5 px-5">
		<slot />
	</form>
</div>
