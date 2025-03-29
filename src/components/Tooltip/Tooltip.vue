<template>
  <div class="vm-tooltip" ref="popperContainNode" v-on="outerEvents">
    <div class="vm-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>

    <Transition :name="transition">
      <div v-if="isOpen" class="vm-tooltip__popper" ref="popperNode">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { createPopper } from '@popperjs/core'
import { reactive, ref, watch, onUnmounted, computed } from 'vue'
import type { Instance } from '@popperjs/core'
import { debounce } from 'lodash-es'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import useClickOutside from '@/hooks/useClickOutside'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'right',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0,
})
let popperInstance: null | Instance = null
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const popperContainNode = ref<HTMLElement>()
//let openTimes = 0
//let closeTimes = 0

const popperOptions = computed(() => {
  return {
    placement: props.placement, // 优先级更低
    ...props.popperOptions
  }
})

let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})

const open = () => {

  // openTimes++
  //console.log("输出openTimes：", openTimes);
  isOpen.value = true
  emits('visible-change', true)

}
const close = () => {

  //closeTimes++
  //console.log("输出closeTimes：", closeTimes);
  isOpen.value = false
  emits('visible-change', false)

}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}
const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}

useClickOutside(popperContainNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()

  }
})
const attachEvent = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    outerEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
if (!props.manual) {
  attachEvent()
}
watch(() => props.manual, (isManual) => {
  if (isManual) {
    events = {}
    outerEvents = {}
  } else {
    attachEvent()
  }
})
/*
如果不增加这个watch监听器，当trigger属性动态变化时会出现：
事件监听叠加：新旧事件处理函数会同时存在，新的事件会叠加在旧的事件上
多次触发：比如hover和click事件会同时响应
内存泄漏：旧的事件监听不会被清除
行为异常：可能同时触发open和toggle逻辑
难以调试：事件响应次数不符合预期
*/
watch(() => props.trigger, (newTrigger, oldTrigger) => {
  if (oldTrigger !== newTrigger) {
    events = {}
    outerEvents = {}
    attachEvent()
  }
})
watch(isOpen, (newVal) => {
  if (newVal) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
    } else {
      popperInstance?.destroy()
    }
  }
},
  { flush: 'post' })
onUnmounted(() => {
  popperInstance?.destroy()
})
defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal
})
/* 手动触发总结：
   1.其实就是先把一些事件绑定去掉，例如if (!props.manual) {attachEvent()}
   2.接着再新建一个对应的实例，然后在实例上对应的加上一些函数调用，记得要暴露出去
   3.最后在外部调用对应的函数即可

*/
</script>
<style scoped>
/**.vm-tooltip {
  border: 2px solid blue
}

.vm-tooltip__trigger {
  border: 2px solid red;
}

.vm-tooltip__popper {
  border: 2px solid green;
}**/
</style>
