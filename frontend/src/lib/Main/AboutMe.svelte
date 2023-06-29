<script>
	import { Linkedin, Github, Instagram, FileHeart } from 'lucide-svelte';

	function downloadFile() {
		const link = document.createElement('a');
		link.href = '/avishka_kavinda.pdf';
		link.download = 'Avishka Kavinda.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<div
	class="container my-auto flex items-center justify-evenly lg:flex-row flex-col-reverse lg:justify-center snap-always snap-center lg:h-screen"
>
	<div class="card lg:w-2/5 variant-glass w-4/5 lg:rounded-e-none lg:h-[70vh]">
		<header class="card-header">
			<p
				class=" lg:text-6xl text-4xl font-serif font-extrabold relative lg:-inset-x-10 lg:-inset-y-14 gradient-aboutme pb-4 lg:p-0"
			>
				Who am I?
			</p>
		</header>
		<section class="pb-8">
			<p class="lg:text-l text-justify px-8">
				Hello! I'm Avishka Kavinda, A fullstack developer based here in
				<a
					href="https://www.google.com/search?client=firefox-b-d&q=colombo+google+map#"
					class="skew-text"
					target="_blank">📍Colombo, Sri Lanka.</a
				>

				I have a passion for creating beautiful, intuitive and highly functional websites and
				applications. I have a strong interest in learning new technologies and frameworks and I'm
				always looking for new challenges. <br /> <br />The site you're currently seeing was created
				using
				<a href="https://tokio.rs/blog/2021-07-announcing-axum" class="skew-text" target="_blank"
					>Axum</a
				>
				a rust backend framework and
				<a href="https://kit.svelte.dev/" class="skew-text" target="_blank">SvelteKit</a>
				a javascript frontend framework. I'm currently working on a few projects and I'm always looking
				for new opportunities. If you have a project you'd like to discuss, feel free to contact me.
			</p>
			<div class="w-full">
				<button
					class="btn btn-sm variant-glass-surface w-full mt-8 rounded-none font-serif"
					on:click|preventDefault={downloadFile}
				>
					<span>View my resume</span>
					<span><FileHeart stroke-width="1.25" size="18px" /></span>
				</button>
			</div>
		</section>

		<footer class="card-footer">
			<div class=" flex flex-row justify-evenly">
				<a
					target="_blank"
					href="https://www.linkedin.com/in/acekavi"
					class="btn-icon variant-ringed"><Linkedin stroke-width="1.25" size="18" /></a
				>
				<a target="_blank" href="https://www.behance.net/acekavi" class="btn-icon variant-ringed"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						stroke="1.25px"
						class="fill-surface-800 dark:fill-surface-200"
						viewBox="0 0 576 512"
						><path
							d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z"
						/></svg
					></a
				>
				<a target="_blank" href="https://www.instagram.com/acekavi" class="btn-icon variant-ringed"
					><Instagram stroke-width="1.25" size="18" /></a
				>
				<a target="_blank" href="https://github.com/acekavi" class="btn-icon variant-ringed"
					><Github stroke-width="1.25" size="18" /></a
				>
			</div>
		</footer>
	</div>

	<div class="card my-16 lg:block hidden">
		<img src="/lg-self.png" alt="" srcset="" class="border-0 w-auto rounded-e-2xl lg:h-[70vh]" />
	</div>

	<div class="card my-16 rounded-full lg:hidden block">
		<img src="/md-self.png" alt="" srcset="" class="border-0 rounded-full w-80" />
	</div>
</div>

<style lang="postcss">
	.gradient-aboutme {
		@apply bg-clip-text text-transparent box-decoration-clone;
		/* Direction */
		@apply bg-gradient-to-bl;
		/* Color Stops */
		@apply from-emerald-500 from-10% via-indigo-400 via-40% to-purple-400 to-90%;
	}
</style>
