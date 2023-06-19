<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { Trash2 } from 'lucide-svelte';

	export let comment: Comments;
	export let current_user: string | null;

	function formatDate(epochTime: any) {
		const date = new Date(epochTime * 1000);
		return date.toLocaleDateString('en-GB', { timeZone: 'UTC', dateStyle: 'long' });
	}
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
		{#if current_user == comment.user_id}
			<form action="?/delete" method="POST">
				<input type="text" name="comment_id" id="comment_id" value={comment.id} class="hidden" />
				<button type="submit" class="flex text-secondary-400 hover:text-secondary-500 ms-4">
					<Trash2 size="16px" />
				</button>
			</form>
		{/if}
	</div>
	<div>
		<p class="font-serif">{comment.content}</p>
	</div>
</div>
