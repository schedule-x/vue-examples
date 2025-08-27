<script setup lang="ts">
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewDay,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/drag-to-create/index.css'
import {shallowRef} from "vue";
import {dragToCreatePlugin} from "./plugins/drag-to-create-plugin.ts";
import {createEventsServicePlugin} from "@schedule-x/events-service";
import 'temporal-polyfill/global'
import { v4 as uuidv4 } from 'uuid'

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
    dragToCreatePlugin,
    createEventsServicePlugin(),
  ],
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

function handleDrag() {
  dragToCreatePlugin.dragToCreate(uuidv4(), {
    title: 'Unknown event'
  })
}
</script>

<template>
  <div>
    <div id="event-placeholder" draggable="true" @dragstart="handleDrag">Create new event</div>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>
