import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'build', // Specify the custom build directory
//   },
//   server: {
//     proxy: {
//       '/api': 'https://chat-app-backend-x9jj.onrender.com',
//     },
//   },
// })

export default defineConfig({
  base: '/',  // Add this if your app is deployed at the root
  plugins: [react()],
});