<template>
  <div
    class="vm-switch"
    :class="{
      [`vm-switch--${size}`]: size,
      'is-checked': checked,
      'is-disabled': disabled,
    }"
    @click="switchValue"
  >
    <input
      class="vm-switch__input"
      type="checkbox"
      role="switch"
      ref="input"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />

    <div class="vm-switch__core">
      <div class="vm-switch__core-inner">
        <span v-if="activeText || inactiveText" class="vm-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="vm-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import type { SwitchEmits, SwitchProps } from "./types";
defineOptions({
  name: "VmSwitch",
  inheritAttrs: false,
});
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});
const emits = defineEmits<SwitchEmits>();
const innerValue = ref(props.modelValue);
//现在是否被选中
const checked = computed(() => innerValue.value === props.activeValue);
const input = ref<HTMLInputElement>();
const switchValue = () => {
  if (props.disabled) return;
  const newValue = checked.value ? props.inactiveValue : props.activeValue;

  innerValue.value = newValue;
  emits("update:modelValue", newValue);
  emits("change", newValue);
};
onMounted(() => {
  input.value!.checked = checked.value;
});
watch(checked, (val) => {
  input.value!.checked = val;
});
watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal;
  }
);
</script>

<style lang="scss" scoped></style>
