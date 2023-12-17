import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { VitePluginFonts } from 'vite-plugin-fonts';
import Markdown from 'vite-plugin-vue-markdown'
// https://github.com/vitejs/vite/blob/master/src/node/config.ts

export default defineConfig({
  plugins: [
    Markdown(),
    VitePluginFonts({
      google: {
        families: [
          {
            /**
             * Family name (required)
             */
            name: 'Roboto',
    
    
            /**
             * enable non-blocking renderer
             *   <link rel="preload" href="xxx" as="style" onload="this.rel='stylesheet'">
             * default: true
             */
            defer: true,
          },
        ],
      },
    }),
    vue({
      include: [/\.vue$/, /\.md$/],
      template: {
        transformAssetUrls: {
          img: ['src', 'data-src'],
          SvgRender: ['src'],
          source: ['src'],
        },
        compilerOptions: {
          isCustomElement: (tag) => {
            return (
              tag.startsWith('emoji-picker') ||
              tag.startsWith('duet-date-picker')
            );
          },
        },
      },
    }),
  ],
  build: {
    manifest: true,
    target: 'chrome80',
    assetsDir: '_assets_nft',
    rollupOptions: {
      output: {
        manualChunks: {
          comlink: ['comlink'],
          lodash_es: ['lodash-es'],
        },
      },
    },
  },
  server: {
    port: 8080,
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
  },
  css: {
    preprocessorOptions: {
      stylus: {
        paths: ['node_modules', path.resolve('./src/styles')],
      },
    },
  },
  optimizeDeps: {
    include: ['swiper/vue'],
    exclude: [],
  },
});
