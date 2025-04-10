<template>
  <div class="vm-select" :class="{ 'is-disabled': disabled }" @click="toggleDropdown">
    <Tooltip
      placement="bottom-start"
      manual
      ref="tooltipRef"
      :popper-options="popperOptions"
    >
      <Input
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="placeholder"
        readonly
      />
      <template #content>
        <ul class="vm-select__menu">
          <template v-for="(item, index) in options" :keys="index">
            <li
              class="vm-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              {{ item.label }}
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, defineOptions, defineEmits, defineProps, reactive } from "vue";
import type { Ref } from "vue";
import Tooltip from "@/components/Tooltip/Tooltip.vue";
import type { SelectEmits, SelectProps, SelectOption, SelectStates } from "./types";
import type { TooltipInstance } from "../Tooltip/types";
const findOption = (value: string) => {
  const option = props.options?.find((option) => option.value === value);
  return option ? option : null;
};
defineOptions({
  name: "VmSelect",
  inheritAttrs: false,
});
const props = defineProps<SelectProps>();
const emits = defineEmits<SelectEmits>();
const initialOption = findOption(props.modelValue);
const tooltipRef = ref() as Ref<TooltipInstance>;
const isDropdownShown = ref(false);

const popperOptions: any = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    },
  ],
};

const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : "",
  selectedOption: initialOption,
});
const controlDropdown = (show: boolean) => {
  if (show) {
    tooltipRef.value.show();
  } else {
    tooltipRef.value.hide();
  }
  isDropdownShown.value = show;
  emits("visible-change", show);
};
const toggleDropdown = () => {
  if (props.disabled) return;
  if (isDropdownShown.value) {
    controlDropdown(false);
  } else {
    controlDropdown(true);
  }
};
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return;
  states.inputValue = e.label;
  states.selectedOption = e;
  emits("change", e.value);
  emits("update:modelValue", e.value);
  controlDropdown(false);
};
</script>
