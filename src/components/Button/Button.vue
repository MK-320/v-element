<template>
  <button
    class="vm-button"
    ref="_ref"
    :class="{
      [`vm-button--${type}`]: type,
      [`vm-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading" />
    <Icon v-if="icon" :icon="icon" />
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../Icon/icon.vue'
import type { ButtonProps } from './types'
defineOptions({
  name: 'VmButton',
})
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button', // 原生button属性
})
const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref,
})
</script>

<style scoped>
</style>
