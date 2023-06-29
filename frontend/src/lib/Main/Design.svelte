<div
	class="container my-auto flex items-center justify-evenly lg:flex-row flex-col-reverse lg:justify-center snap-always snap-center lg:h-screen gap-x-32 gap-y-16"
>
	<div
		class="flex flex-col lg:flex-row-reverse justify-evenly items-center h-full my-auto overflow-y-scroll lg:p-0"
	>
		<div class="card lg:w-2/6 variant-glass w-4/5 rounded-none mt-8">
			<header class="card-header">
				<p
					class="lg:text-6xl text-4xl font-serif font-extrabold relative lg:-inset-x-10 lg:-inset-y-24 gradient-designs pb-4 lg:p-0 -rotate-12"
				>
					Designs
				</p>
			</header>
			<section class="mx-8 pb-8 border-b border-gray-500/10">
				<p>
					With a successful track record as a graphic design freelancer since 2015, I have
					specialized in a wide range of creative projects, including brand designs, logo designs,
					digital artworks, and vector creations. Proficient in industry-standard software such as
					Illustrator, Photoshop, Figma, Blender, and Unity, I leverage these tools to bring my
					clients' visions to life. <br /> <br />By staying up to date with the latest design trends
					and techniques, I ensure that my work is contemporary and impactful. From concept
					development to final execution, I approach each project with attention to detail,
					creativity, and a deep understanding of my clients' needs. With a passion for design and a
					commitment to excellence, I strive to deliver high-quality and visually stunning designs
					that exceed expectations.
				</p>
			</section>

			<footer class="card-footer flex flex-row justify-evenly pb-8 pt-8">
				<a href="https://www.behance.net/acekavi" class="btn variant-soft-primary" target="_blank">
					<span
						><svg
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							stroke="1.25px"
							class="fill-surface-800 dark:fill-surface-200"
							viewBox="0 0 576 512"
							><path
								d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z"
							/></svg
						></span
					>
					<span>View more on Behance</span>
				</a>
			</footer>
		</div>

		<div class="lg:w-2/6 w-3/5 h-[80vh] lg:h-full relative lg:overflow-x-auto overflow-x-scroll">
			<img
				src="/Eminem.png"
				alt="Yours truly, Stan!"
				class="absolute rounded-full top-20 left-1/4 h-60 z-10 motion-safe:animate-reverseshuffle"
			/>
			<img
				src="/Girl.png"
				alt="The girl i never met"
				class="absolute rounded-full top-[35%] h-64 z-30 motion-safe:animate-float"
			/>
			<img
				src="/Shinigami.png"
				alt="Scapegoat"
				class="absolute rounded-full top-[60%] left-1/3 h-60 z-10 motion-safe:animate-shuffle"
			/>
		</div>
	</div>
</div>

<style lang="postcss">
	.gradient-designs {
		@apply bg-clip-text text-transparent box-decoration-clone;
		/* Direction */
		@apply bg-gradient-to-tl;
		/* Color Stops */
		@apply from-primary-400 from-0% via-primary-700 via-40% to-primary-500 to-90%;
	}
</style>
