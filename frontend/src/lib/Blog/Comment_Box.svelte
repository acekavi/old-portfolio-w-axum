<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatDate } from '$lib/utils';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Trash2 } from 'lucide-svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';

	export let comment: Comments;
	export let current_user: User;

	let isLoading = false;
	const deleteComment: SubmitFunction = (input) => {
		isLoading = true;
		return async (options) => {
			isLoading = false;
			await options.update();
		};
	};

	const current_user_id = current_user != undefined ? current_user.id : '';
</script>

<div class="my-auto">
	<Avatar
		initials={comment.author.substring(0, 2)}
		background="variant-glass-primary"
		width="w-10"
	/>
</div>
<div class="flex flex-col variant-glass-surface p-2 ms-4 w-full">
	<div class="w-full inline-flex">
		<p class="font-sans text-xs capitalize border-e border-gray-500/50 pe-2">
			{comment.author}
		</p>
		<p class="font-sans text-xs ps-2">{formatDate(comment.created_at)}</p>
		{#if current_user_id == comment.user_id}
			<form action="?/delete_comment" method="POST" use:enhance={deleteComment}>
				<input type="hidden" name="comment_id" id="comment_id" value={comment.id} />
				<button type="submit" class="flex text-secondary-400 hover:text-secondary-500 ms-4">
					{#if isLoading}
						<LoadingSpinner />
					{:else}
						<Trash2 stroke-width="1.25" size="16px" />
					{/if}
				</button>
			</form>
		{/if}
	</div>
	<div>
		<p class="font-serif">{comment.content}</p>
	</div>
</div>
