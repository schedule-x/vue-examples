<script setup lang="ts">
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
import {eventsService} from "./plugins/events-service.ts";
import {eventModal} from "./plugins/modal.ts";
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
      start: Temporal.ZonedDateTime.from('2025-03-01T12:00:00+09:00[Asia/Tokyo]'),
      end: Temporal.ZonedDateTime.from('2025-03-01T13:00:00+09:00[Asia/Tokyo]'),
      country: 'USA',
      region: 'ca',
    },
    {
      id: 2,
      title: 'Event 2',
      start: Temporal.ZonedDateTime.from('2025-03-02T12:00:00+09:00[Asia/Tokyo]'),
      end: Temporal.ZonedDateTime.from('2025-03-02T13:00:00+09:00[Asia/Tokyo]'),
      country: 'Germany',
      region: 'berlin',
    },
  ],
}))
</script>

<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendarApp">
      <template #timeGridEvent="{ calendarEvent }">
        <div style="border: 2px solid black; border-radius: 2px; padding: 2px; height: 100%;">
          <div v-if="calendarEvent">
            {{ calendarEvent.title }}
          </div>

          <div v-if="calendarEvent">
            {{ calendarEvent.country }}
          </div>

          <div v-if="calendarEvent">
            {{ calendarEvent.region }}
          </div>
      </div>
      </template>
    </ScheduleXCalendar>
  </div>
</template>
