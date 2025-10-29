import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
dotenv.config();

import { registerModules } from './modules/index.js';

const start = async () => {
  const app = Fastify({
    logger: true,
    ajv: {
      customOptions: { coerceTypes: true },
    },
  });

  await app.register(cors, {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET','POST','PATCH','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await registerModules(app);

  // Health check
  app.get('/', async () => ({ status: 'ok' }));

  const PORT = Number(process.env.PORT) || 3000;
  const HOST = process.env.HOST || 'localhost';

  await app.listen({ port: PORT, host: HOST });
  console.log(`Server running at ${HOST}:${PORT}`);
};

start();
