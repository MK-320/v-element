<template>
  <Transition name="vm-alert-fade">
    <div
      class="vm-alert"
      v-if="visible"
      :class="{
        [`vm-alert__${type}`]: type,
        [`vm-alert__${effect}`]: effect,
      }"
    >
      <div class="vm-alert__content">
        {{ content }}
        <span>
          <slot />
        </span>
      </div>
      <div class="vm-alert__close" v-if="closable">
        <Icon @click.stop="visible = false" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { AlertProps, AlertEmits } from './types.ts'

import Icon from '../Icon/icon.vue'
defineOptions({
  name: 'vmAlert',
})

withDefaults(defineProps<AlertProps>(), {
  effect: 'light',
  closable: true,
})
const emits = defineEmits<AlertEmits>()
const visible = ref(true)

const hideAlert = () => {
  visible.value = false
  emits('close')
}
defineExpose({
  hide: () => hideAlert(),
})
</script>
