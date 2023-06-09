import { join } from 'path'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import skeleton from '@skeletonlabs/skeleton/tailwind/skeleton.cjs'

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			animation: {
				float: 'float 5s ease-in-out infinite',
			  },
			keyframes: {
				float : {
					'0%, 100%': {
					transform: 'rotate(-2deg) translateY(25px)'
				  },
				  '50%': {
					transform: 'rotate(2deg) translateY(0px)'
				  },
				}
			  }
		},
	},
	plugins: [forms,typography,...skeleton()],
}
