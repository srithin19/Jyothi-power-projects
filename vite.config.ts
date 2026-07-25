import { copyFileSync } from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/*
  GitHub Pages serves static files only: a request for /work/high-mast-lights
  has no matching file and returns the Pages 404. Serving index.html as 404.html
  makes Pages hand that deep link to the app, which then routes client-side.
*/
function githubPagesSpaFallback(): Plugin {
  return {
    name: 'gh-pages-spa-fallback',
    apply: 'build',
    closeBundle() {
      const dir = path.resolve('dist')
      copyFileSync(path.join(dir, 'index.html'), path.join(dir, '404.html'))
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
  build: {
    /*
      Split the three big vendors apart from app code. They change on upgrades
      only, so a content edit no longer invalidates the whole cached bundle for
      returning visitors.
    */
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('gsap')) return 'gsap'
          if (id.includes('motion') || id.includes('framer')) return 'motion'
          if (id.includes('react-dom') || id.includes('scheduler')) return 'react'
        },
      },
    },
  },
})
