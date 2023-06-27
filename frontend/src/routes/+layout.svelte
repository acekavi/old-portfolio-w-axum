<script lang="ts">
	import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
	import { Modal, Toast, modalStore } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '../app.postcss';

	import SignupForm from '$lib/auth/signup-form.svelte';
	import LoginForm from '../lib/auth/login-form.svelte';
	import LogoutForm from '$lib/auth/logout-form.svelte';
	import Navbar from '$lib/utils/navbar.svelte';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { author, title } from '$lib/utils/config';
	import type { LayoutData } from './$types';

	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	storeHighlightJs.set(hljs);

	const modalComponentRegistry: Record<string, ModalComponent> = {
		LoginModal: {
			ref: LoginForm
		},
		SignupModal: {
			ref: SignupForm
		},
		LogoutModal: {
			ref: LogoutForm
		}
	};
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: LayoutData;
</script>

<svelte:head>
	<meta name={title} />
	<meta name="robots" content="index, follow" />
	<meta name="author" content={author} />
	<link rel="canonical" href="http://www.acekavi.me" />
</svelte:head>

<Modal rounded="rounded-none" components={modalComponentRegistry} />
<Toast rounded="rounded-md" />
<Navbar user={data.user} />

<slot />
