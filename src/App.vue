<script setup lang="ts">
import Button from "./components/Button/Button.vue";
import { ref, onMounted, h } from "vue";
import type { ButtonInstance } from "@/components/Button/types.ts";
import Collapse from "./components/Collapse/Collapse.vue";
import Item from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/icon.vue";
import Message from "./components/Message/Message.vue";
import Dropdown from "./components/Dropdown/Dropdown.tsx";
import type { MenuOption } from "./components/Dropdown/types.ts";
import type { TooltipInstance } from "./components/Tooltip/types.ts";

const buttonRef = ref<ButtonInstance | null>(null);
const triggerRef = ref<any>("click");
const openedValue = ref([""]);
const tooltipRef = ref<TooltipInstance | null>(null);
const options: MenuOption[] = [
  { key: "1", label: h("b", "this is a bold text") },
  { key: "2", label: "Option 2", disabled: true },
  { key: "3", label: "Option 3", divided: true },
  { key: "4", label: "Option 4" },
];
const openTooltip = () => {
  tooltipRef.value?.show();
};
const closeTooltip = () => {
  tooltipRef.value?.hide();
};

onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref);
  }

  setTimeout(() => {
    //triggerRef.value = 'click'
  }, 2000);
});
</script>

<template>
  <header>
    <Message
      type="warning"
      :duration="3000"
      :offset="20"
      transitionName="fadeUp"
      message="this is a successful Message"
      :onDestroy="() => {}"
      id="message-id"
      :zIndex="1000"
    ></Message>
    <Dropdown
      placement="right"
      :trigger="triggerRef"
      :menuOptions="options"
      @visible-change="(e) => console.log('visible-change', e)"
      @select="(e) => console.log('select', e)"
      ref="tooltipRef"
      manual
    >
      <img src="./assets/logo.svg" width="125" height="125" alt="Vue logo" />
    </Dropdown>
  </header>
  <main>
    <br />
    <br />
    <Icon :icon="['fas', 'arrow-up']" type="danger" color="#C3E88D" />
    <Button plain @click="openTooltip">Plain Button</Button>
    <Button round @click="closeTooltip">Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled> Disabled Button</Button>
    <br />
    <br />
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">warning</Button>
    <Button type="danger"> Danger</Button>
    <br />
    <br />
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain> Warning</Button>
    <Button type="danger" plain> Danger</Button>
    <br />
    <br />
    <Button size="small">small</Button>
    <Button size="large">large</Button>
    <br />
    <br />
    <Button size="large" loading>loading</Button>
    <Button size="large" icon="arrow-up"> icon </Button>

    <Collapse v-model="openedValue" accordion>
      <Item name="a">
        <template #title>
          <h1>title A</h1>
        </template>
        <h1>head line title</h1>
        <div>this is aaaaaaaa</div>
      </Item>

      <Item name="b" title="title B">
        <div>this is bbbbbbb</div>
      </Item>
      <Item name="c" disabled title="title C">this is a disabled的item</Item>
    </Collapse>
    {{ openedValue }}
  </main>
</template>

<style scoped>
header {
  display: flex;
}
</style>
