import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project URLs use /repository-name/.
// The GitHub Actions workflow sets this base automatically during deployment.
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''}/` : '/',
})
