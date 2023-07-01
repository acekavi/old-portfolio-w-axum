<script async script lang="ts">
	import {
		InputChip,
		SlideToggle,
		modalStore,
		type ModalSettings,
		toastStore
	} from '@skeletonlabs/skeleton';
	import { Edit, XSquare } from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';
	export let data: PageData;
	export let form: ActionData;

	let current_post: Post;

	if (data) {
		current_post = {
			title: data.post.title,
			description: data.post.description,
			content: data.post.content,
			category: data.post.category,
			tags: data.post.tags,
			is_draft: data.post.is_draft
		};
	}
	if (form) {
		current_post = {
			title: form.post?.title ?? '',
			description: form.post?.description ?? '',
			content: form.post?.content ?? '',
			category: form.post?.category ?? '',
			tags: form.post?.tags ?? [],
			is_draft: form.post?.is_draft ?? false
		};
	}

	let deleteButton: HTMLButtonElement;

	const modal: ModalSettings = {
		type: 'confirm',
		title: 'Please Confirm',
		body: 'Are you sure you want to delete this post?',
		response: (r: boolean) => {
			if (r) {
				deleteButton.click();
			}
		}
	};

	function modalTrigger(): void {
		modalStore.trigger(modal);
	}
	if (form) {
		if (form?.message) {
			toastStore.trigger({
				// @ts-ignore
				message: form.message,
				timeout: 5000,
				background: 'variant-glass-success'
			});
		} else {
			toastStore.trigger({
				// @ts-ignore
				message: form.error,
				timeout: 5000,
				background: 'variant-glass-error'
			});
		}
	}
</script>

<svelte:head>
	<title>Admin : {current_post.title}</title>
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

		<form method="POST" action="?/edit_post">
			<div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6">
				<label class="label col-span-full">
					<span class="font-semibold">Title</span>
					<input
						class="input variant-form-material leading-5"
						title="Title"
						name="title"
						type="text"
						placeholder="Title for the post"
						value={current_post.title}
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
						value={current_post.description}
					/>
				</label>

				<label class="label col-span-full">
					<span class="font-semibold">Content</span>
					<textarea
						class="textarea variant-form-material leading-5 resize-none"
						name="content"
						rows="20"
						placeholder="Content for the post in Markdown"
						value={current_post.content}
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
						value={current_post.category}
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
						value={current_post.tags}
					/>
				</div>

				<div class="col-span-full flex">
					<label for="is_draft" class="block mb-1 text-sm font-semibold leading-6 me-4">Draft</label
					>
					<SlideToggle name="is_draft" label="Draft" size="sm" checked={current_post.is_draft} />
				</div>

				<div class="col-span-full mb-8">
					<button type="submit" class="btn variant-glass-success mt-4">
						<span>Edit current_post</span>
						<span><Edit stroke-width="1.25" size="18px" /></span>
					</button>
					<button on:click|preventDefault={modalTrigger} class="btn variant-glass-error mt-4">
						<span>Delete current_post</span>
						<span><XSquare stroke-width="1.25" size="18px" /></span>
					</button>
					<form action="?/delete_post" method="post">
						<button class="hidden" type="submit" bind:this={deleteButton} />
					</form>
				</div>
			</div>
		</form>
	</div>
</main>
