<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<div class="container lg:h-screen snap-always snap-start gap-x-32 gap-y-16 lg:p-0">
	<div
		class="flex flex-col lg:flex-row justify-evenly items-center h-full my-auto overflow-y-scroll"
	>
		<div class="card lg:w-2/6 variant-glass w-4/5 rounded-none mt-8">
			<header class="card-header text-right">
				<p
					class="h1 lg:text-6xl text-4xl font-sans font-extrabold relative lg:-inset-x-10 lg:-inset-y-14 gradient-projects pb-4 lg:p-0"
				>
					Projects
				</p>
			</header>
			<section class="pt-4 lg:p-0">
				<p class="h6 text-normal px-8">
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
				<div class="variant-soft-secondary py-2 rounded-xl px-4">
					<span><i class="fa-brands fa-java" /></span>
					<span>Java</span>
				</div>

				<div class="variant-soft-secondary py-2 rounded-xl px-4">
					<span><i class="fa-brands fa-python" /></span>
					<span>Python</span>
				</div>

				<div class="variant-soft-secondary py-2 rounded-xl px-4">
					<span><i class="fa-brands fa-square-js" /></span>
					<span>Javascript</span>
				</div>

				<div class="variant-soft-secondary py-2 rounded-xl px-4">
					<span><i class="fa-brands fa-sass" /></span>
					<span>Sass</span>
				</div>

				<div class="variant-soft-secondary py-2 rounded-xl px-4">
					<span><i class="fa-brands fa-git" /></span>
					<span>git</span>
				</div>

				<div class="variant-soft-secondary py-2 rounded-xl px-4">
					<span><i class="fa-brands fa-react" /></span>
					<span>ReactJS</span>
				</div>

				<div class="variant-soft-secondary py-2 rounded-xl px-4">
					<span><i class="fa-brands fa-angular" /></span>
					<span>Angular</span>
				</div>

				<div class="variant-soft-secondary py-2 rounded-xl px-4">
					<span><i class="fa-brands fa-aws" /></span>
					<span>AWS</span>
				</div>

				<div class="variant-soft-secondary py-2 rounded-xl px-4">
					<span><i class="fa-brands fa-docker" /></span>
					<span>Docker</span>
				</div>

				<div class="variant-soft-secondary py-2 rounded-xl px-4">
					<span><i class="fa-brands fa-rust" /></span>
					<span>Rust</span>
				</div>

				<div class="variant-soft-secondary py-2 rounded-xl px-4">
					<span><i class="fa-brands fa-bootstrap" /></span>
					<span>Bootstrap</span>
				</div>
			</footer>
		</div>

		<div class="card lg:w-2/6 variant-glass w-4/5 mt-8 lg:m-0">
			<Accordion autocollapse>
				<AccordionItem open>
					<svelte:fragment slot="lead"
						><i class="fa-brands fa-java" /><i class="fa-brands fa-python ms-4" /></svelte:fragment
					>
					<svelte:fragment slot="summary">Snake Eyes</svelte:fragment>
					<svelte:fragment slot="content">
						Snake Eyes is a cutting-edge mobile application built using Kotlin. It utilizes YOLO v4,
						a state-of-the-art object detection algorithm, and integrates with TensorFlow for
						real-time snake detection. The app's primary functionality is to identify and track
						snakes through the device's camera feed. By leveraging the power of deep learning and
						computer vision, Snake Eyes provides users with accurate and instantaneous snake
						detection, enhancing safety in snake-prone areas. The Kotlin programming language
						enables efficient and concise code development, while the integration with YOLO v4 and
						TensorFlow ensures robust and reliable object recognition. Snake Eyes is a testament to
						my proficiency in Kotlin, machine learning, and mobile app development, showcasing my
						ability to leverage emerging technologies for practical and impactful solutions.
						<button class="btn btn-sm variant-soft-secondary block mt-4"
							><a href="https://github.com/acekavi/SnakeEyes">Github</a></button
						>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead"><i class="fa-brands fa-java" /></svelte:fragment>
					<svelte:fragment slot="summary">Formula One Manager</svelte:fragment>
					<svelte:fragment slot="content">
						For a campus project, I developed a Formula One manager software using Java. The
						software was designed to handle various aspects of managing a Formula One team,
						including driver selection, race scheduling, and performance analysis. The graphical
						user interface (GUI) was built using JavaFX and Java Swing, providing an intuitive and
						interactive user experience. Leveraging Java's robustness and versatility, the software
						offered functionalities such as data storage, calculations, and visual representation of
						race statistics. This project allowed me to showcase my Java programming skills and
						demonstrate my ability to create user-friendly applications for real-world scenarios.
						<button class="btn btn-sm variant-soft-secondary block mt-4"
							><a href="https://github.com/acekavi/coursework_oop">Github</a></button
						>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead"
						><i class="fa-brands fa-square-js" /><i
							class="fa-brands fa-sass ms-4"
						/></svelte:fragment
					>
					<svelte:fragment slot="summary">Clarks.lk</svelte:fragment>
					<svelte:fragment slot="content">
						Clarks.lk is a dynamic website developed for a campus project, serving as an e-commerce
						store dedicated to shoes. The website was crafted using JavaScript, Sass, and jQuery,
						harnessing the power of these technologies to deliver an engaging and user-friendly
						online shopping experience. With JavaScript's versatility, Sass's efficient styling
						capabilities, and jQuery's simplified DOM manipulation, the website offers seamless
						navigation, intuitive product browsing, and secure payment processing. Clarks.lk
						demonstrates my proficiency in frontend web development, highlighting my ability to
						create visually appealing and functional e-commerce platforms for real-world
						applications.
						<br /><button class="btn btn-sm variant-soft-secondary mt-4"
							><a href="https://acekavi.github.io/clarkslk/">Demo</a></button
						>
						<button class="btn btn-sm variant-soft-secondary mt-4 ms-4"
							><a href="https://github.com/acekavi/clarkslk">Github</a></button
						>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead"
						><i class="fa-brands fa-react" /><i class="fa-brands fa-sass ms-4" /></svelte:fragment
					>
					<svelte:fragment slot="summary">Playah!</svelte:fragment>
					<svelte:fragment slot="content">
						Playah! is a vibrant web application designed for streaming music. Built using ReactJS,
						it delivers a modern and colorful user interface (UI) that enhances the user's music
						listening experience. The application provides seamless music playback, allowing users
						to explore and enjoy their favorite tracks effortlessly. Leveraging React's
						component-based architecture, Playah! offers a dynamic and responsive UI, ensuring
						smooth navigation and interactive features. Whether searching for new songs, creating
						personalized playlists, or discovering trending tracks, Playah! delivers a visually
						appealing and user-friendly platform for music enthusiasts to indulge in their passion
						for music.
						<br /><button class="btn btn-sm variant-soft-secondary mt-4"
							><a href="https://acekavi.github.io/music-player/">Demo</a></button
						>
						<button class="btn btn-sm variant-soft-secondary mt-4 ms-4"
							><a href="https://github.com/acekavi/music-player/">Github</a></button
						>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead"><i class="fa-brands fa-python" /></svelte:fragment>
					<svelte:fragment slot="summary">Mathtrix</svelte:fragment>
					<svelte:fragment slot="content">
						<div>
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
						</div>
						<button class="btn btn-sm variant-soft-secondary mt-4">
							<a href="https://github.com/acekavi/Mathtrix">Github</a></button
						>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead"
						><i class="fa-brands fa-angular" /><i
							class="fa-brands fa-app-store-ios ms-4"
						/></svelte:fragment
					>
					<svelte:fragment slot="summary">PDF Exporting</svelte:fragment>
					<svelte:fragment slot="content">
						<div>
							The PDF Templating web application is specifically designed for generating PDF
							documents using jsPDF and the AutoTable plugin. Developed using Angular and Ionic, the
							application seamlessly integrates with iOS devices. Leveraging Angular's powerful
							framework and Ionic's hybrid development capabilities, it offers a robust and
							efficient solution for creating dynamic PDF templates. With the integration of jsPDF
							and the AutoTable plugin, users can generate professional-looking PDFs with ease. The
							application's cross-platform compatibility ensures a smooth user experience, allowing
							iOS users to leverage the benefits of hybrid app development for PDF templating and
							document generation.
						</div>
						<button class="btn btn-sm variant-soft-secondary mt-4"
							><a href="https://github.com/acekavi/pdf-template">Github</a></button
						>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead"
						><i class="fa-brands fa-python" /><i class="fa-brands fa-aws ms-4" /></svelte:fragment
					>
					<svelte:fragment slot="summary">Portfolio</svelte:fragment>
					<svelte:fragment slot="content">
						<div>
							I developed my previous portfolio and blog using Django, following the MVC
							architecture. I utilized Jinja for templating, jQuery for enhanced functionality, and
							CSS for styling. The website includes a fully functional blog section. For deployment,
							I utilized AWS EC2 for hosting, AWS RDS for managing a PostgreSQL database, and Nginx
							for server configuration. AWS S3 was employed for handling static files, ensuring
							efficient storage and delivery. This comprehensive setup showcased my ability to
							develop and deploy dynamic web applications using Django, while leveraging various AWS
							services for a reliable and scalable hosting solution.
						</div>
						<button class="btn btn-sm variant-soft-secondary mt-4"
							><a href="https://github.com/acekavi/django-portfo">Github</a></button
						>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		</div>
	</div>
</div>
