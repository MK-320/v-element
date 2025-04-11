<template>
  <div
    class="vm-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <Tooltip
      placement="bottom-start"
      manual
      ref="tooltipRef"
      :popper-options="popperOptions"
      @click-outside="controlDropdown(false)"
    >
      <Input
        v-model="states.inputValue"
        :disabled="disabled"
        s
        :placeholder="filteredPlaceholder"
        ref="inputRef"
        :readonly="!filterable || !isDropdownShown"
        @input="debounceOnFilter"
        @keydown="handleKeydown"
      >
        <template #suffix>
          <Icon
            v-if="showClearIcon"
            icon="circle-xmark"
            class="vm-input__clear"
            @mousedown.prevent="NOOP"
            @click.stop="onClear"
          />
          <Icon
            v-else
            icon="angle-down"
            class="header-angsle"
            :class="{ 'is-active': isDropdownShown }"
          />
        </template>
      </Input>
      <template #content>
        <div class="vm-select__loading" v-if="states.loading">
          <Icon icon="spinner" spin />
        </div>
        <div
          class="vm-select__nodata"
          v-else-if="filterable && filteredOptions.length === 0"
        >
          no matching data
        </div>
        <ul class="vm-select__menu" v-else>
          <template v-for="(item, index) in filteredOptions" :keys="index">
            <li
              class="vm-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVNode :vNode="renderLabel ? renderLabel(item) : item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import type { Ref } from "vue";
import { isFunction, debounce } from "lodash-es";
import Tooltip from "@/components/Tooltip/Tooltip.vue";
import Input from "@/components/Input/Input.vue";
import Icon from "@/components/Icon/icon.vue";
import RenderVNode from "../Common/RenderVNode";
import type { SelectEmits, SelectProps, SelectOption, SelectStates } from "./types";
import type { TooltipInstance } from "../Tooltip/types";
import type { InputInstance } from "../Input/types";
const findOption = (value: string) => {
  const option = props.options.find((option) => option.value === value);
  return option ? option : null;
};
defineOptions({
  name: "VmSelect",
  inheritAttrs: false,
});
const timeout = computed(() => (props.remote ? 300 : 0));
const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [], //函数式传入一个空的数组
});
const emits = defineEmits<SelectEmits>();
const initialOption = findOption(props.modelValue);
const tooltipRef = ref() as Ref<TooltipInstance>;
const inputRef = ref() as Ref<InputInstance>;
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
const filteredOptions = ref(props.options);
watch(
  () => props.options,
  (newVal) => {
    filteredOptions.value = newVal;
  }
);

watch(
  () => props.modelValue,
  async (newValue) => {
    const updateOption = findOption(newValue);
    states.inputValue = updateOption ? updateOption.label : "";
    states.selectedOption = updateOption;
    const updatedValue = updateOption ? updateOption.value : "";
    emits("change", updatedValue);
    emits("update:modelValue", updatedValue);
  }
);

const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return;
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue);
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    states.loading = true;
    try {
      filteredOptions.value = await props.remoteMethod(searchValue);
    } catch (e) {
      console.error(e);
      filteredOptions.value = [];
    } finally {
      states.loading = false;
    }
  } else {
    filteredOptions.value = props.options.filter((option) =>
      option.label.includes(searchValue)
    );
  }
};

const onFilter = () => {
  generateFilterOptions(states.inputValue);
};
// 函数防抖，解决输入时频繁请求的问题
const debounceOnFilter = debounce(() => {
  onFilter();
}, timeout.value);

const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : "",
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
});
const filteredPlaceholder = computed(() => {
  return props.filterable && states.selectedOption && isDropdownShown.value
    ? states.selectedOption.label
    : props.placeholder;
});
const controlDropdown = (show: boolean) => {
  if (show) {
    // filter 模式
    //且之前过滤过值
    if (props.filterable && states.inputValue) {
      states.inputValue = "";
    }
    //进行一次默认选项的生成
    if (props.filterable) {
      generateFilterOptions(states.inputValue);
    }
    tooltipRef.value.show();
  } else {
    tooltipRef.value.hide();
    // blur 的时候将之前的值回灌到input中
    if (props.filterable) {
      states.inputValue = states.selectedOption ? states.selectedOption.label : "";
    }
  }
  isDropdownShown.value = show;
  emits("visible-change", show);
};
//支持键盘操作
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case "Enter":
      if (!isDropdownShown.value) {
        controlDropdown(true);
      } else {
        if (states.highlightIndex > -1 && filteredOptions.value[states.highlightIndex]) {
          itemSelect(filteredOptions.value[states.highlightIndex]);
        } else {
          controlDropdown(false);
        }
      }
      break;
    case "Escape":
      if (isDropdownShown.value) {
        controlDropdown(false);
      }
      break;
    case "ArrowUp":
      e.preventDefault();
      // states.highlightIndex = -1
      if (filteredOptions.value.length > 0) {
        if (states.highlightIndex === -1 || states.highlightIndex === 0) {
          states.highlightIndex = filteredOptions.value.length - 1;
        } else {
          // move up
          states.highlightIndex--;
        }
      }
      break;
    case "ArrowDown":
      e.preventDefault();
      // states.highlightIndex = -1
      if (filteredOptions.value.length > 0) {
        if (
          states.highlightIndex === -1 ||
          states.highlightIndex === filteredOptions.value.length - 1
        ) {
          states.highlightIndex = 0;
        } else {
          // move up
          states.highlightIndex++;
        }
      }
      break;
    default:
      break;
  }
};
const showClearIcon = computed(() => {
  // hover 上去
  // props.clearable  为 true
  // 必须有过选项
  // input的值不能为空
  return (
    props.clearable &&
    states.inputValue.trim() !== "" &&
    states.selectedOption &&
    states.mouseHover
  );
});

const onClear = () => {
  states.inputValue = "";
  states.selectedOption = null;
  emits("clear");
  emits("change", "");
  emits("update:modelValue", "");
};
const NOOP = () => {};
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
  inputRef.value.ref.focus();
};
</script>
