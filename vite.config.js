import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
    outDir: 'dist',
  },
  test: {
    // add jsdom to vite
    environment: 'jsdom',
    globals: true,
    setupFiles: "./src/admin/testSetup.js"
  }
})
