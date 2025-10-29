import { faker } from '@faker-js/faker';
import { ChartData } from '../types';

export function generateRandomChartData(points = 7): ChartData {
  const labels = Array.from({ length: points }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (points - 1 - i));
    return d.toLocaleDateString();
  });

  const datasetLabels = [
    'Revenue',
    'Sales',
    'Visitors',
    'Orders',
    'Profit',
    'Expenses',
    'Clicks',
    'Signups',
    'Subscriptions',
    'Traffic',
  ];

  const datasetsCount = faker.number.int({ min: 1, max: 7 });

  const datasets = Array.from({ length: datasetsCount }, () => ({
    label: faker.helpers.arrayElement(datasetLabels),
    data: Array.from({ length: points }, () => faker.number.float({ min: 10, max: 100 })),
  }));

  return { labels, datasets };
}
