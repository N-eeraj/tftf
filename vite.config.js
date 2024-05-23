import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/tftf/' : '/',
  plugins: [react()],
  resolve:{
    alias: {
      '@' : path.resolve(__dirname, './src'),
      '@router' : path.resolve(__dirname, './src/router'),
      '@layouts' : path.resolve(__dirname, './src/layouts'),
      '@pages' : path.resolve(__dirname, './src/pages'),
      '@components' : path.resolve(__dirname, './src/components'),
      '@hooks' : path.resolve(__dirname, './src/hooks'),
      '@utils' : path.resolve(__dirname, './src/utils'),
      '@sounds' : path.resolve(__dirname, './src/assets/sounds'),
    }
  }
})
