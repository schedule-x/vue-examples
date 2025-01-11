import { createDailyView, createHourlyView, createConfig } from '@sx-premium/resource-scheduler'

const resourceConfig = createConfig();
export const hourlyView = createHourlyView(resourceConfig);
export const dailyView = createDailyView(resourceConfig);

resourceConfig.resources.value = [
  {
    label: 'Room 100',
    id: '1'
  },
  {
    label: 'Room 102', // Use the default label, with a little color-icon for the resource next to it, or use the labelHTML property to customize the label
    // labelHTML: '<span>Room <strong>101</strong></span>',
    id: '2',
    colorName: 'room-101',
    lightColors: {
      main: '#1c7df9',
      container: '#d2e7ff',
      onContainer: '#002859'
    },
    darkColors: {
      main: '#c0dfff',
      onContainer: '#dee6ff',
      container: '#426aa2'
    }
  }
]
