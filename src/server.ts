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
  });

  await registerModules(app);

  // Health check
  app.get('/', async () => ({ status: 'ok' }));

  const PORT = Number(process.env.PORT);
  if (!PORT) {
    throw new Error('PORT environment variable is missing!');
  }

  const HOST = process.env.HOST || 'localhost';

  await app.listen({ port: PORT, host: HOST });
  console.log(`Server running at ${HOST}:${PORT}`);
};

start();
