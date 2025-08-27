import {createInputField, createInteractiveEventModal} from "@sx-premium/interactive-event-modal";
import {eventsService} from "./events-service.ts";
import 'temporal-polyfill/global'

const regionInputField = createInputField({
  label: 'Region',
  type: 'select',
  items: [],
})

const countryInputField = createInputField({
  label: 'Country',
  type: 'select',
  items: [
    { label: 'USA', value: 'USA' },
    { label: 'Germany', value: 'Germany' },
  ],
  onChange: (value) => {
    console.log(eventModal.formValues.value)
    eventModal.formValues.value = {
      ...eventModal.formValues.value,
      region: '',
    }
    regionInputField.value.rerender()
    console.log(eventModal.formValues.value)

    if (value === 'USA') {
      regionInputField.value = {
        ...regionInputField.value,
        items: [
          { label: 'California', value: 'ca' },
          { label: 'New York', value: 'ny' },
        ]
      }
    } else if (value === 'Germany') {
      regionInputField.value = {
        ...regionInputField.value,
        items: [
          { label: 'Berlin', value: 'berlin' },
          { label: 'Munich', value: 'munich' },
        ]
      }
    }
  }
});

export const eventModal = createInteractiveEventModal({
  eventsService,

  onAddEvent: (event) => {
    console.log(event)
    // save the event on your server
  },

  // (Optional): callback for when an event is updated
  onDeleteEvent: (eventId) => {
    console.log(eventId)
    // delete the event from your server
  },

  fields: {
    title: {},
    startDate: {},
    startTime: {},
    endDate: {},
    endTime: {},
  },

  customFields: {
    country: countryInputField,
    region: regionInputField,
  }
})
