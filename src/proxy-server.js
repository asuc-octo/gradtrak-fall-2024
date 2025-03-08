import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
app.use(cors());

app.use('/api', createProxyMiddleware({
    target: 'https://stanfurdtime.com',
    changeOrigin: true,
}));

app.listen(3001, () => console.log('Proxy running on 3001'));