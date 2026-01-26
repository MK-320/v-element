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
        <Icon @click.stop="hideAlert" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref, toRefs } from "vue";
import type { AlertProps, AlertEmits } from "./types";

import Icon from "../Icon/icon.vue";
defineOptions({
  name: "VmAlert",
});

const props = withDefaults(defineProps<AlertProps>(), {
  effect: "light",
  closable: true,
});
const { type, effect, content, closable } = toRefs(props);
const emits = defineEmits<AlertEmits>();
const visible = ref(true);

const hideAlert = () => {
  visible.value = false;
  emits("close");
};
defineExpose({
  hide: () => hideAlert(),
});
</script>
