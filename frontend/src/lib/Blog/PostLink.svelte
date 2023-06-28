<script lang="ts">
	import { Eye, Hash, Heart } from 'lucide-svelte';
	import { formatDate } from '$lib/utils/utilities';
	export let post: BlogPost;

	$: updated_at = formatDate(post.updated_at);
</script>

<a
	href={`/blog/${post.slug}`}
	class="border-b border-gray-500/10"
	data-sveltekit-preload-data="off"
>
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
				<span
					class="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-blue-700/10 mx-1"
				>
					<Hash size="12px" />{tag}</span
				>
			{/each}
		</div>
	</div>
</a>
