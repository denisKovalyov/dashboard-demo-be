import { Widget } from '../types';

export const convertChartData = (data: Widget[]) =>
  data.map((widget) => {
    if (widget.type !== 'text') {
      try {
        widget.data = JSON.parse(widget.data as unknown as string);
      } catch (err) {
        console.error('Failed to parse chart data for widget', widget.id, err);
        widget.data = { labels: [], datasets: [] };
      }
    }
    return widget;
  });
