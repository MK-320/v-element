<template>
  <div class="vm-tooltip">
    <div class="vm-tooltip__trigger" ref="triggerNode" @click="togglePopper">
      <slot />
    </div>

    <div v-if="isOpen" class="vm-tooltip__content" ref="popperNode">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { createPopper } from '@popperjs/core'
import { ref, watch } from 'vue'
import type { Instance } from '@popperjs/core'
import type { TooltipProps, TooltipEmits } from './types'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'right',
})
let popperInstance: null | Instance = null
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()

const togglePopper = () => {
  isOpen.value = !isOpen.value
  emits('visible-change', isOpen.value)
}

watch(
  isOpen,
  (newVal) => {
    if (newVal) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, {
          placement: props.placement,
        })
      } else {
        popperInstance?.destroy()
      }
    }
  },
  { flush: 'post' },
)
</script>
<style scoped></style>
