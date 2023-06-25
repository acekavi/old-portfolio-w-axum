<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/utils';
	import type { PageData } from './$types';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { filter, Summer84 } from '@skeletonlabs/skeleton';

	export let data: PageData;
</script>


<div class="flex flex-row h-screen">
	<div class="flex flex-col w-4/5"></div>
	<div class="flex flex-col w-1/5 my-auto">
		<div class="row-span-full">
			<Avatar
				border="border-4 border-surface-300-600-token hover:!border-primary-500"
				cursor="cursor-pointer"
				initials="{data.user.first_name ? data.user.first_name : data.user.username}"+
				class="float-left"
			/>
			<div class="my-auto mt-4">
				<p class="text-xl float-left my-auto ms-8">{capitalize(data.user?.username)}</p>
			</div>
		</div>
		<div class="row-span-full">
			<p class="text-xl float-left my-auto ms-8">{data.user?.email}</p>
		</div>
		<div class="row-span-full">
			<p class="text-xl float-left my-auto ms-8">{data.user?.is_active}</p>

		</div>
		<div class="row-span-full">
			<form action="?/logout" method="POST" use:enhance>
				<button type="submit" class="btn variant-glass-secondary mx-auto">Logout</button>
			</form>
		</div>
	</div>
</div>