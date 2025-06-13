import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'https://adijha.com',
	output: 'static',
	prefetch: true,
	compressHTML: true,
})
