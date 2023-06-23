<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { Eye, Heart } from 'lucide-svelte';
	import { page } from '$app/stores';
	export let post: BlogPost;

	const url = $page.url.pathname.includes('/admin')
		? `/admin/post/${post.slug}`
		: `/blog/${post.slug}`;
	const updated_at = formatDate(post.updated_at);
</script>

<a href={url} class="border-b border-gray-500/10" data-sveltekit-preload-data="off">
	<div class=" w-full hover:bg-primary-500 p-4">
		<p class="text-4xl font-bold font-serif mb-2">{post.title}</p>
		<div class="flex flex-wrap gap-2 lg:gap-0">
			<div class="flex border-e border-gray-500/50 pe-2">
				<Eye size="16px" />
				<p class="ps-1 text-sm leading-4">
					{post.views}
				</p>
			</div>
			<div class="flex border-e border-gray-500/50 px-2">
				<Heart size="16px" />
				<p class="ps-1 text-sm leading-4">
					{post.like_count}
				</p>
			</div>
			<p class="text-sm leading-4 border-e border-gray-500/50 px-2">{updated_at}</p>
			<p class="text-sm px-2 leading-4">{post.category}</p>
		</div>
		<p class="text-xl font-monospace line-clamp-3 my-2">{post.description}</p>
		<div class="flex">
			{#each post.tags as tag}
				<p class="text-xs font-semibold variant-glass-surface leading-4 me-2 py-1 px-2">{tag}</p>
			{/each}
		</div>
	</div>
</a>
