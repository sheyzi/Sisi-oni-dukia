<script lang="ts">
	export let image: string;
</script>

<label for={image} class="bg-primary text-white px-3 py-2 h-full text-sm rounded cursor-pointer"
	>Preview</label
>

<!-- Put this part before </body> tag -->
<input type="checkbox" id={image} class="modal-toggle " />
<div class="modal">
	<div class="modal-box relative">
		<label for={image} class="btn btn-sm btn-circle bg-primary absolute top-2 right-2 ">✕</label>

		<img src={image} alt="" class="w-full rounded" />
	</div>
</div>
