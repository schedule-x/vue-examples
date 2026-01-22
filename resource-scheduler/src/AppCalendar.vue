<script setup lang="ts">
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/resource-scheduler/index.css'
import '@sx-premium/interactive-event-modal/index.css'
import '@schedule-x/theme-default/dist/time-picker.css'
import {shallowRef} from "vue";
import {eventsService} from "./plugins/events-service.ts";
import {eventModal} from "./plugins/modal.ts";
import {dailyView, hourlyView} from "./plugins/resource-scheduler.ts";
import 'temporal-polyfill/global'

// Important. Use shallowRef instead of ref, since ref makes all child properties reactive, which causes errors in the calendar.
const calendarApp = shallowRef(createCalendar({
  selectedDate: Temporal.PlainDate.from('2025-03-01'),
  timezone: 'Asia/Tokyo',
  views: [
    hourlyView,
    dailyView,
  ],
  plugins: [
    eventsService,
    eventModal,
  ],
  callbacks: {
    onDoubleClickDateTime: (dateTime) => {
      eventModal.clickToCreate(dateTime)
    },
  },
  events: [
    {
      id: 1,
      title: 'Event 1',
      start: Temporal.ZonedDateTime.from('2025-03-01T02:00:00+09:00[Asia/Tokyo]'),
      end: Temporal.ZonedDateTime.from('2025-03-01T05:00:00+09:00[Asia/Tokyo]'),
      resourceId: '1'
    },
    {
      id: 2,
      title: 'Event 2',
      start: Temporal.ZonedDateTime.from('2025-03-01T02:00:00+09:00[Asia/Tokyo]'),
      end: Temporal.ZonedDateTime.from('2025-03-01T04:00:00+09:00[Asia/Tokyo]'),
      resourceId: '2'
    }
  ],
  resources: [
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
}))
</script>

<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>
