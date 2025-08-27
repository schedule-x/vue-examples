<script setup lang="ts">
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewDay,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import {shallowRef} from "vue";
import {draw} from "./plugins/draw.ts";
import 'temporal-polyfill/global'

// Important. Use shallowRef instead of ref, since ref makes all child properties reactive, which causes errors in the calendar.
const calendarApp = shallowRef(createCalendar({
  selectedDate: Temporal.PlainDate.from('2025-03-01'),
  timezone: 'Europe/Berlin',
  views: [
    createViewDay(),
    createViewWeek(),
    createViewMonthGrid(),
  ],
  plugins: [
    draw,
  ],
  callbacks: {
    onMouseDownDateTime(dateTime, mouseDownEvent) {
      draw.drawTimeGridEvent(dateTime, mouseDownEvent, {
        title: 'Unknown event'
      })
    },

    onMouseDownMonthGridDate(date, _mouseDownEvent) {
      console.log(_mouseDownEvent)
      draw.drawMonthGridEvent(date, {
        title: 'Unknown event'
      })
    },

    onMouseDownDateGridDate(date, mouseDownEvent) {
      draw.drawDateGridEvent(date, mouseDownEvent, {
        title: 'Unknown event'
      })
    }
  },
  events: [
    {
      id: 1,
      title: 'Event 1',
      start: Temporal.PlainDate.from('2025-03-01'),
      end: Temporal.PlainDate.from('2025-03-01'),
    },
    {
      id: 2,
      title: 'Event 2',
      start: Temporal.ZonedDateTime.from('2025-03-02T12:00:00+09:00[Asia/Tokyo]'),
      end: Temporal.ZonedDateTime.from('2025-03-02T13:00:00+09:00[Asia/Tokyo]'),
    },
  ],
}))
</script>

<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>
