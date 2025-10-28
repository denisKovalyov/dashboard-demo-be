export type WidgetType = 'lineChart' | 'barChart' | 'text';

export type ChartData = {
  labels: string[];
  datasets: { label: string; data: number[] }[];
};

export interface Widget {
  id: number;
  dashboard_id: number;
  type: WidgetType;
  position: number;
  data: string | ChartData;
}

export interface AddWidgetBody extends Omit<Widget, 'id' | 'data' | 'dashboardId'> {
  dashboardId: number;
  data?: string;
}
