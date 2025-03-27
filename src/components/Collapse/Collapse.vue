<template>
  <div class="vm-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'
defineOptions({
  name: 'VmCollapse',
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
// 这是一个响应式的数组，用于维护当前的激活面板
const activeNames = ref<NameType[]>(props.modelValue)
// 这里要监视的原因是 传入的的本地值只会在第一次赋值时有变化，后续的变化不会触发视图更新，所以要更新
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue
  },
)

if (props.accordion && activeNames.value.length > 1) {
  console.log('手风琴至少有一个面板')
}
const handleItemClick = (item: NameType) => {
  if (props.accordion) {
    //这段代码通常用于实现类似手风琴（Accordion）或选项卡（Tabs）的功能，
    // 其中只有一个选项可以处于活动状态。当用户点击不同的选项时，需要更新activeNames的值，
    // 以反映当前的活动状态。
    activeNames.value = [activeNames.value[0] === item ? '' : item]
  } else {
    const index = activeNames.value.indexOf(item)
    if (index > -1) {
      // 存在就删除
      activeNames.value.splice(index, 1)
    } else {
      //不存在就加进去
      activeNames.value.push(item)
    }
  }
  // 触发更新
  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}
provide(collapseContextKey, {
  activeNames,
  handleItemClick,
})
</script>

<style scoped></style>
