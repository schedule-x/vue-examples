import {createDragToCreatePlugin} from "@sx-premium/drag-to-create";

export const dragToCreatePlugin = createDragToCreatePlugin({
  onAddEvent(event) {
    console.log('Finished drawing', event)
    // Save the event to your database
  },
})
