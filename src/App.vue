<script setup lang="ts">
import Button from './components/Button/Button.vue'
import { ref, onMounted } from 'vue'
import type { ButtonInstance } from '@/components/Button/types.ts'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/icon.vue'

import Tooltip from './components/Tooltip/Tooltip.vue'
const buttonRef = ref<ButtonInstance | null>(null)
const openedValue = ref([''])

onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref)
  }

  setTimeout(() => {}, 2000)
})
</script>

<template>
  <header>
    <Tooltip placement="right">
      <img src="./assets/logo.svg" width="125" height="125" alt="Vue logo" />
      <template #content>
        <h1>Hello World</h1>
      </template>
    </Tooltip>
  </header>
  <main>
    <br />
    <br />
    <Icon :icon="['fas', 'arrow-up']" type="danger" color="#C3E88D" />
    <Button plain>Plain Button</Button>
    <Button round>Round Button</Button>
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

      <Item name="b" title="title B"><div>this is bbbbbbb</div></Item>
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
