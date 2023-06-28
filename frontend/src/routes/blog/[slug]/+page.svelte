<script lang="ts">
	import { Eye, Hash } from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';
	import { page } from '$app/stores';
	import Comment_Section from '$lib/Blog/Comment_Section.svelte';
	import LikeButton from '$lib/Blog/LikeButton.svelte';
	import { TableOfContents, toastStore } from '@skeletonlabs/skeleton';
	import { capitalize, formatDate } from '$lib/utils/utilities';
	import { site_img, title, twitter } from '$lib/utils/config';

	export let data: PageData;
	export let form: ActionData;

	$: updated_at = formatDate(data?.post?.updated_at);

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

<div class="flex lg:flex-row">
	<aside
		class="lg:w-80 lg:fixed lg:top-1/2 lg:bottom-1/2 lg:translate-y-1/2 lg:ms-6 hidden lg:block"
	>
		<TableOfContents
			target="#postContent"
			allowedHeadings="h1, h2, h3"
			regionLabel="text-2xl uppercase font-semibold"
			rounded="rounded-none"
			active=""
			scrollParent="#postContent"
		/>
	</aside>

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
	<main class="flex flex-col lg:w-full w-4/5 mx-auto">
		{#if data.post != undefined}
			<p class="lg:text-9xl text-3xl font-heading-token font-extrabold lg:text-center">
				{data.post.title}
			</p>

			<div
				class="flex lg:flex-row flex-col gap-2 lg:gap-0 justify-between mb-2 mt-6 lg:w-4/5 lg:mx-auto"
			>
				<p class="text-sm px-2 leading-4 my-2">
					Published by {data.post.author} on {updated_at}
				</p>

				<div class="flex">
					{#each data.post.tags as tag}
						<span
							class="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-blue-700/10 mx-1"
						>
							<Hash size="12px" />{tag}</span
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
				<h1 class="h1 mb-2 font-extrabold lg:mx-16">Overview</h1>
				<div class=" mt-4 lg:mx-16">{data.post.description}</div>
			</div>

			<article
				class="prose md:prose-lg lg:prose-xl dark:prose-invert my-8 min-w-full"
				id="postContent"
			>
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

				<div
					class="lg:ms-80 lg:w-5/6 prose-pre:m-0 prose-a:no-underline lg:prose-pre:w-full prose-pre:rounded-none prose-pre:bg-neutral-900/70"
				>
					{@html data.post.content}
				</div>
			</article>
			<div class="lg:ms-80 lg:w-5/6">
				<Comment_Section comments={data.comments} current_user={data.user} />
			</div>
		{:else}
			<div class="flex flex-row h-screen justify-center text-center">
				<p class="text-5xl font-sans my-auto">
					Oops, No blog data.post found. <br /> Please try again later.
				</p>
			</div>
		{/if}
	</main>
</div>
