import simple from "simple-mock";
import { receiverOn } from "../../src/event-handler/on";
import { State } from "../../src/types";

function noop() {}

const state: State = {
  hooks: {},
};

// Test broken with TypeScript without the ignore
test("receiver.on with invalid event name", () => {
  simple.mock(console, "warn").callFn(function () {});
  // @ts-ignore
  receiverOn(state, "foo", noop);
  expect((console.warn as simple.Stub<void>).callCount).toBe(1);
  expect((console.warn as simple.Stub<void>).lastCall.arg).toBe(
    '"foo" is not a known webhook name (https://developer.github.com/v3/activity/events/types/)'
  );

  simple.restore();
});
