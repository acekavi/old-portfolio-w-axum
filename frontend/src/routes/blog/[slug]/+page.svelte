<script lang="ts">
	import { Eye, Heart } from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { site_img, title, twitter } from '$lib/config';
	import Comment_Section from '$lib/Blog/Comment_Section.svelte';

	export let data: PageData;
	export let form: ActionData;

	function formatDate(epochTime: any) {
		const date = new Date(epochTime * 1000);
		return date.toLocaleDateString('en-GB', { timeZone: 'UTC', dateStyle: 'long' });
	}
	const updated_at = formatDate(data?.post?.updated_at);

	if (data.post?.author != undefined) {
		data.post.author = data.post?.author?.charAt(0).toUpperCase() + data.post?.author?.slice(1);
	}

	if (form?.error) {
		const toast: ToastSettings = {
			message: form?.error,
			timeout: 5000,
			background: 'variant-glass-error'
		};
		toastStore.trigger(toast);
	} else if (form?.res_message?.message) {
		const toast: ToastSettings = {
			message: form?.res_message.message,
			timeout: 5000,
			background: 'variant-glass-success'
		};
		toastStore.trigger(toast);
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
</svelte:head>

<div class="min-h-full">
	<div class="flex flex-col mx-auto w-5/6 lg:w-full">
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
							>{tag}</span
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
					<div class="flex border-e border-gray-500/50 px-2">
						<form method="POST" action="?/like">
							{#if data.post.liked}
								<button type="submit" class="flex text-secondary-400 hover:text-secondary-500">
									<Heart size="16px" />
									<p class="ps-1 text-sm leading-4">
										{data.post.like_count}
									</p>
								</button>
							{:else}
								<button type="submit" class="flex hover:text-secondary-500">
									<Heart size="16px" />
									<p class="ps-1 text-sm leading-4">
										{data.post.like_count}
									</p>
								</button>
							{/if}
						</form>
					</div>
					<p class="text-sm px-2 leading-4">{data.post.category}</p>
				</div>
			</div>

			<div class="text-xl font-serif">
				{data.post.description}
			</div>

			<div id="content">
				<div class="my-8">{@html data.post.content}</div>
			</div>

			<Comment_Section comments={data.comments} current_user={data.current_user} />
		{:else}
			<div class="flex flex-row h-screen justify-center text-center">
				<p class="text-5xl font-sans my-auto">
					Oops, No blog data.post found. <br /> Please try again later.
				</p>
			</div>
		{/if}
	</div>
</div>
