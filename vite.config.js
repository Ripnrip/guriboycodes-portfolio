import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    allowedHosts: true,
  },
  resolve: {
    alias: [
      // Cosmograph uses @/cosmograph internally — resolve it to the package's own directory first
      {
        find: /^@\/cosmograph\/(.*)/,
        replacement: path.resolve(
          __dirname,
          'node_modules/@cosmograph/cosmograph/cosmograph/$1'
        ),
      },
      // Then our own project alias
      {
        find: /^@\/(.*)/,
        replacement: path.resolve(__dirname, './src/$1'),
      },
    ],
  },
})
