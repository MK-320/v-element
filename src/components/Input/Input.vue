<template>
  <div class="vm-input" :class="{
    [`vm-input--${type}`]: type,
    [`vm-input--${size}`]: size,
    'is-disabled': disabled,
    'is-readonly': readonly,
    'is-prepend': $slots.prepend,
    'is-append': $slots.append,
    'is-prefix': $slots.prefix,
    'is-suffix': $slots.suffix,
    'is-focus': isFocus,
  }">
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="vm-input__prepend">
        <slot name="prepend" />
      </div>

      <div class="vm-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="vm-input__prefix">
          <slot name="prefix" />
        </span>

        <input class="vm-input__inner" v-bind="attrs" ref="inputRef"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" :disabled="disabled"
          :autocomplete="autocomplete" :placeholder="placeholder" :readonly="readonly" :autofocus="autofocus"
          :form="form" v-model="innerValue" @input="handleInput" @change="handleChange" @focus="handleFocus"
          @blur="handleBlur" />

        <!-- suffix slot -->
        <span class="vm-input__suffix" v-if="$slots.suffix || showClear || showPasswordArea" @click="keepFocus">
          <slot name="suffix" />
          <Icon icon="circle-xmark" v-if="showClear" class="vm-input__clear" @click="clear" @mousedown.prevent="NOOP" />
          <Icon icon="eye" v-if="showPasswordArea && passwordVisible" class="vm-input__password"
            @click="togglePasswordVisible" />
          <Icon icon="eye-slash" v-if="showPasswordArea && !passwordVisible" class="vm-input__password"
            @click="togglePasswordVisible" />
        </span>
      </div>

      <!-- append slot -->
      <div v-if="$slots.append" class="vm-input__append">
        <slot name="append" />
      </div>
    </template>

    <!-- textarea -->
    <template v-else>
      <textarea class="vm-textarea__wrapper" v-bind="attrs" ref="inputRef" :disabled="disabled"
        :autocomplete="autocomplete" :placeholder="placeholder" :readonly="readonly" :autofocus="autofocus" :form="form"
        v-model="innerValue" @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, useAttrs, nextTick, inject } from "vue";
import type { Ref } from "vue";
import type { InputProps, InputEmits } from "./types";
import Icon from "@/components/Icon/icon.vue";
import { formItemContextKey } from '../Form/types'
//import type { FormValidateFailure } from "../Form/types";
defineOptions({
  name: "VmInput",
  inheritAttrs: false,
});
const attrs = useAttrs();
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  autocomplete: "off",
});
const formItemContext = inject(formItemContextKey)
const runValidation = (trigger?: string) => {
  formItemContext?.validate(trigger).catch((e) => {
    console.log(e.errors);
  })
}
const emit = defineEmits<InputEmits>();
const innerValue = ref(props.modelValue);
const isFocus = ref(false);
const passwordVisible = ref(false);
const inputRef = ref() as Ref<HTMLInputElement>;

const showClear = computed(
  () => props.clearable && !props.disabled && !!innerValue.value && isFocus.value
);
const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && !!innerValue.value
);
const NOOP = () => {
  //空函数只是为了阻止默认的blur事件触发，因为blur事件触发之后，clearable按钮会消失
};
const keepFocus = async () => {
  await nextTick();
  inputRef.value.focus();
};
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};
const handleInput = () => {
  emit("update:modelValue", innerValue.value);
  emit("input", innerValue.value);
  runValidation('input')
};
const handleChange = () => {
  emit("change", innerValue.value);
  runValidation('change')
};
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true;
  emit("focus", event);
};
const handleBlur = (event: FocusEvent) => {
  isFocus.value = false;
  emit("blur", event);
  runValidation('blur')
};
const clear = () => {
  //console.log("clear triggered");
  innerValue.value = "";
  emit("update:modelValue", "");
  emit("clear");
  emit("input", "");
  emit("change", "");
};
//外部值更新时，内部值也要跟着更新
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);

defineExpose({
  ref: inputRef, //暴露出去的原生属性
});
</script>

<style scoped></style>
