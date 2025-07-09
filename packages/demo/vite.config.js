import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/resizable-button/dist/resizable-button.mjs',
          dest: 'vendor',
        },
      ],
    }),
  ],
  server: {
    open: '/index.html',
  },
})
