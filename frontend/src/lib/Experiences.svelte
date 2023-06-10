<script>
	import { Avatar } from '@skeletonlabs/skeleton';
	import { filter, NoirLight } from '@skeletonlabs/skeleton';
</script>

<div
	class="container my-auto flex items-center justify-evenly flex-col lg:justify-center gap-x-32 gap-y-16 lg:p-0 snap-always snap-start lg:h-screen"
>
	<div class="card variant-glass w-4/5 rounded-none mt-8">
		<header class="card-header text-center">
			<p
				class="h1 lg:text-6xl text-4xl font-sans font-extrabold relative lg:-inset-y-14 gradient-experience pb-4 lg:p-0"
			>
				Work Experience
			</p>
		</header>
		<section class="pb-8 flex px-8">
			<p
				class="lg:text-l text-justify
            first-letter:text-6xl first-letter:font-bold
            first-letter:mr-2 first-letter:float-left h6"
			>
				I have been a freelance graphic designer since 2015. As I pursue my university studies in
				Computer Science at <span class="skew-text before:-skew-y-2 before:bg-[#108480]">
					<a href="https://www.westminster.ac.uk/" class="relative">University of Westminster,</a>
				</span>
				my passion has evolved into full-stack development. My internship at
				<span class="skew-text before:skew-y-6 before:bg-red-400">
					<a href="https://www.infor.com/" class="relative">Infor</a>
				</span>
				in 2022-2023 provided me with valuable industrial experience, fostering team collaboration
				and business etiquettes. <br /> <br />With a keen eye for aesthetics and a drive for
				immersive user experiences, I strive to blend creativity and technical expertise. Excited
				for the future of my career, I'm committed to continuous growth, embracing new technologies,
				and delivering high-quality work. Let's connect and bring your ideas to life.
			</p>
		</section>

		<footer class="card-footer flex flex-row justify-evenly pb-8">
			<div class="snap-mandatory snap-x flex flex-row flex-nowrap overflow-x-scroll gap-8">
				<div class="snap-center">
					<div class="card flex flex-col justify-center w-56">
						<header class="card-header mx-auto">
							<Avatar
								src="/Chathura.jpg"
								width="w-16"
								rounded="rounded-full"
								action={filter}
								actionParams="#NoirLight"
							/>
						</header>
						<section class="p-4 text-center">
							<p class="h6">Chathura De Silva</p>
							<p class="h6 text-xs">'Project Manager, Infor'</p>
						</section>
						<footer class="h6 card-footer text-sm text-center">
							"We are glad you chose Infor for your Internship, and I believe you've learnt a lot
							about the IT industry. The work you've engaged in was truly valuable for our product,
							and the feedback we've received was great! I wish you all the best for your future!"
						</footer>
					</div>
				</div>

				<div class="snap-center">
					<div class="card flex flex-col justify-center w-56">
						<header class="card-header mx-auto">
							<Avatar
								src="/Eranga.jpg"
								width="w-16"
								rounded="rounded-full"
								action={filter}
								actionParams="#NoirLight"
							/>
						</header>
						<section class="p-4 text-center">
							<p class="h6">Eranga Kapukotuwa</p>
							<p class="h6 text-xs">'Systems Architect, Infor'</p>
						</section>
						<footer class="h6 card-footer text-sm text-center">
							"Avishka has been one of the best professional personalities I have ever seen as an
							intern in the industry. Their dedication, work ethic, and skills have truly impressed
							me. It has been a pleasure to have Avishka as part of our team during their internship
							at Infor."
						</footer>
					</div>
				</div>

				<div class="snap-center">
					<div class="card flex flex-col justify-center w-56">
						<header class="card-header mx-auto">
							<Avatar
								src="/Agarshan.png"
								width="w-16"
								rounded="rounded-full"
								action={filter}
								actionParams="#NoirLight"
							/>
						</header>
						<section class="p-4 text-center">
							<p class="h6">Agarshan Senthamilpalan</p>
							<p class="h6 text-xs">'Software Engineer, Infor'</p>
						</section>
						<footer class="h6 card-footer text-sm text-center">
							"Thank you for your valuable contribution to our QA team. Your time with us was truly
							enjoyable. Your commitment to quality have made a significant impact on our projects.
							We appreciate your hard work and attention to detail."
						</footer>
					</div>
				</div>
			</div>
		</footer>
	</div>
</div>
