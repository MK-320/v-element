import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
const useClickOutside = (
  elementRef: Ref<undefined | HTMLElement>,
  // eslint-disable-next-line no-unused-vars
  callback: (e: MouseEvent) => void,
) => {
  const handler = (e: MouseEvent) => {
    // e.target 表示当前的事件选中的dom元素，或者叫触发该事件的dom元素
    if (elementRef.value && e.target) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default useClickOutside
