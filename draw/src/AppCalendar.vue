<script setup>
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewDay,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/interactive-event-modal/index.css'
import {shallowRef} from "vue";
import {draw} from "./plugins/draw.ts";

// Important. Use shallowRef instead of ref, since ref makes all child properties reactive, which causes errors in the calendar.
const calendarApp = shallowRef(createCalendar({
  selectedDate: '2025-03-01',
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
</script>

<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>
