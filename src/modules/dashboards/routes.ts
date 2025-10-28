import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as service from './service.js';
import { dashboardIdParamSchema } from './schema.js';

const ROUTE_PREFIX = '/api/dashboard';

export async function dashboardRoutes(fastify: FastifyInstance) {
  fastify.get(`${ROUTE_PREFIX}`, async () => {
    return service.getAll();
  });

  fastify.get(
    `${ROUTE_PREFIX}/:id/widgets`,
    { schema: dashboardIdParamSchema },
    async (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
      const dashboardId = request.params.id;
      const dashboard = service.getById(dashboardId);

      if (!dashboard) {
        return reply.status(404).send({ error: 'Dashboard not found' });
      }

      return service.getAllWidgets(dashboardId);
    },
  );
}
