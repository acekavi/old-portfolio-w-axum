<script lang="ts">
	import { InputChip, SlideToggle, toastStore } from '@skeletonlabs/skeleton';
	import type { ActionData, SubmitFunction } from './$types';
	import type { PageData } from './$types';
	import { Loader2, PlusSquare, Search } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
	export let data: PageData;
	export let form: ActionData;

	$: isLoading = false;

	const loader: SubmitFunction = (input) => {
		isLoading = true;
		return async (options) => {
			isLoading = false;
			await options.update();
		};
	};

	// @ts-ignore
	const searchStore = createSearchStore(data.posts);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});
</script>

<svelte:head>
	<title>Admin Panel</title>
	<meta
		name="description"
		content="Avishka Kavinda's Personal Blog Site: Exploring My Career Journey and Sharing Insights"
	/>
</svelte:head>

<p class="lg:text-9xl text-3xl font-heading-token font-extrabold ms-4 lg:mx-auto text-center">
	Admin Panel
</p>
<div class="lg:grid lg:grid-flow-col lg:grid-rows-1 lg:grid-cols-2 flex flex-col gap-8 my-8">
	<main class="w-4/5 mx-auto overflow-y-scroll">
		<span class="hidden">
			{#if form?.error}
				{toastStore.trigger({
					message: form?.error,
					timeout: 5000,
					background: 'variant-glass-error'
				})}
			{/if}
			{#if form?.message}
				{toastStore.trigger({
					message: form?.message,
					timeout: 5000,
					background: 'variant-glass-success'
				})}
			{/if}
		</span>
		<div class="my-auto flex-col justify-center align-middle">
			<p class="text-5xl font-bold h1 mb-4">Add a new Post!</p>

			<form method="POST" action="?/add_post" use:enhance={loader}>
				<div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6">
					<label class="label col-span-full">
						<span class="font-semibold">Title</span>
						<input
							class="input variant-form-material leading-5"
							title="Title"
							name="title"
							type="text"
							placeholder="Title for the post"
							value={form?.values?.title || ''}
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
							value={form?.values?.description || ''}
						/>
					</label>

					<label class="label col-span-full">
						<span class="font-semibold">Content</span>
						<textarea
							class="textarea variant-form-material leading-5 resize-none"
							name="content"
							rows="20"
							placeholder="Content for the post in Markdown"
							value={form?.values?.content || ''}
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
							value={form?.values?.category || ''}
							autocomplete="off"
						/>
					</label>

					<div class="col-span-full">
						<label for="tags" class="block mb-1 text-sm font-semibold leading-6">Tags</label>
						<InputChip
							name="tags"
							placeholder="Tags for the post"
							rounded="rounded-none"
							padding="py-1 px-2"
							value={form?.values?.tags || []}
						/>
					</div>

					<div class="col-span-full flex">
						<label for="is_draft" class="block mb-1 text-sm font-semibold leading-6 me-4"
							>Draft</label
						>
						<SlideToggle
							name="is_draft"
							label="Draft"
							size="sm"
							checked={form?.values?.is_draft || false}
						/>
					</div>

					<div class="col-span-full">
						<button type="submit" class="btn variant-glass-primary mt-4">
							<span>Add Post</span>
							{#if isLoading}
								<Loader2 class="animate-spin" />
							{:else}
								<span><PlusSquare stroke-width="1.25" size="18px" /></span>
							{/if}
						</button>
					</div>
				</div>
			</form>
		</div>
	</main>

	{#if data.posts}
		<div class="flex flex-col">
			<label class="label my-8">
				<div
					class="input-group input-group-divider grid-cols-[auto_1fr_auto] variant-form-material"
				>
					<div class="input-group-shim"><Search /></div>
					<input type="search" placeholder="Search..." bind:value={$searchStore.search} />
				</div>
			</label>
			{#each $searchStore.filtered as post}
				<a
					href={`/admin/${post.slug}`}
					class="border-b border-gray-500/10"
					data-sveltekit-preload-data="off"
				>
					<div class=" w-full hover:bg-primary-500 p-4">
						<p class="text-4xl font-bold font-serif mb-2">{post.title}</p>
						<p class="text-xl font-monospace line-clamp-3 my-2">{post.description}</p>
					</div>
				</a>
			{:else}
				<!-- empty list -->
				<div class="flex flex-row h-screen justify-center text-center">
					<p class="text-5xl font-sans my-auto">
						No blog posts availabe at the time<br />Come back later.
					</p>
				</div>
			{/each}
		</div>
	{/if}
</div>
