<script lang="ts">
	import { TableOfContents } from '@skeletonlabs/skeleton';

	export let postContent: Promise<string | undefined> | undefined;
</script>

<article class="prose md:prose-lg lg:prose-xl dark:prose-invert my-8 min-w-full">
	<div
		class="prose-pre:m-0 prose-a:no-underline lg:prose-pre:w-full prose-pre:rounded-none prose-pre:bg-neutral-900/70"
	>
		{#await postContent}
			<div class="shadow rounded-md p-4 w-3/5 mx-auto">
				<div class="animate-pulse flex space-x-4">
					<div class="flex-1 space-y-6 py-1">
						<div class="h-2 bg-slate-700 rounded" />
						<div class="space-y-3">
							<div class="grid grid-cols-3 gap-4">
								<div class="h-2 bg-slate-700 rounded col-span-2" />
								<div class="h-2 bg-slate-700 rounded col-span-1" />
							</div>
							<div class="h-2 bg-slate-700 rounded" />
						</div>
						<div class="h-2 bg-slate-700 rounded" />
						<div class="space-y-3">
							<div class="h-2 bg-slate-700 rounded" />
						</div>
						<div class="h-2 bg-slate-700 rounded" />
						<div class="space-y-3">
							<div class="h-2 bg-slate-700 rounded" />
						</div>
						<div class="h-2 bg-slate-700 rounded" />
						<div class="space-y-3">
							<div class="h-2 bg-slate-700 rounded" />
						</div>
					</div>
				</div>
			</div>
		{:then value}
			<aside
				class="lg:w-80 lg:fixed lg:top-1/2 lg:bottom-1/2 lg:translate-y-1/2 lg:ms-6 mb-8 lg:m-0"
			>
				<TableOfContents
					target="#postContent"
					allowedHeadings="h1, h2, h3"
					regionLabel="text-2xl uppercase font-semibold"
					rounded="rounded-none"
					active=""
					text="text-neutral-900 dark:text-neutral-100 font-medium text-sm"
					scrollParent="#postContent"
				/>
			</aside>
			<script lang="ts">
				function copyCode(button: HTMLButtonElement) {
					// @ts-ignore
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
			<div id="postContent" class="lg:ms-80 lg:w-5/6">
				{@html value}
			</div>
		{:catch error}
			<!-- promise was rejected -->
			<pre>
				<code>{error.message}</code>
			</pre>
		{/await}
	</div>
</article>
