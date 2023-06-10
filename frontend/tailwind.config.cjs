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
				shuffle: 'shuffle 6s ease-in-out infinite',
				reverseshuffle: 'reverseshuffle 4s ease-in-out infinite',
			  },
			keyframes: {
				float : {
					'0%, 100%': {
					transform: 'rotate(-2deg) translateY(25px)'
				  },
				  '50%': {
					transform: 'rotate(2deg) translateY(0px)'
				  },
				},
				shuffle : {
					'0%, 100%': {
					transform: 'translateX(25px) translateY(25px)'
				  },
				  '50%': {
					transform: 'translateX(-25px) translateY(-25px)'
				  },
				},
				reverseshuffle : {
					'0%, 100%': {
						transform: 'translateX(15px) translateY(-15px)'
					},
					'50%': {
						transform: 'translateX(-35px) translateY(15px)'
					},
				}
			  }
		},
	},
	plugins: [forms,typography,...skeleton()],
}
