<script lang="ts">
	import { Eye, Heart } from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { site_img, title, twitter } from '$lib/config';

	export let data: PageData;
	export let post = data.post;
	export let form: ActionData;

	if (post?.updated_at != undefined) {
		post.updated_at = post?.updated_at.split(':').slice(0, 2).join(':');
	}
	if (post?.author != undefined) {
		post.author = post?.author?.charAt(0).toUpperCase() + post?.author?.slice(1);
	}

	if (form?.error) {
		const toast: ToastSettings = {
			message: form?.error,
			timeout: 5000,
			background: 'variant-filled-error'
		};
		toastStore.trigger(toast);
	} else if (form?.like_res?.message) {
		const toast: ToastSettings = {
			message: form?.like_res.message,
			timeout: 5000,
			background: 'variant-filled-success'
		};
		toastStore.trigger(toast);
	}
</script>

<svelte:head>
	<title>{post?.title.substring(0, 60)}</title>
	<meta name="description" content={post?.description.substring(0, 155) + '...'} />

	<meta property="og:type" content="article" />
	<meta property="og:title" content={post?.title} />
	<meta property="og:description" content={post?.description} />
	<meta property="og:image" content={site_img} />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:site_name" content={title} />

	<meta name="twitter:title" content={post?.title} />
	<meta name="twitter:description" content={post?.description} />
	<meta name="twitter:image" content={site_img} />
	<meta name="twitter:site" content={$page.url.href} />
	<meta name="twitter:creator" content={twitter} />
</svelte:head>

<div class="min-h-full">
	<div class="flex flex-col mx-auto w-5/6 lg:w-full">
		{#if post != undefined}
			<p class="lg:text-9xl text-3xl font-heading-token font-extrabold">
				{post.title}
			</p>
			<div class="flex lg:flex-row flex-col gap-2 lg:gap-0 justify-between mb-2 mt-6">
				<p class="text-sm px-2 leading-4 my-2">
					Published by {post.author} on {post.updated_at}
				</p>

				<div class="flex">
					{#each post.tags as tag}
						<p class="badge variant-ringed-surface me-2">
							#{tag}
						</p>
					{/each}
				</div>

				<div class="flex flex-wrap gap-2 lg:gap-0 my-2 me-4">
					<div class="flex border-e border-gray-500/50 pe-2">
						<Eye size="16px" />
						<p class="ps-1 text-sm leading-4">
							{post.views}
						</p>
					</div>
					<div class="flex border-e border-gray-500/50 px-2">
						<form method="POST" action="?/like">
							{#if post.liked}
								<button type="submit" class="flex text-secondary-400 hover:text-secondary-500">
									<Heart size="16px" />
									<p class="ps-1 text-sm leading-4">
										{post.like_count}
									</p>
								</button>
							{:else}
								<button type="submit" class="flex hover:text-secondary-500">
									<Heart size="16px" />
									<p class="ps-1 text-sm leading-4">
										{post.like_count}
									</p>
								</button>
							{/if}
						</form>
					</div>
					<p class="text-sm px-2 leading-4">{post.category}</p>
				</div>
			</div>

			<div class="text-xl font-serif">
				{post.description}
			</div>

			<div id="content">
				<div class="my-8">{@html post.content}</div>
			</div>

			<div class="flex" />
		{:else}
			<div class="flex flex-row h-screen justify-center text-center">
				<p class="text-5xl font-sans my-auto">
					Oops, No blog post found. <br /> Please try again later.
				</p>
			</div>
		{/if}
	</div>
</div>
