import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project URLs use /repository-name/.
// The GitHub Actions workflow sets this base automatically during deployment.
export default defineConfig({
  plugins: [react()],
  base: '/m-BDAY/',
})
