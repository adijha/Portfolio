import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'https://adijha.github.io',
	base: '/Portfolio',
	output: 'static',
	prefetch: true,
	compressHTML: true,
})
