<script lang="ts">
	import PostCard from '$lib/Blog/Post_card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	export let posts = data.posts;
</script>

<svelte:head>
	<title>Personal Blog</title>
	<meta
		name="description"
		content="Avishka Kavinda's Personal Blog Site: Exploring My Career Journey and Sharing Insights"
	/>
</svelte:head>

<div class="min-h-full">
	<div class="flex flex-col mx-auto">
		<p class="lg:text-9xl text-3xl font-heading-token font-extrabold ms-4 lg:ms-0">
			Sharing is Caring"
		</p>

		{#if posts && posts != undefined}
			{#each posts as post}
				<PostCard {post} />
			{:else}
				<!-- empty list -->
				<div class="flex flex-row h-screen justify-center text-center">
					<p class="text-5xl font-sans my-auto">
						No blog posts availabe at the time<br />Come back later.
					</p>
				</div>
			{/each}
		{/if}
	</div>
</div>
