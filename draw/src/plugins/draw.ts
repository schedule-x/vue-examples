import {createDrawPlugin} from "@sx-premium/draw";

export const draw = createDrawPlugin({
  onFinishDrawing(event) {
    console.log('Finished drawing', event)
    // Save the event to your database
  },
})
