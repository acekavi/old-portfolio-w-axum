<script>
	import Sidebar from '$lib/Blog/Sidebar.svelte';
</script>

<div class="container">
	<div class="flex flex-col w-screen">
		<aside class="fixed top-1/2 bottom-1/2 my-auto w-60 lg:block hidden">
			<Sidebar>
				<svelte:fragment slot="header">
					<p>Top Posts</p>
				</svelte:fragment>

				<svelte:fragment slot="main">
					<p>All rights reserved.</p>
					<p>Copyright (c) 2019 Svelte Industries</p>
				</svelte:fragment>
			</Sidebar>
		</aside>

		<main class="lg:ms-60">
			<slot />
		</main>
	</div>
</div>
