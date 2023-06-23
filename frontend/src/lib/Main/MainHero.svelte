<div class="container h-screen snap-always snap-center">
	<div class="flex lg:flex-row flex-col-reverse justify-evenly items-center h-5/6">
		<div class="">
			<p class="lg:text-9xl font-serif font-semibold cursor-default">
				<span class="gradient-header">Designer</span>
			</p>
			<p class="lg:text-9xl font-serif font-semibold cursor-default">
				<span class="gradient-header">Developer</span>
			</p>
			<p class="lg:text-9xl font-serif font-semibold cursor-default">
				<span class="gradient-header">Human</span><span class="text-neutral-500 text-sm font-normal"
					>for now...</span
				>
			</p>
		</div>
		<div class="motion-safe:animate-float w-4/5 lg:w-auto">
			<img src="/astronaut.svg" alt="" srcset="" width="400px" />
		</div>
	</div>

	<div class="flex flex-col align-middle text-center">
		<div>
			<p class=" font-semibold font-sans text-neutral-500">Psst! <br /> Scroll down</p>
		</div>

		<div class="mx-auto pt-4">
			<svg
				class="animate-bounce w-6 h-6 fill-neutral-600"
				version="1.1"
				id="Layer_1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 330 330"
				xml:space="preserve"
			>
				<path
					id="XMLID_225_"
					d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
				/>
			</svg>
		</div>
	</div>
</div>

<style lang="postcss">
	.gradient-header {
		@apply bg-clip-text text-transparent box-decoration-clone;
		/* Direction */
		@apply bg-gradient-to-br;
		/* Color Stops */
		@apply from-primary-800 from-10% via-primary-700 via-40% to-primary-900 to-90%;
	}
</style>
