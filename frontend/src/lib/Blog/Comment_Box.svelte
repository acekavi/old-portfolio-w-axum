<script lang="ts">
	import { enhance } from '$app/forms';
	import { Avatar, modalStore, toastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Trash2 } from 'lucide-svelte';
	import { formatDate } from '$lib/utils/utilities';

	export let comment: Comments;
	export let current_user: User | null;

	let deleteButton: HTMLButtonElement;
	const deleteModal: ModalSettings = {
		type: 'confirm',
		title: 'Please Confirm',
		body: 'Are you sure you want to delete this comment?',
		response: (r: boolean) => {
			if (r) {
				deleteButton.click();
			}
		}
	};

	function deleteModalTrigger(): void {
		modalStore.trigger(deleteModal);
	}

	const deleteHandler: SubmitFunction = (input) => {
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
			await options.update();
		};
	};

	const current_user_id = current_user?.id || '';
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
			<button
				on:click|preventDefault={deleteModalTrigger}
				class="flex text-secondary-400 hover:text-secondary-500 ms-4"
			>
				<Trash2 stroke-width="1.25" size="16px" />
			</button>
			<form action="?/delete_comment" method="POST" use:enhance={deleteHandler}>
				<input type="hidden" name="comment_id" id="comment_id" value={comment.id} />
				<button type="submit" class="hidden" bind:this={deleteButton} />
			</form>
		{/if}
	</div>
	<div>
		<p class="font-serif">{comment.content}</p>
	</div>
</div>
