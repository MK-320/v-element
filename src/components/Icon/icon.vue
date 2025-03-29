<template>
  <i class="vm-icon" :class="{ [`vm-icon--${type}`]: type }" :style="customStyle" v-bind="$attrs">
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<script setup lang="ts">
import { omit } from 'lodash'
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconProps } from './types'

defineOptions({
  name: 'VmIcon',
  inheritAttrs: false, //当要使用透传属性时，可以使用$attrs 获取到所有的属性
})
// 使用 lodash 过滤 多余的属性
const props = defineProps<IconProps>()
// 过滤掉的属性不会进入到子组件
const filterProps = computed(() => omit(props, ['type', 'color']))
//内联属性优先级最高，会覆盖掉class
const customStyle = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<style scoped></style>
