<script lang="ts">
	import { Heart, Loader2 } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toastStore } from '@skeletonlabs/skeleton';
	export let post: BlogPost;

	$: isLoading = false;
	const likePost: SubmitFunction = (input) => {
		isLoading = true;
		return async (options) => {
			if (options.result.status !== 200) {
				toastStore.trigger({
					// @ts-ignore
					message: options.result.data.error,
					timeout: 5000,
					background: 'variant-glass-error'
				});
			} else {
				toastStore.trigger({
					// @ts-ignore
					message: options.result.data.message,
					timeout: 5000,
					background: 'variant-glass-success'
				});
			}
			isLoading = false;
			await options.update();
		};
	};
</script>

<div class="flex border-e border-gray-500/50 px-2">
	<span class="hidden">
		{#if post.liked}
			<style>
				.lucide-heart {
					fill: rgb(var(--color-secondary-500));
					--tw-text-opacity: 1;
					color: rgb(var(--color-secondary-500) / var(--tw-text-opacity));
				}
			</style>
		{/if}
	</span>
	<form method="POST" action="?/like" use:enhance={likePost}>
		<button type="submit" class="flex">
			{#if isLoading}
				<Loader2 class="animate-spin" />
			{:else}
				<Heart stroke-width="1.25" size="16px" />
			{/if}
			<p class="ps-1 text-sm leading-4">
				{post.like_count}
			</p>
		</button>
	</form>
</div>
