import db from '../../db.js';
import { Dashboard } from './types';
import { Widget } from '../widgets/types.js';
import { getAll as getWidgets } from '../widgets/service.js';

export const getAll = (): Dashboard[] => {
  return db.prepare('SELECT * FROM dashboards').all() as Dashboard[];
};

export const getById = (id: number): Dashboard | undefined => {
  return db.prepare<[number], Dashboard>('SELECT * FROM dashboards WHERE id = ?').get(id);
};

export const getAllWidgets = (dashboardId: number): Widget[] => {
  return getWidgets(dashboardId);
};
