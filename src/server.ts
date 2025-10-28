import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
dotenv.config();

const start = async () => {
  const app = Fastify({ logger: true });
  await app.register(cors, {
    origin: process.env.CORS_ORIGIN || '*',
  });

  // Health check
  app.get('/', async () => ({ status: 'ok' }));

  const PORT = Number(process.env.PORT) || 3000;
  const HOST = process.env.HOST || 'localhost';

  await app.listen({ port: PORT, host: HOST });
  console.log(`Server running at ${HOST}:${PORT}`);
};

start();
