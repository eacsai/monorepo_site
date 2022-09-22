export default function(app: any) {
  const { createProxyMiddleware } = require('http-proxy-middleware')
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:7001',
    changeOrigin: true,
  }));
}