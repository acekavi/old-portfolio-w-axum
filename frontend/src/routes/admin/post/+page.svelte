<script async script lang="ts">
	import { InputChip, SlideToggle, toastStore } from '@skeletonlabs/skeleton';
	import { PlusSquare } from 'lucide-svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<main class="flex flex-row justify-center mt-16">
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
		<p class="text-3xl font-bold h1 mb-4">Add a new Post!</p>

		<form method="POST" action="?/add_post">
			<div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6">
				<div class="col-span-full">
					<label for="title" class="block mb-1 text-sm font-medium leading-6">Title</label>
					<div class="input-ring">
						<input
							type="text"
							name="title"
							id="title"
							placeholder="Title for the post"
							class="focus-ring"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="description" class="block mb-1 text-sm font-medium leading-6"
						>Description</label
					>
					<div class="input-ring">
						<input
							type="text"
							name="description"
							id="description"
							placeholder="Description for the post"
							class="focus-ring"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="content" class="block mb-1 text-sm font-medium leading-6">Content</label>
					<div class="input-ring">
						<textarea
							rows="10"
							name="content"
							id="content"
							placeholder="Content for the postin Markdown"
							class="focus-ring"
							cols="100"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="category" class="block mb-1 text-sm font-medium leading-6">Category</label>
					<div class="input-ring">
						<input
							type="text"
							name="category"
							id="category"
							placeholder="Category of the post"
							class="focus-ring"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="tags" class="block mb-1 text-sm font-medium leading-6">Tags</label>
					<InputChip
						name="tags"
						placeholder="Tags for the post"
						rounded="rounded-none"
						padding="py-1 px-2"
					/>
				</div>

				<div class="col-span-full flex">
					<label for="is_draft" class="block mb-1 text-sm font-medium leading-6 me-4">Draft</label>
					<SlideToggle name="is_draft" label="is_draft" size="sm" />
				</div>

				<div class="col-span-full">
					<button type="submit" class="btn variant-glass-primary mt-4">
						<span>Add Post</span>
						<span><PlusSquare stroke-width="1.25" size="18px" /></span>
					</button>
				</div>
			</div>
		</form>
	</div>
</main>
