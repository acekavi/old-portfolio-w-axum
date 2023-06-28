<script async script lang="ts">
	import { InputChip, SlideToggle, modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { Edit, Loader2, MousePointerClick, XSquare } from 'lucide-svelte';
	import type { ActionData, PageData, SubmitFunction } from './$types';
	import { enhance } from '$app/forms';
	export let data: PageData;

	$: isLoading = false;
	let deleteButton: HTMLButtonElement;

	const loader: SubmitFunction = (input) => {
		isLoading = true;
		return async (options) => {
			isLoading = false;
			await options.update();
		};
	};

	const modal: ModalSettings = {
		type: 'confirm',
		// Data
		title: 'Please Confirm',
		body: 'Are you sure you want to delete this post?',
		// TRUE if confirm pressed, FALSE if cancel pressed
		response: (r: boolean) => {
			if (r) {
				deleteButton.click();
			}
		}
	};

	function modalTrigger(): void {
		modalStore.trigger(modal);
	}
</script>

<svelte:head>
	<title>Admin : {data.post.title}</title>
	<meta
		name="description"
		content="Avishka Kavinda's Personal Blog Site: Exploring My Career Journey and Sharing Insights"
	/>
</svelte:head>

<p class="lg:text-9xl text-3xl font-heading-token font-extrabold ms-4 lg:mx-auto text-center">
	Admin Panel
</p>
<main class="w-3/5 mx-auto overflow-y-scroll">
	<div class="my-auto flex-col justify-center align-middle">
		<p class="text-5xl font-bold h1 mb-4">Edit Post!</p>

		<form method="POST" action="?/edit_post" use:enhance={loader}>
			<div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6">
				<label class="label col-span-full">
					<span class="font-semibold">Title</span>
					<input
						class="input variant-form-material leading-5"
						title="Title"
						name="title"
						type="text"
						placeholder="Title for the post"
						value={data.post.title || ''}
						autocomplete="off"
					/>
				</label>

				<label class="label col-span-full">
					<span class="font-semibold">Description</span>
					<textarea
						class="textarea variant-form-material leading-5 resize-none"
						name="description"
						rows="2"
						placeholder="Description for the post"
						value={data.post.description || ''}
					/>
				</label>

				<label class="label col-span-full">
					<span class="font-semibold">Content</span>
					<textarea
						class="textarea variant-form-material leading-5 resize-none"
						name="content"
						rows="20"
						placeholder="Content for the post in Markdown"
						value={data.post.content || ''}
					/>
				</label>

				<label class="label col-span-full">
					<span class="font-semibold">Category</span>
					<input
						class="input variant-form-material leading-5"
						title="Category"
						name="category"
						type="text"
						placeholder="Category of the post"
						value={data.post.category || ''}
						autocomplete="off"
					/>
				</label>

				<div class="col-span-full">
					<label for="tags" class="block mb-1 text-sm leading-6 font-semibold">Tags</label>
					<InputChip
						name="tags"
						placeholder="Tags for the post"
						rounded="rounded-none"
						padding="py-1 px-2"
						value={data.post.tags || []}
					/>
				</div>

				<div class="col-span-full flex">
					<label for="is_draft" class="block mb-1 text-sm font-semibold leading-6 me-4">Draft</label
					>
					<SlideToggle
						name="is_draft"
						label="Draft"
						size="sm"
						checked={data.post.is_draft || false}
					/>
				</div>

				<div class="col-span-full mb-8">
					<button type="submit" class="btn variant-glass-success mt-4">
						<span>Edit Post</span>
						{#if isLoading}
							<Loader2 class="animate-spin" />
						{:else}
							<span><Edit stroke-width="1.25" size="18px" /></span>
						{/if}
					</button>
					<button on:click|preventDefault={modalTrigger} class="btn variant-glass-error mt-4">
						<span>Delete Post</span>
						<span><XSquare stroke-width="1.25" size="18px" /></span>
					</button>
					<button class="hidden" formaction="?/delete_post" bind:this={deleteButton} />
				</div>
			</div>
		</form>
	</div>
</main>
