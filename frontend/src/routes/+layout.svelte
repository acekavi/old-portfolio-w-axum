<script>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import Navbar from '$lib/Navbar.svelte';
	import { Toast } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	import { author, title } from '$lib/config';
</script>

<svelte:head>
	<meta name={title} />
	<meta name="robots" content="index, follow" />
	<meta name="author" content={author} />
	<link rel="canonical" href="http://www.acekavi.me" />
</svelte:head>

<Navbar />
<Toast />
<slot />
