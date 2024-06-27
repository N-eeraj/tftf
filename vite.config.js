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
      '@contexts' : path.resolve(__dirname, './src/contexts'),
      '@hooks' : path.resolve(__dirname, './src/hooks'),
      '@utils' : path.resolve(__dirname, './src/utils'),
      '@images' : path.resolve(__dirname, './src/assets/images'),
      '@sounds' : path.resolve(__dirname, './src/assets/sounds'),
      '@icons' : path.resolve(__dirname, './src/components/icons'),
    }
  }
})
