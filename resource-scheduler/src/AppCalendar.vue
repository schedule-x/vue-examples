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
}))
</script>

<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>
