<script lang="ts">
	import PostLink from '$lib/Blog/PostLink.svelte';
	import { Search } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
	export let data: PageData;

	// @ts-ignore
	const searchStore = createSearchStore(data.posts);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});
</script>

<svelte:head>
	<title>Personal Blog</title>
	<meta
		name="description"
		content="Avishka Kavinda's Personal Blog Site: Exploring My Career Journey and Sharing Insights"
	/>
</svelte:head>

<p class="lg:text-9xl text-3xl font-heading-token font-extrabold mx-auto">Join the journey</p>

<div class="flex flex-row">
	{#if data.posts}
		<div class="flex flex-col justify-center lg:w-3/5 w-4/5 mx-auto">
			<label class="label my-8">
				<div
					class="input-group input-group-divider grid-cols-[auto_1fr_auto] variant-form-material"
				>
					<div class="input-group-shim"><Search /></div>
					<input type="search" placeholder="Search..." bind:value={$searchStore.search} />
				</div>
			</label>

			{#each $searchStore.filtered as post}
				<PostLink {post} />
			{:else}
				<!-- empty list -->
				<p class="text-5xl font-sans my-auto text-center">
					No blog posts availabe at the time<br />Come back later.
				</p>
			{/each}
		</div>
	{/if}
</div>
