<script lang="ts">
	import type { SubmitFunction } from '../../routes/blog/[slug]/$types';
	import CommentBox from './Comment_Box.svelte';
	import { enhance } from '$app/forms';
	import { MessageSquare, MessagesSquare } from 'lucide-svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';

	export let comments: Comments[];
	export let current_user: User;

	let commentLoading = false;
	let replyLoading = false;

	const addComment: SubmitFunction = (input) => {
		commentLoading = true;
		return async (options) => {
			commentLoading = false;
			await options.update();
		};
	};
	const addReply: SubmitFunction = (input) => {
		replyLoading = true;
		return async (options) => {
			replyLoading = false;
			await options.update();
		};
	};
</script>

<div class="mb-4">
	<p class="text-3xl pt-8 border-t border-gray-500/50 mb-2">Leave a comment...</p>
	<form action="?/comment" method="post" use:enhance={addComment}>
		<div class="input-ring w-96">
			<textarea
				rows="1"
				name="content"
				id="content"
				placeholder="Write your comment here..."
				class="focus-ring resize-none"
			/>
		</div>
		<button type="submit" class="btn variant-glass-primary mt-2 btn-sm font-semibold">
			<span>Comment</span>
			{#if commentLoading}
				<LoadingSpinner />
			{:else}
				<span><MessageSquare stroke-width="1.25" size="16px" /></span>
			{/if}
		</button>
	</form>
</div>
{#each comments as comment}
	<div class="p-2 ps-0 mb-2 rounded-none">
		<div class="flex flex-row">
			<CommentBox {comment} {current_user} />
		</div>
		{#each comment.replies as reply}
			<div class="flex flex-row ms-8 mt-2">
				<CommentBox comment={reply} {current_user} />
			</div>
		{/each}
		{#if current_user != undefined}
			<div class="ms-8 mt-2">
				<form action="?/comment" method="post" use:enhance={addReply}>
					<div class="input-ring w-96">
						<textarea
							rows="1"
							name="content"
							id="content"
							placeholder="Write your reply here..."
							class="focus-ring resize-none"
						/>
					</div>
					<input type="hidden" name="parent_id" id="parent_id" value={comment.id} />
					<button type="submit" class="btn variant-glass-primary mt-2 btn-sm font-semibold">
						<span>Reply</span>
						{#if replyLoading}
							<LoadingSpinner />
						{:else}
							<span><MessagesSquare stroke-width="1.25" size="16px" /></span>
						{/if}
					</button>
				</form>
			</div>
		{/if}
	</div>
{/each}
