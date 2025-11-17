import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SassId',
      fileName: (format) => `sass-id.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      output: {
        globals: {
          // Add any global dependencies here if needed
        },
      },
    },
  },
  server: {
    open: '/index.html',
    host: true,        // 关键：暴露为 0.0.0.0，允许外部访问
    port: 5173,        // 可选：指定端口，默认就是 5173
    strictPort: true,  // 可选：如果端口被占用则报错，而不是自动换端口
  },
  json: {
    stringify: false
  },
  plugins: [
    {
      name: 'configure-response-headers',
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
          next();
        });
      }
    }
  ]
});