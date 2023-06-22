<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-row h-screen justify-center">
	<div class="my-auto flex-col justify-center align-middle">
		<p class="text-3xl font-bold h1 mb-16">Welcome {capitalize(data.user?.username)}!</p>
		<form action="?/logout" method="POST" use:enhance>
			<button type="submit" class="btn variant-glass-secondary mx-auto">Logout</button>
		</form>
	</div>
</div>
