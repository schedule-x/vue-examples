<script setup>
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

// Important. Use shallowRef instead of ref, since ref makes all child properties reactive, which causes errors in the calendar.
const calendarApp = shallowRef(createCalendar({
  selectedDate: '2025-03-01',
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
      start: '2025-03-01 02:00',
      end: '2025-03-01 05:00',
      resourceId: '1'
    },
    {
      id: 2,
      title: 'Event 2',
      start: '2025-03-01 02:00',
      end: '2025-03-01 04:00',
      resourceId: '2'
    }
  ],
}))
</script>

<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>
