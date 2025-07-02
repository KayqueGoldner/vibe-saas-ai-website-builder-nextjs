import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // process for 30 seconds
    await step.sleep("processing-event", "30s");
    // finalizing for 10 seconds
    await step.sleep("finalizing-event", "10s");
    // saving for 10 seconds
    await step.sleep("saving-event", "10s");

    return { message: `Hello ${event.data.email}!` };
  },
);
