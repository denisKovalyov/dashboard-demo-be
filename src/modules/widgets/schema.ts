export const createWidgetSchema = {
  body: {
    type: 'object',
    properties: {
      dashboardId: { type: 'integer', minimum: 1 },
      type: { type: 'string', enum: ['lineChart', 'barChart', 'text'] },
      position: { type: 'integer', minimum: 0 },
      data: { type: 'string' },
    },
    required: ['dashboardId', 'type', 'position'],
    additionalProperties: false,
    if: {
      properties: { type: { const: 'text' } },
    },
    then: {
      required: ['data'], // text widgets MUST have data
    },
    else: {
      // for charts, 'data' is optional (as it ignored anyway) but allowed
      properties: {
        data: { type: 'string' }, // allow it but no requirement
      },
    },
  },
};

export const updateTextWidgetSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer', minimum: 1 },
    },
    required: ['id'],
    additionalProperties: false,
  },
  body: {
    type: 'object',
    properties: {
      data: { type: 'string', minLength: 1 },
    },
    required: ['data'],
    additionalProperties: false,
  },
};

export const widgetIdParamSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer', minimum: 1 },
    },
    required: ['id'],
  },
};
