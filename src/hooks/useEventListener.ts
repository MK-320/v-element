/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { onMounted, onBeforeUnmount, isRef, watch, unref } from 'vue'
import type { Ref } from 'vue'
export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => any,
) {
  if (isRef(target)) {
    watch(
      target,
      (value, oldValue) => {
        oldValue?.removeEventListener(event, handler)
        value?.addEventListener(event, handler)
      },
      { immediate: true },
    )
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}
