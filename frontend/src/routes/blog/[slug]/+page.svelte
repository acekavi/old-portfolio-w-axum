<script lang="ts">
	import { Eye, Hash } from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';
	import { page } from '$app/stores';
	import { site_img, title, twitter } from '$lib/config';
	import Comment_Section from '$lib/Blog/Comment_Section.svelte';
	import LikeButton from '$lib/Blog/LikeButton.svelte';
	import { capitalize, formatDate } from '$lib/utils';
	import { toastStore } from '@skeletonlabs/skeleton';

	export let data: PageData;
	export let form: ActionData;

	const updated_at = formatDate(data?.post?.updated_at);

	if (data.post?.author != undefined) {
		data.post.author = capitalize(data.post.author);
	}
</script>

<svelte:head>
	<title>{data.post?.title.substring(0, 60)}</title>
	<meta name="description" content={data.post?.description.substring(0, 155) + '...'} />

	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.post?.title} />
	<meta property="og:description" content={data.post?.description} />
	<meta property="og:image" content={site_img} />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:site_name" content={title} />

	<meta name="twitter:title" content={data.post?.title} />
	<meta name="twitter:description" content={data.post?.description} />
	<meta name="twitter:image" content={site_img} />
	<meta name="twitter:site" content={$page.url.href} />
	<meta name="twitter:creator" content={twitter} />

	<style>
		html {
			scroll-behavior: smooth;
		}
	</style>
</svelte:head>

<div class="lg:min-h-full w-4/5 lg:w-full mx-auto">
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
	<main class="flex flex-col lg:ms-80">
		{#if data.post != undefined}
			<p class="lg:text-9xl text-3xl font-heading-token font-extrabold">
				{data.post.title}
			</p>
			<div class="flex lg:flex-row flex-col gap-2 lg:gap-0 justify-between mb-2 mt-6">
				<p class="text-sm px-2 leading-4 my-2">
					Published by {data.post.author} on {updated_at}
				</p>

				<div class="flex">
					{#each data.post.tags as tag}
						<span
							class="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-blue-700/10 mx-1"
							><Hash size="12px" />{tag}</span
						>
					{/each}
				</div>

				<div class="flex flex-wrap gap-2 lg:gap-0 my-2 me-4">
					<div class="flex border-e border-gray-500/50 pe-2">
						<Eye size="16px" />
						<p class="ps-1 text-sm leading-4">
							{data.post.views}
						</p>
					</div>
					<LikeButton post={data.post} />
					<p class="text-sm px-2 leading-4">{data.post.category}</p>
				</div>
			</div>

			<div class="text-xl font-serif py-8 border-b border-gray-500/50">
				<h1 class="h1 mb-2 font-extrabold">Overview</h1>
				<div class="lg:ms-8 mt-4">{data.post.description}</div>
			</div>

			<article class="prose dark:prose-invert min-w-full my-8">
				<script lang="ts">
					function copyCode(button: HTMLButtonElement) {
						const codeBlock = button.parentNode?.nextElementSibling as HTMLElement;
						const code = codeBlock?.textContent;
						if (code) {
							navigator.clipboard.writeText(code).then(() => {
								button.textContent = 'Copied!';
								setTimeout(() => {
									button.textContent = 'Copy';
								}, 1000);
							});
						}
					}
				</script>
				{@html data.post.content}
			</article>

			<Comment_Section comments={data.comments} current_user={data.user} />
		{:else}
			<div class="flex flex-row h-screen justify-center text-center">
				<p class="text-5xl font-sans my-auto">
					Oops, No blog data.post found. <br /> Please try again later.
				</p>
			</div>
		{/if}
	</main>
</div>
