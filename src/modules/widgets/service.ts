import db from '../../db.js';
import { AddWidgetBody, ChartData, Widget } from './types';
import { generateRandomChartData } from './utils/chartDataGenerator.js';
import { convertChartData } from './utils/convertChartData.js';

export const getAll = (dashboardId: number): Widget[] => {
  let widgets = db
    .prepare('SELECT * FROM widgets WHERE dashboard_id = ? ORDER BY position ASC')
    .all(dashboardId) as Widget[];

  return convertChartData(widgets);
};

export const addWidget = ({
  dashboardId,
  type,
  data,
  position,
}: AddWidgetBody): Widget => {
  let dataString = data;
  let chartData;

  if (type !== 'text') {
    chartData = generateRandomChartData();
    dataString = JSON.stringify(chartData);
  }

  const stmt = db.prepare(`
    INSERT INTO widgets (dashboard_id, type, data, position)
    VALUES (?, ?, ?, ?)
  `);
  const info = stmt.run(dashboardId, type, dataString, position);

  return {
    id: info.lastInsertRowid as number,
    dashboard_id: dashboardId,
    type,
    position,
    data: type === 'text' ? (data as string) : (chartData as ChartData),
  };
};

export const isDashboardExists = (id: number): boolean => {
  const stmt = db.prepare<[number]>('SELECT 1 FROM dashboards WHERE id = ? LIMIT 1');
  const result = stmt.get(id);
  return !!result;
};

export const getById = (widgetId: number): Widget | undefined => {
  return db.prepare<[number], Widget>('SELECT * FROM widgets WHERE id = ?').get(widgetId);
};

export const updateWidget = (id: number, data: string): Widget | null => {
  db.prepare(
    'UPDATE widgets SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
  ).run(data, id);

  return db.prepare('SELECT * FROM widgets WHERE id = ?').get(id) as Widget;
};

export const deleteWidget = (widgetId: number): boolean => {
  const info = db.prepare('DELETE FROM widgets WHERE id = ?').run(widgetId);
  return info.changes > 0;
};
