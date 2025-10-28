import { FastifyInstance } from 'fastify';
import { dashboardRoutes } from './dashboards/routes.js';
import { widgetsRoutes } from './widgets/routes.js';

export async function registerModules(fastify: FastifyInstance) {
  await fastify.register(dashboardRoutes);
  await fastify.register(widgetsRoutes);
}
