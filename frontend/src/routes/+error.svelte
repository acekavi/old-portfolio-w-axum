<script>
	import { page } from '$app/stores';
</script>

<div
	class="bg-scales-light dark:bg-scales-dark bg-contain bg-center bg-fixed h-screen w-screen flex flex-col justify-center overflow-hidden"
>
	<div class="motion-safe:animate-float mx-auto">
		<img src="/astronaut_confused.svg" alt="Astronaut in space" srcset="" width="200px" />
	</div>
	<div class="text-center">
		<p class="text-9xl font-mono font-extrabold">{$page.status}</p>
		{#if $page.status === 404}
			<p class="text-5xl uppercase font-serif font-semibold">Are you lost baby girl?</p>
		{:else}
			<p class="text-5xl uppercase font-serif font-semibold">{$page.error?.message}</p>
		{/if}
	</div>
	<div class="flex flex-row justify-center pt-8">
		<a href="/" target="_self" class="btn rounded variant-ghost-surface m-4 uppercase"
			>Let's get you home</a
		>
		<a href="/blog" target="_self" class="btn rounded variant-ghost-surface m-4 uppercase"
			>Or read my blog</a
		>
	</div>
</div>
