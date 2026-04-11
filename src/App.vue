<script setup lang="ts">
import Button from "./components/Button/Button.vue";
import { ref, onMounted, h } from "vue";
import type { ButtonInstance } from "@/components/Button/types";
import Collapse from "./components/Collapse/Collapse.vue";
import Item from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/icon.vue";
import Message from "./components/Message/Message.vue";
import Dropdown from "./components/Dropdown/Dropdown.tsx";

import Alert from "./components/Alert/Alert.vue";
import type { MenuOption } from "./components/Dropdown/types";
import type { TooltipInstance } from "./components/Tooltip/types";
import { createMessage } from "./components/Message/method";
import Table from "./components/Table";
import type { TableColumn } from "./components/Table/type";

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
// 基础数据
const baseData = ref([
  {
    id: 1,
    name: "王小虎",
    age: 28,
    address: "上海市浦东新区世纪大道 1 号",
    status: "online",
    province: "上海",
    city: "上海",
    zip: "200120",
  },
  {
    id: 2,
    name: "李思思",
    age: 31,
    address: "北京市朝阳区建国路 88 号",
    status: "busy",
    province: "北京",
    city: "北京",
    zip: "100020",
  },
  {
    id: 3,
    name: "赵六",
    age: 24,
    address: "深圳市南山区科技园",
    status: "offline",
    province: "广东",
    city: "深圳",
    zip: "518000",
  },
  {
    id: 4,
    name: "周七",
    age: 36,
    address: "杭州市西湖区龙井路 2 号",
    status: "online",
    province: "浙江",
    city: "杭州",
    zip: "310000",
  },
  {
    id: 5,
    name: "钱八",
    age: 29,
    address: "成都市武侯区人民南路 3 段 1 号",
    status: "busy",
    province: "四川",
    city: "成都",
    zip: "610041",
  },
]);

// 1. 基础表格
const basicColumns: TableColumn[] = [
  { title: "姓名", key: "name", width: 120 },
  { title: "年龄", key: "age", width: 90 },
  { title: "地址", key: "address", width: 200 },
];

// 2. 带斑马纹表格
const stripeColumns: TableColumn[] = [
  { title: "姓名", key: "name", width: 120 },
  { title: "年龄", key: "age", width: 90 },
  { title: "地址", key: "address", width: 200 },
];

// 3. 带边框表格
const borderColumns: TableColumn[] = [
  { title: "姓名", key: "name", width: 120 },
  { title: "年龄", key: "age", width: 90 },
  { title: "地址", key: "address", width: 200 },
];

// 4. 带状态表格
const statusColumns: TableColumn[] = [
  { title: "姓名", key: "name", width: 120 },
  { title: "年龄", key: "age", width: 90 },
  { title: "状态", key: "status", slot: "status", width: 120, align: "center" },
  { title: "地址", key: "address", width: 200 },
];
const statusColors: Record<string, string> = {
  online: "#67c23a",
  busy: "#e6a23c",
  offline: "#909399",
};

// 5. 显示溢出工具提示的表格
const tooltipColumns: TableColumn[] = [
  { title: "姓名", key: "name", width: 120 },
  { title: "年龄", key: "age", width: 90 },
  { title: "地址", key: "address", width: 200, ellipsis: true, tooltip: true },
];
const tooltipData = ref([
  {
    id: 1,
    name: "王小虎",
    age: 28,
    address: "上海市浦东新区世纪大道 1 号世纪汇广场很长很长的地址内容",
  },
  { id: 2, name: "李思思", age: 31, address: "北京市朝阳区建国路 88 号SOHO现代城" },
  { id: 3, name: "赵六", age: 24, address: "深圳市南山区科技园南区深圳湾科技生态园" },
]);

// 6. 固定表头
const fixedHeaderColumns: TableColumn[] = [
  { title: "姓名", key: "name", width: 120 },
  { title: "年龄", key: "age", width: 90 },
  { title: "地址", key: "address", width: 200 },
];
const fixedHeaderData = ref([
  ...baseData.value,
  {
    id: 6,
    name: "郑九",
    age: 41,
    address: "武汉市光谷大道",
    status: "offline",
    province: "湖北",
    city: "武汉",
    zip: "430000",
  },
  {
    id: 7,
    name: "孙十",
    age: 33,
    address: "广州市天河区体育东路",
    status: "online",
    province: "广东",
    city: "广州",
    zip: "510630",
  },
  {
    id: 8,
    name: "魏十一",
    age: 27,
    address: "南京市秦淮区中山东路",
    status: "offline",
    province: "江苏",
    city: "南京",
    zip: "210000",
  },
  {
    id: 9,
    name: "贾十二",
    age: 35,
    address: "重庆市渝中区解放碑步行街",
    status: "online",
    province: "重庆",
    city: "重庆",
    zip: "400000",
  },
]);

// 7. 固定列
const fixedColumnColumns: TableColumn[] = [
  { title: "姓名", key: "name", width: 120, fixed: "left" },
  { title: "年龄", key: "age", width: 90 },
  { title: "省份", key: "province", width: 120 },
  { title: "城市", key: "city", width: 120 },
  { title: "地址", key: "address", width: 200 },
  { title: "邮编", key: "zip", width: 120, fixed: "right" },
];

