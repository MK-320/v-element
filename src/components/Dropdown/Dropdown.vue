<template>
  <div class="vm-dropdown">
    <Tooltip
      ref="tooltipRef"
      :placement="placement"
      :trigger="trigger"
      :popperOptions="popperOptions"
      :openDelay="openDelay"
      :closeDelay="closeDelay"
      @visible-change="visibleChange"
    >
      <slot />
      <!--这里的插槽会替换掉Tooltip组件名叫content的插槽的内容 -->
      <template #content>
        <ul class="vm-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="dropdown-placeholder"></li>
            <li
              class="vm-dropdown__item"
              :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
              :id="`dropdown-item-${item.key}`"
              @click="($event) => itemClick(item)"
            >
              <RenderVNode :vNode="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import type { DropdownEmits, DropdownProps, DropdownInstance, MenuOption } from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import type { TooltipInstance } from "../Tooltip/types";
import RenderVNode from "../Common/RenderVNode";
defineOptions({
  name: "VmDropdown",
});

const tooltipRef = ref() as Ref<TooltipInstance>;
const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true });
const emits = defineEmits<DropdownEmits>();
const visibleChange = (e: boolean) => {
  emits("visible-change", e);
};
const itemClick = (e: MenuOption) => {
  if (e.disabled) {
    return;
  }
  emits("select", e);
  if (props.hideAfterClick) {
    tooltipRef.value?.hide();
  }
};

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide(),
});
</script>

<style lang="scss" scoped></style>
