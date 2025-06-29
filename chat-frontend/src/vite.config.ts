// vite.config.ts
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://frontend-reto-production.up.railway.app/api/chat',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
};
