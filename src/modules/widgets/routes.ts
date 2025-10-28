import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import * as service from './service.js';
import { AddWidgetBody } from './types';
import {
  createWidgetSchema,
  updateTextWidgetSchema,
  widgetIdParamSchema,
} from './schema.js';

const ROUTE_PREFIX = '/api/widget';

export async function widgetsRoutes(fastify: FastifyInstance) {
  fastify.post(
    `${ROUTE_PREFIX}`,
    { schema: createWidgetSchema },
    async (request: FastifyRequest<{ Body: AddWidgetBody }>, reply: FastifyReply) => {
      const dashboard = service.isDashboardExists(request.body.dashboardId);

      if (!dashboard) {
        return reply.status(404).send({ error: 'Dashboard not found' });
      }

      try {
        const widget = service.addWidget(request.body);
        return reply.status(201).send(widget);
      } catch (err) {
        console.error(err);
        return reply.status(500).send({ error: 'Failed to add widget' });
      }
    },
  );

  fastify.patch(
    `${ROUTE_PREFIX}/:id`,
    { schema: updateTextWidgetSchema },
    async (
      request: FastifyRequest<{ Params: { id: number }; Body: { data: string } }>,
      reply: FastifyReply,
    ) => {
      const id = request.params.id;
      const data = request.body.data;

      const widget = service.getById(id);

      if (!widget || widget.type !== 'text') {
        return reply.status(404).send({ error: 'Widget not found' });
      }

      try {
        const widget = service.updateWidget(id, data);
        return reply.status(200).send(widget);
      } catch (err) {
        console.error(err);
        return reply.status(500).send({ error: 'Failed to update widget' });
      }
    },
  );

  fastify.delete(
    '/api/widget/:id',
    { schema: widgetIdParamSchema },
    async (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
      const deleted = service.deleteWidget(request.params.id);

      if (!deleted) {
        return reply.status(404).send({ error: 'Widget not found' });
      }

      return reply.status(204).send();
    },
  );
}
