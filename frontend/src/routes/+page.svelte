<script>
	import AboutMe from '$lib/AboutMe.svelte';
	import ContactMe from '$lib/ContactMe.svelte';
	import Design from '$lib/Design.svelte';
	import Experiences from '$lib/Experiences.svelte';
	import MainHero from '$lib/MainHero.svelte';
	import Projects from '$lib/Projects.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="acekavi Portfolio">
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