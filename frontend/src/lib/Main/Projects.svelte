<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<div class="container lg:h-screen snap-always snap-center gap-x-32 gap-y-16 lg:p-0">
	<div
		class="flex flex-col lg:flex-row justify-evenly items-center h-full my-auto overflow-y-scroll"
	>
		<div class="card lg:w-2/6 variant-glass w-4/5 rounded-none mt-8">
			<header class="card-header text-right">
				<p
					class=" lg:text-6xl text-4xl font-serif font-extrabold relative lg:-inset-x-10 lg:-inset-y-14 gradient-projects pb-4 lg:p-0"
				>
					Projects
				</p>
			</header>
			<section class="pt-4 lg:p-0">
				<p class=" text-normal px-8">
					In my journey as a developer, I've gained extensive experience working with a wide range
					of technologies. From Java, Java Swing, Python, and Django to CSS preprocessors like Sass,
					frameworks like TailwindCSS and Bootstrap, and modern languages like Rust, Axum, Angular,
					Ionic, and SvelteKit, I've explored diverse areas of software development. <br />
					<br />These technologies have equipped me with the skills to create visually appealing,
					responsive user interfaces, develop robust and scalable backend systems, and build dynamic
					web applications. I'm passionate about continuous learning and staying up-to-date with
					industry trends.
				</p>
			</section>

			<footer
				class="flex flex-row lg:gap-4 gap-2 mx-10 flex-no-wrap overflow-x-scroll lg:overflow-auto lg:flex-wrap py-10"
			>
				<p class="font-sans w-full pb-2 border-b border-gray-500/10">
					Technologies I'm familiar with
				</p>
				<div class="tech_stack">
					<span>Java</span>
				</div>

				<div class="tech_stack">
					<span>Python</span>
				</div>

				<div class="tech_stack">
					<span>Javascript</span>
				</div>

				<div class="tech_stack">
					<span>Rust</span>
				</div>

				<div class="tech_stack">
					<span>git</span>
				</div>

				<div class="tech_stack">
					<span>SvelteKit</span>
				</div>

				<div class="tech_stack">
					<span>ReactJS</span>
				</div>

				<div class="tech_stack">
					<span>Angular</span>
				</div>

				<div class="tech_stack">
					<span>Django</span>
				</div>

				<div class="tech_stack">
					<span>Axum</span>
				</div>

				<div class="tech_stack">
					<span>PostgreSQL</span>
				</div>

				<div class="tech_stack">
					<span>Docker</span>
				</div>

				<div class="tech_stack">
					<span>Sass</span>
				</div>

				<div class="tech_stack">
					<span>Bootstrap</span>
				</div>

				<div class="tech_stack">
					<span>TailwindCSS</span>
				</div>

				<div class="tech_stack">
					<span>AWS</span>
				</div>

				<div class="tech_stack">
					<span>Digital Ocean</span>
				</div>
			</footer>
		</div>

		<div class="card lg:w-2/6 variant-glass w-4/5 mt-8 lg:m-0">
			<Accordion autocollapse>
				<AccordionItem open>
					<svelte:fragment slot="summary"
						><p class="font-sans text-xl">Snake Eyes</p></svelte:fragment
					>
					<svelte:fragment slot="content">
						<p class="text-sm">
							Snake Eyes is a cutting-edge mobile application built using Kotlin. It utilizes YOLO
							v4, a state-of-the-art object detection algorithm, and integrates with TensorFlow for
							real-time snake detection. The app's primary functionality is to identify and track
							snakes through the device's camera feed. By leveraging the power of deep learning and
							computer vision, Snake Eyes provides users with accurate and instantaneous snake
							detection, enhancing safety in snake-prone areas. The Kotlin programming language
							enables efficient and concise code development, while the integration with YOLO v4 and
							TensorFlow ensures robust and reliable object recognition. Snake Eyes is a testament
							to my proficiency in Kotlin, machine learning, and mobile app development, showcasing
							my ability to leverage emerging technologies for practical and impactful solutions.
						</p>
						<button class="accordian-btn btn btn-sm"
							><a href="https://github.com/acekavi/SnakeEyes">Github</a></button
						>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary"
						><p class="font-sans text-xl">Formula One Manager</p></svelte:fragment
					>
					<svelte:fragment slot="content">
						<p class="text-sm">
							For a campus project, I developed a Formula One manager software using Java. The
							software was designed to handle various aspects of managing a Formula One team,
							including driver selection, race scheduling, and performance analysis. The graphical
							user interface (GUI) was built using JavaFX and Java Swing, providing an intuitive and
							interactive user experience. Leveraging Java's robustness and versatility, the
							software offered functionalities such as data storage, calculations, and visual
							representation of race statistics. This project allowed me to showcase my Java
							programming skills and demonstrate my ability to create user-friendly applications for
							real-world scenarios.
						</p>
						<button class="accordian-btn btn btn-sm"
							><a href="https://github.com/acekavi/coursework_oop">Github</a></button
						>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary"
						><p class="font-sans text-xl">Clarks.lk</p></svelte:fragment
					>
					<svelte:fragment slot="content">
						<p class="text-sm">
							Clarks.lk is a dynamic website developed for a campus project, serving as an
							e-commerce store dedicated to shoes. The website was crafted using JavaScript, Sass,
							and jQuery, harnessing the power of these technologies to deliver an engaging and
							user-friendly online shopping experience. With JavaScript's versatility, Sass's
							efficient styling capabilities, and jQuery's simplified DOM manipulation, the website
							offers seamless navigation, intuitive product browsing, and secure payment processing.
							Clarks.lk demonstrates my proficiency in frontend web development, highlighting my
							ability to create visually appealing and functional e-commerce platforms for
							real-world applications.
						</p>
						<button class="accordian-btn btn btn-sm"
							><a href="https://acekavi.github.io/clarkslk/">Demo</a></button
						>
						<button class="accordian-btn btn btn-sm ms-4"
							><a href="https://github.com/acekavi/clarkslk">Github</a></button
						>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary"><p class="font-sans text-xl">Playah!</p></svelte:fragment>
					<svelte:fragment slot="content">
						<p class="text-sm">
							Playah! is a vibrant web application designed for streaming music. Built using
							ReactJS, it delivers a modern and colorful user interface (UI) that enhances the
							user's music listening experience. The application provides seamless music playback,
							allowing users to explore and enjoy their favorite tracks effortlessly. Leveraging
							React's component-based architecture, Playah! offers a dynamic and responsive UI,
							ensuring smooth navigation and interactive features. Whether searching for new songs,
							creating personalized playlists, or discovering trending tracks, Playah! delivers a
							visually appealing and user-friendly platform for music enthusiasts to indulge in
							their passion for music.
						</p>
						<button class="accordian-btn btn btn-sm"
							><a href="https://acekavi.github.io/music-player/">Demo</a></button
						>
						<button class="accordian-btn btn btn-sm ms-4"
							><a href="https://github.com/acekavi/music-player/">Github</a></button
						>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary"><p class="font-sans text-xl">Mathtrix</p></svelte:fragment
					>
					<svelte:fragment slot="content">
						<p class="text-sm">
							Mathtrix is a command-line interface (CLI) game developed using Python. It offers
							users random math problems to solve and keeps track of their high scores. The game
							serves as a practical tool for learning and reinforcing the fundamentals of Python
							programming and handling a database. By integrating Python's core functionalities,
							Mathtrix generates dynamic math challenges and provides an interactive experience for
							players. It leverages database handling techniques to store and retrieve high scores,
							allowing users to track their progress and compete with others. Through developing
							Mathtrix, I honed my Python programming skills, gaining a deeper understanding of core
							concepts and database management. This project showcases my ability to create engaging
							and educational applications using Python, fostering a fun and interactive environment
							for users to improve their math skills while exploring the fundamentals of
							programming.
						</p>
						<button class="accordian-btn btn btn-sm">
							<a href="https://github.com/acekavi/Mathtrix">Github</a></button
						>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary"
						><p class="font-sans text-xl">PDF Exporting</p></svelte:fragment
					>
					<svelte:fragment slot="content">
						<p class="text-sm">
							The PDF Templating web application is specifically designed for generating PDF
							documents using jsPDF and the AutoTable plugin. Developed using Angular and Ionic, the
							application seamlessly integrates with iOS devices. Leveraging Angular's powerful
							framework and Ionic's hybrid development capabilities, it offers a robust and
							efficient solution for creating dynamic PDF templates. With the integration of jsPDF
							and the AutoTable plugin, users can generate professional-looking PDFs with ease. The
							application's cross-platform compatibility ensures a smooth user experience, allowing
							iOS users to leverage the benefits of hybrid app development for PDF templating and
							document generation.
						</p>
						<button class="accordian-btn btn btn-sm"
							><a href="https://github.com/acekavi/pdf-template">Github</a></button
						>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary"
						><p class="font-sans text-xl">Portfolio</p></svelte:fragment
					>
					<svelte:fragment slot="content">
						<p class="text-sm">
							I developed my previous portfolio and blog using Django, following the MVC
							architecture. I utilized Jinja for templating, jQuery for enhanced functionality, and
							CSS for styling. The website includes a fully functional blog section. For deployment,
							I utilized AWS EC2 for hosting, AWS RDS for managing a PostgreSQL database, and Nginx
							for server configuration. AWS S3 was employed for handling static files, ensuring
							efficient storage and delivery. This comprehensive setup showcased my ability to
							develop and deploy dynamic web applications using Django, while leveraging various AWS
							services for a reliable and scalable hosting solution.
						</p>
						<button class="accordian-btn btn btn-sm"
							><a href="https://github.com/acekavi/django-portfo">Github</a></button
						>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		</div>
	</div>
</div>

<style lang="postcss">
	.accordian-btn {
		@apply mt-4 bg-secondary-300 rounded-full dark:bg-secondary-600/40;
	}
	.tech_stack {
		@apply py-1 px-3 text-sm bg-secondary-300 rounded-lg dark:bg-secondary-600/40;
	}

	.gradient-projects {
		@apply bg-clip-text text-transparent box-decoration-clone;
		/* Direction */
		@apply bg-gradient-to-br;
		/* Color Stops */
		@apply from-secondary-500 from-10% via-secondary-700 via-40% to-secondary-500 to-90%;
	}
</style>
