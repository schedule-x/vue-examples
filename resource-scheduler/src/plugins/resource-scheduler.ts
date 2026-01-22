import { createDailyView, createHourlyView, createConfig } from '@sx-premium/resource-scheduler'

const resourceConfig = createConfig();
export const hourlyView = createHourlyView(resourceConfig);
export const dailyView = createDailyView(resourceConfig);
