<script>
	import AboutMe from '$lib/Main/AboutMe.svelte';
	import ContactMe from '$lib/Main/ContactMe.svelte';
	import Design from '$lib/Main/Design.svelte';
	import Experiences from '$lib/Main/Experiences.svelte';
	import MainHero from '$lib/Main/MainHero.svelte';
	import Projects from '$lib/Main/Projects.svelte';
	import { description } from '$lib/utils/config';
</script>

<svelte:head>
	<title>Home Page</title>
	<meta name="description" content={description} />
</svelte:head>

<div
	class="lg:max-h-screen overflow-y-scroll snap snap-y snap-mandatory scroll-smooth main-container"
>
	<MainHero />
	<AboutMe />
	<Experiences />
	<Projects />
	<Design />
	<ContactMe />
</div>
