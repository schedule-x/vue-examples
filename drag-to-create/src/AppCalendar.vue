<script setup>
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

// Important. Use shallowRef instead of ref, since ref makes all child properties reactive, which causes errors in the calendar.
const calendarApp = shallowRef(createCalendar({
  selectedDate: '2025-03-01',
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
      start: '2025-03-01',
      end: '2025-03-01',
    },
    {
      id: 2,
      title: 'Event 2',
      start: '2025-03-02 12:00',
      end: '2025-03-02 13:00',
    },
  ],
}))

function handleDrag(event) {
  dragToCreatePlugin.dragToCreate(event, {
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
