<script lang="ts">
	import type { SubmitFunction } from '../../routes/blog/[slug]/$types';
	import CommentBox from './Comment_Box.svelte';
	import { enhance } from '$app/forms';
	import { Loader2, MessageSquare, MessagesSquare } from 'lucide-svelte';
	import { toastStore } from '@skeletonlabs/skeleton';

	export let comments: Comments[];
	export let current_user: User;

	$: commentLoading = false;
	$: replyLoading = false;

	const addComment: SubmitFunction = (input) => {
		commentLoading = true;
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
			commentLoading = false;
			await options.update();
		};
	};
	const addReply: SubmitFunction = (input) => {
		replyLoading = true;
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
			replyLoading = false;
			await options.update();
		};
	};
</script>

<div class="mb-4">
	<p class="text-3xl pt-8 border-t border-gray-500/50 mb-2">Leave a comment...</p>
	<form action="?/comment" method="post" use:enhance={addComment}>
		<label class="label">
			<textarea
				class="textarea variant-form-material leading-5 resize-none"
				rows="4"
				placeholder="Write your comment here..."
				name="content"
			/>
		</label>
		<button type="submit" class="btn variant-glass-primary mt-2 btn-sm font-semibold">
			<span>Comment</span>
			{#if commentLoading}
				<Loader2 class="animate-spin" />
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
			<div class="ms-14 mt-2">
				<form action="?/comment" method="post" use:enhance={addReply}>
					<label class="label">
						<textarea
							class="textarea variant-form-material leading-5 resize-none"
							rows="2"
							placeholder="Write your reply here..."
							name="content"
						/>
					</label>
					<input type="hidden" name="parent_id" id="parent_id" value={comment.id} />
					<button type="submit" class="btn variant-glass-primary mt-2 btn-sm font-semibold">
						<span>Reply</span>
						{#if replyLoading}
							<Loader2 class="animate-spin" />
						{:else}
							<span><MessagesSquare stroke-width="1.25" size="16px" /></span>
						{/if}
					</button>
				</form>
			</div>
		{/if}
	</div>
{/each}
