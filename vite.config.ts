import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
// import commonjs from '@rollup/plugin-commonjs'
// import nodePolyfills from 'rollup-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // commonjs(),
    // nodePolyfills(),
  ],
  server: {
    port: 8080, // 使用的端口号
    open: true, // 是否自动打开浏览器
    watch: {
      usePolling: true, // 实时监听
      interval: 1000 // 监听的间隔时间(ms)
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})