// 8. 固定列和表头
const fixedColumnHeaderColumns: TableColumn[] = [
  { title: "姓名", key: "name", width: 120, fixed: "left" },
  { title: "年龄", key: "age", width: 90 },
  { title: "省份", key: "province", width: 120 },
  { title: "城市", key: "city", width: 120 },
  { title: "地址", key: "address", width: 200 },
  { title: "邮编", key: "zip", width: 120, fixed: "right" },
];

// 9. 流体高度
const fluidHeightColumns: TableColumn[] = [
  { title: "姓名", key: "name", width: 120 },
  { title: "年龄", key: "age", width: 90 },
  { title: "地址", key: "address", width: 200 },
];

// 10. 多级表头
const multiHeaderColumns: TableColumn[] = [
  {
    title: "用户信息",
    key: "user",
    children: [
      { title: "姓名", key: "name", width: 120, sortable: true },
      { title: "年龄", key: "age", width: 90, align: "right", sortable: true },
    ],
  },
  {
    title: "位置信息",
    key: "location",
    children: [
      { title: "省份", key: "province", width: 120 },
      { title: "城市", key: "city", width: 120 },
      { title: "地址", key: "address", width: 200 },
    ],
  },
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
  createMessage({ message: "hello world", duration: 0, showClose: true });
  createMessage({
    message: "hello world again",
    duration: 0,
    type: "success",
    showClose: true,
  });
  createMessage({
    message: "hello world three",
    duration: 0,
    type: "danger",
    showClose: true,
  });
  setTimeout(() => {
    //triggerRef.value = 'click'
  }, 2000);
});
</script>

<template>
  <header>
    <section class="demo-block">
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px">
        <Alert type="success" content="成功提示的文案" />
        <Alert type="info" content="消息提示的文案" />
        <Alert type="warning" content="警告提示的文案" />
        <Alert type="danger" content="错误提示的文案" />

        <Alert type="danger" effect="light" content="浅色背景成功提示" />
        <Alert type="danger" effect="dark" content="深色背景成功提示" />

        <Alert type="info" content="可关闭的提示" @close="console.log('点击了关闭')" />
        <Alert type="warning" content="可关闭的提示" @close="console.log('点击了关闭')" />
        <Alert type="warning" :closable="false" content="不可关闭的提示" />

        <Alert type="success">
          <template #default>
            <span>使用插槽自定义内容 HTML</span>
          </template>
        </Alert>
      </div>
    </section>
    <Message
      type="success"
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

    <!-- 1. 基础表格 -->
    <section class="demo-block">
      <h3>1. 基础表格</h3>
      <Table :data="baseData" :columns="basicColumns" />
    </section>

    <!-- 2. 带斑马纹表格 -->
    <section class="demo-block">
      <h3>2. 带斑马纹表格</h3>
      <Table :data="baseData" :columns="stripeColumns" stripe />
    </section>

    <!-- 3. 带边框表格 -->
    <section class="demo-block">
      <h3>3. 带边框表格</h3>
      <Table :data="baseData" :columns="borderColumns" border />
    </section>

    <!-- 4. 带状态表格 -->
    <section class="demo-block">
      <h3>4. 带状态表格</h3>
      <Table :data="baseData" :columns="statusColumns" border>
        <template #status="{ row }">
          <span
            :style="{
              padding: '2px 6px',
              borderRadius: '6px',
              color: '#fff',
              background: statusColors[row.status] || '#909399',
            }"
          >
            {{ row.status }}
          </span>
        </template>
      </Table>
    </section>

    <!-- 5. 显示溢出工具提示的表格 -->
    <section class="demo-block">
      <h3>5. 显示溢出工具提示的表格</h3>
      <Table :data="tooltipData" :columns="tooltipColumns" border />
    </section>

    <!-- 6. 固定表头 -->
    <section class="demo-block">
      <h3>6. 固定表头</h3>
      <Table
        :data="fixedHeaderData"
        :columns="fixedHeaderColumns"
        border
        height="200px"
      />
    </section>

    <!-- 7. 固定列 -->
    <section class="demo-block">
      <h3>7. 固定列</h3>
      <Table :data="baseData" :columns="fixedColumnColumns" border />
    </section>

    <!-- 8. 固定列和表头 -->
    <section class="demo-block">
      <h3>8. 固定列和表头</h3>
      <Table
        :data="fixedHeaderData"
        :columns="fixedColumnHeaderColumns"
        border
        height="200px"
      />
    </section>

    <!-- 9. 流体高度 -->
    <section class="demo-block">
      <h3>9. 流体高度</h3>
      <Table
        :data="fixedHeaderData"
        :columns="fluidHeightColumns"
        border
        max-height="200px"
      />
    </section>

    <!-- 10. 多级表头 -->
    <section class="demo-block">
      <h3>10. 多级表头</h3>
      <Table :data="baseData" :columns="multiHeaderColumns" border />
    </section>
  </main>
</template>

<style scoped>
header {
  display: flex;
}
.demo-block {
  margin-top: 32px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--vm-border-color-lighter);
}
.demo-block:last-child {
  border-bottom: none;
}
.demo-block h3 {
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  color: var(--vm-text-color-primary);
}
</style>
