<script lang="ts">
	import { Eye, Hash } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import LikeButton from '$lib/Blog/LikeButton.svelte';
	import { type PopupSettings, popup } from '@skeletonlabs/skeleton';
	import { formatDate } from '$lib/utils/utilities';
	import { site_img, title, twitter } from '$lib/utils/config';
	import AuthorPopup from '$lib/Blog/AuthorPopup.svelte';
	import BlogContent from '$lib/Blog/BlogContent.svelte';
	import CommentSection from '$lib/Blog/CommentSection.svelte';

	export let data: PageData;

	$: updated_at = formatDate(data.props?.post?.updated_at);

	const popupAuthor: PopupSettings = {
		event: 'click',
		target: 'author-popup',
		placement: 'bottom'
	};
</script>

<svelte:head>
	<title>{data.props.post?.title.substring(0, 60)}</title>
	<meta name="description" content={data.props.post?.description.substring(0, 155) + '...'} />

	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.props.post?.title} />
	<meta property="og:description" content={data.props.post?.description} />
	<meta property="og:image" content={site_img} />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:site_name" content={title} />

	<meta name="twitter:title" content={data.props.post?.title} />
	<meta name="twitter:description" content={data.props.post?.description} />
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
	<main class="flex flex-col lg:w-full w-4/5 mx-auto">
		{#if data.props.post != undefined}
			<p class="lg:text-9xl text-3xl font-heading-token font-extrabold lg:text-center">
				{data.props.post.title}
			</p>

			<div
				class="flex lg:flex-row flex-col gap-2 lg:gap-0 justify-between mb-2 mt-6 lg:w-4/5 lg:mx-auto"
			>
				<p class="text-sm px-2 leading-4 my-2">
					Published by <button class="border-b border-primary-500" use:popup={popupAuthor}
						>Avishka Kavinda</button
					>
					on {updated_at}
				</p>
				<AuthorPopup />

				<div class="flex">
					{#each data.props.post.tags as tag}
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
							{data.props.post.views}
						</p>
					</div>
					<LikeButton post={data.props.post} />
					<p class="text-sm px-2 leading-4">{data.props.post.category}</p>
				</div>
			</div>

			<div class="text-xl font-serif py-8 border-b border-gray-500/50">
				<h1 class="h1 mb-2 font-extrabold lg:mx-16">Overview</h1>
				<div class=" mt-4 lg:mx-16">{data.props.post.description}</div>
			</div>

			<BlogContent postContent={data.props.post.html} />

			<div class="lg:ms-80 lg:w-5/6">
				<CommentSection comments={data.props.comments} current_user={data.props.user} />
			</div>
		{:else}
			<div class="flex flex-row h-screen justify-center text-center">
				<p class="text-5xl font-sans my-auto">
					Oops, No blog data.props.post found. <br /> Please try again later.
				</p>
			</div>
		{/if}
	</main>
</div>
