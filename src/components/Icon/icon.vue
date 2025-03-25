<template>
  <i class="vm-icon">
    <font-awesome-icon v-bind="$props" />
  </i>
</template>

<script setup lang="ts">
import {} from 'vue'
import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
defineOptions({
  name: 'VmIcon',
  inheritAttrs: false, //$props默认是透传到根组件
})
defineProps<FontAwesomeIconProps>()
</script>

<style scoped></style>
