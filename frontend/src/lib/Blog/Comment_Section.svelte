<script lang="ts">
	import CommentBox from './Comment_Box.svelte';

	export let comments: Comments[];
	export let current_user: string | null;

	let logged_in = current_user != null;
</script>

{#if logged_in}
	<p class="text-3xl pt-8 border-t border-gray-500/50">Leave a comment...</p>
	<form action="?/comment" method="post" class="my-2">
		<div class="input-ring">
			<textarea
				rows="1"
				name="content"
				id="content"
				placeholder="Write your comment here..."
				class="focus-ring resize-none"
			/>
		</div>
		<input type="text" name="parent_id" id="parent_id" value="" class="hidden" />
		<button type="submit" class="btn variant-glass-primary mt-2 btn-sm font-semibold"
			>Comment</button
		>
	</form>
{/if}
{#each comments as comment}
	<div class="p-2 mb-2 rounded-none">
		<div class="flex flex-row">
			<CommentBox {comment} {current_user} />
		</div>
		{#each comment.replies as reply}
			<div class="flex flex-row ms-8 mt-2">
				<CommentBox comment={reply} {current_user} />
			</div>
		{/each}
		{#if logged_in}
			<form action="?/comment" method="post" class="mt-2 ms-8">
				<div class="input-ring">
					<textarea
						rows="1"
						name="content"
						id="content"
						placeholder="Write your reply here..."
						class="focus-ring resize-none"
					/>
				</div>
				<input type="text" name="parent_id" id="parent_id" value={comment.id} class="hidden" />
				<button type="submit" class="btn variant-glass-primary mt-2 btn-sm font-semibold"
					>Reply</button
				>
			</form>
		{/if}
	</div>
{/each}
