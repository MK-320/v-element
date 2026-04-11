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
// 测试 npm 上的 Table 组件
import { Table } from "@drgeek/v-element";
import type { TableColumn } from "@drgeek/v-element";

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
// ============ Table 组件数据（来自文档示例）============
// 基础数据
const tableData = ref([
  { id: '1001', name: '张三', dept: '技术部', role: '前端工程师', city: '北京', date: '2022-01-15', status: '在职' },
  { id: '1002', name: '李四', dept: '产品部', role: '产品经理', city: '上海', date: '2021-06-20', status: '在职' },
  { id: '1003', name: '王五', dept: '设计部', role: 'UI设计师', city: '广州', date: '2023-03-10', status: '在职' },
  { id: '1004', name: '赵六', dept: '市场部', role: '市场专员', city: '深圳', date: '2024-01-05', status: '实习' }
])

// 1. 基础表格
const basicColumns: TableColumn[] = [
  { title: '工号', key: 'id', width: 80 },
  { title: '姓名', key: 'name', width: 100 },
  { title: '部门', key: 'dept', width: 120 },
  { title: '职位', key: 'role', width: 120 },
  { title: '城市', key: 'city', width: 100 },
  { title: '入职日期', key: 'date', width: 120 },
  { title: '状态', key: 'status', width: 80 }
]

// 2. 带边框
const borderColumns: TableColumn[] = [...basicColumns]

// 3. 斑马纹
const stripeColumns: TableColumn[] = [...basicColumns]

// 4. 排序
const sortColumns: TableColumn[] = [
  { title: '工号', key: 'id', width: 80 },
  { title: '姓名', key: 'name', width: 100, sortable: true },
  { title: '部门', key: 'dept', width: 120 },
  { title: '职位', key: 'role', width: 120 },
  { title: '年龄', key: 'age', width: 80, sortable: true, align: 'center' },
  { title: '城市', key: 'city', width: 100 },
  { title: '入职日期', key: 'date', width: 120 }
]
const sortData = ref([
  { id: '1001', name: '张三', dept: '技术部', role: '前端工程师', age: 25, city: '北京', date: '2022-01-15' },
  { id: '1002', name: '李四', dept: '产品部', role: '产品经理', age: 30, city: '上海', date: '2021-06-20' },
  { id: '1003', name: '王五', dept: '设计部', role: 'UI设计师', age: 28, city: '广州', date: '2023-03-10' },
  { id: '1004', name: '赵六', dept: '市场部', role: '市场专员', age: 22, city: '深圳', date: '2024-01-05' },
  { id: '1005', name: '钱七', dept: '运营部', role: '运营总监', age: 35, city: '杭州', date: '2020-11-30' }
])

// 5. 行选择
const selectionColumns: TableColumn[] = [
  { type: 'selection', width: 50 },
  ...basicColumns
]

// 6. 索引列
const indexColumns: TableColumn[] = [
  { type: 'index', title: '序号', width: 60 },
  ...basicColumns
]

// 7. 行展开
const expandColumns: TableColumn[] = [
  { type: 'expand', expandSlot: 'expand', width: 60 },
  { title: '工号', key: 'id', width: 80 },
  { title: '姓名', key: 'name', width: 100 },
  { title: '部门', key: 'dept', width: 120 },
  { title: '职位', key: 'role', width: 120 },
  { title: '城市', key: 'city', width: 100 },
  { title: '状态', key: 'status', width: 80 }
]
const expandData = ref([...tableData.value])

// 8. 分页
const paginationColumns: TableColumn[] = [...basicColumns]
const paginationData = ref([
  { id: '1001', name: '张三', dept: '技术部', role: '前端工程师', city: '北京', date: '2022-01-15', status: '在职' },
  { id: '1002', name: '李四', dept: '产品部', role: '产品经理', city: '上海', date: '2021-06-20', status: '在职' },
  { id: '1003', name: '王五', dept: '设计部', role: 'UI设计师', city: '广州', date: '2023-03-10', status: '在职' },
  { id: '1004', name: '赵六', dept: '市场部', role: '市场专员', city: '深圳', date: '2024-01-05', status: '实习' },
  { id: '1005', name: '钱七', dept: '运营部', role: '运营总监', city: '杭州', date: '2020-11-30', status: '在职' },
  { id: '1006', name: '孙八', dept: '财务部', role: '财务经理', city: '南京', date: '2022-08-15', status: '在职' },
  { id: '1007', name: '周九', dept: '人事部', role: '人事专员', city: '成都', date: '2023-05-20', status: '实习' }
])
const paginationConfig = ref({ pageSize: 3, currentPage: 1 })

// 9. 加载状态
const loadingColumns: TableColumn[] = [...basicColumns]

// 10. 固定列
const fixedColumns: TableColumn[] = [
  { title: '工号', key: 'id', width: 80, fixed: 'left' },
  { title: '姓名', key: 'name', width: 100, fixed: 'left' },
  { title: '部门', key: 'dept', width: 120 },
  { title: '职位', key: 'role', width: 120 },
  { title: '省份', key: 'province', width: 100 },
  { title: '城市', key: 'city', width: 100 },
  { title: '详细地址', key: 'address', width: 240 },
  { title: '邮编', key: 'zip', width: 100 },
  { title: '联系电话', key: 'phone', width: 130 },
  { title: '邮箱', key: 'email', width: 220 },
  { title: '入职日期', key: 'date', width: 120 },
  { title: '状态', key: 'status', width: 80 },
  { title: '操作', key: 'action', slot: 'action', width: 160, fixed: 'right', ellipsis: false }
]
const fixedData = ref([
  { id: '1001', name: '张三', dept: '技术部', role: '前端工程师', province: '北京市', city: '北京市', address: '朝阳区建国路88号SOHO现代城A座1201室', zip: '100022', phone: '13800138001', email: 'zhangsan@example-company.com', date: '2022-01-15', status: '在职' },
  { id: '1002', name: '李四', dept: '产品部', role: '产品经理', province: '上海市', city: '上海市', address: '浦东新区世纪大道100号环球金融中心B座802室', zip: '200120', phone: '13800138002', email: 'lisi@example-company.com', date: '2021-06-20', status: '在职' },
  { id: '1003', name: '王五', dept: '设计部', role: 'UI设计师', province: '广东省', city: '广州市', address: '天河区天河路123号太古汇写字楼18层', zip: '510620', phone: '13800138003', email: 'wangwu@example-company.com', date: '2023-03-10', status: '在职' },
  { id: '1004', name: '赵六', dept: '市场部', role: '市场专员', province: '浙江省', city: '杭州市', address: '西湖区文一路88号浙江大学科技园', zip: '310012', phone: '13800138004', email: 'zhaoliu@example-company.com', date: '2024-01-05', status: '实习' }
])

// 11. 多级表头
const multiHeaderColumns: TableColumn[] = [
  {
    title: '基本信息',
    children: [
      { title: '工号', key: 'id', width: 80 },
      { title: '姓名', key: 'name', width: 100 }
    ]
  },
  {
    title: '职位信息',
    children: [
      { title: '部门', key: 'dept', width: 120 },
      { title: '职位', key: 'role', width: 120 },
      { title: '城市', key: 'city', width: 100 }
    ]
  },
  { title: '详细地址', key: 'address', width: 220 },
  { title: '入职日期', key: 'date', width: 120 }
]
const multiHeaderData = ref([
  { id: '1001', name: '张三', dept: '技术部', role: '前端工程师', city: '北京', address: '北京市朝阳区建国路88号SOHO现代城', date: '2022-01-15' },
  { id: '1002', name: '李四', dept: '产品部', role: '产品经理', city: '上海', address: '上海市浦东新区世纪大道100号', date: '2021-06-20' },
  { id: '1003', name: '王五', dept: '设计部', role: 'UI设计师', city: '广州', address: '广州市天河区天河路123号太古汇', date: '2023-03-10' },
  { id: '1004', name: '赵六', dept: '市场部', role: '市场专员', city: '深圳', address: '深圳市南山区科技路66号高新产业园', date: '2024-01-05' }
])

// 12. 自定义列模板
const customColumns: TableColumn[] = [
  { title: '工号', key: 'id', width: 80 },
  { title: '姓名', key: 'name', width: 100 },
  { title: '部门', key: 'dept', width: 120 },
  { title: '职位', key: 'role', width: 120 },
  { title: '邮箱', key: 'email', width: 220 },
  { title: '公司地址', key: 'address', width: 260 },
  { title: '操作', key: 'action', slot: 'action', width: 160, ellipsis: false }
]
const customData = ref([
  { id: '1001', name: '张三', dept: '技术部', role: '前端工程师', email: 'zhangsan.developer@example-company.com', address: '北京市朝阳区建国路88号SOHO现代城A座1201室' },
  { id: '1002', name: '李四', dept: '产品部', role: '产品经理', email: 'lisi.product@example-company.com', address: '上海市浦东新区世纪大道100号上海环球金融中心B座802室' },
  { id: '1003', name: '王五', dept: '设计部', role: 'UI设计师', email: 'wangwu.design@example-company.com', address: '广州市天河区天河路123号太古汇写字楼18层' },
  { id: '1004', name: '赵六', dept: '市场部', role: '市场专员', email: 'zhaoliu.marketing@example-company.com', address: '深圳市南山区科技路66号高新产业园3号楼5层' }
])

// 13. 单元格省略与 Tooltip
const ellipsisColumns: TableColumn[] = [
  { title: '工号', key: 'id', width: 80 },
  { title: '姓名', key: 'name', width: 100 },
  { title: '部门', key: 'dept', width: 120 },
  { title: '职位', key: 'role', width: 120 },
  { title: '邮箱', key: 'email', width: 180, ellipsis: true },
  { title: '公司地址', key: 'address', width: 200, ellipsis: true, tooltip: true }
]
const ellipsisData = ref([...customData.value])

// 14. 复杂示例
const complexColumns: TableColumn[] = [
  { type: 'selection', width: 50 },
  { type: 'index', title: '序号', width: 60 },
  { type: 'expand', expandSlot: 'expand', width: 60 },
  { title: '工号', key: 'id', width: 80, fixed: 'left' },
  { title: '姓名', key: 'name', width: 100, fixed: 'left', sortable: true },
  { title: '部门', key: 'dept', width: 120 },
  { title: '职位', key: 'role', width: 120 },
  { title: '城市', key: 'city', width: 100 },
  { title: '详细地址', key: 'address', width: 220, ellipsis: true },
  { title: '入职日期', key: 'date', width: 120 },
  { title: '年龄', key: 'age', width: 80, sortable: true, align: 'center' },
  { title: '状态', key: 'status', slot: 'status', width: 100, align: 'center' },
  { title: '操作', key: 'action', slot: 'action', width: 220, fixed: 'right', ellipsis: false }
]
const complexData = ref([
  { id: '1001', name: '张三', dept: '技术部', role: '前端工程师', city: '北京', address: '北京市朝阳区建国路88号SOHO现代城A座1201室', date: '2022-01-15', age: 25, status: 1 },
  { id: '1002', name: '李四', dept: '产品部', role: '产品经理', city: '上海', address: '上海市浦东新区世纪大道100号上海环球金融中心', date: '2021-06-20', age: 30, status: 2 },
  { id: '1003', name: '王五', dept: '设计部', role: 'UI设计师', city: '广州', address: '广州市天河区天河路123号太古汇写字楼', date: '2023-03-10', age: 28, status: 1 },
  { id: '1004', name: '赵六', dept: '市场部', role: '市场专员', city: '深圳', address: '深圳市南山区科技路66号高新产业园', date: '2024-01-05', age: 22, status: 3 },
  { id: '1005', name: '钱七', dept: '运营部', role: '运营总监', city: '杭州', address: '杭州市西湖区文一路88号浙江大学科技园', date: '2020-11-30', age: 35, status: 2 },
  { id: '1006', name: '孙八', dept: '财务部', role: '财务经理', city: '南京', address: '南京市鼓楼区中山北路100号鼓楼医院旁', date: '2022-08-15', age: 27, status: 1 }
])
const statusMap: Record<number, string> = { 1: '正常', 2: '休假中', 3: '离职' }

const handleEdit = (row: any) => console.log('编辑', row)
const handleDelete = (row: any) => console.log('删除', row)
const handleView = (row: any) => console.log('查看', row)
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
      <Table :data="tableData" :columns="basicColumns" />
    </section>

    <!-- 2. 带边框 -->
    <section class="demo-block">
      <h3>2. 带边框</h3>
      <Table :data="tableData" :columns="borderColumns" border />
    </section>

    <!-- 3. 斑马纹 -->
    <section class="demo-block">
      <h3>3. 斑马纹</h3>
      <Table :data="tableData" :columns="stripeColumns" stripe />
    </section>

    <!-- 4. 排序 -->
    <section class="demo-block">
      <h3>4. 排序</h3>
      <Table :data="sortData" :columns="sortColumns" border />
    </section>

    <!-- 5. 行选择 -->
    <section class="demo-block">
      <h3>5. 行选择</h3>
      <Table :data="tableData" :columns="selectionColumns" border />
    </section>

    <!-- 6. 索引列 -->
    <section class="demo-block">
      <h3>6. 索引列</h3>
      <Table :data="tableData" :columns="indexColumns" border />
    </section>

    <!-- 7. 行展开 -->
    <section class="demo-block">
      <h3>7. 行展开</h3>
      <Table :data="expandData" :columns="expandColumns" border>
        <template #expand="{ row }">
          <div style="padding: 16px;">
            <p><strong>工号：</strong>{{ row.id }}</p>
            <p><strong>姓名：</strong>{{ row.name }}</p>
            <p><strong>部门：</strong>{{ row.dept }}</p>
            <p><strong>职位：</strong>{{ row.role }}</p>
          </div>
        </template>
      </Table>
    </section>

    <!-- 8. 分页 -->
    <section class="demo-block">
      <h3>8. 分页</h3>
      <Table :data="paginationData" :columns="paginationColumns" border :pagination="paginationConfig" />
    </section>

    <!-- 9. 加载状态 -->
    <section class="demo-block">
      <h3>9. 加载状态</h3>
      <Table :data="tableData" :columns="loadingColumns" border loading />
    </section>

    <!-- 10. 固定列 -->
    <section class="demo-block">
      <h3>10. 固定列</h3>
      <Table :data="fixedData" :columns="fixedColumns" border>
        <template #action="{ row }">
          <Button size="small" type="primary" @click="handleEdit(row)">编辑</Button>
          <Button size="small" type="danger" @click="handleDelete(row)">删除</Button>
        </template>
      </Table>
    </section>

    <!-- 11. 多级表头 -->
    <section class="demo-block">
      <h3>11. 多级表头</h3>
      <Table :data="multiHeaderData" :columns="multiHeaderColumns" border />
    </section>

    <!-- 12. 自定义列模板 -->
    <section class="demo-block">
      <h3>12. 自定义列模板</h3>
      <Table :data="customData" :columns="customColumns" border>
        <template #action="{ row }">
          <Button size="small" type="primary" @click="handleEdit(row)">编辑</Button>
          <Button size="small" type="danger" @click="handleDelete(row)">删除</Button>
          <Button size="small" @click="handleView(row)">查看</Button>
        </template>
      </Table>
    </section>

    <!-- 13. 单元格省略与 Tooltip -->
    <section class="demo-block">
      <h3>13. 单元格省略与 Tooltip</h3>
      <Table :data="ellipsisData" :columns="ellipsisColumns" border />
    </section>

    <!-- 14. 复杂示例 -->
    <section class="demo-block">
      <h3>14. 复杂示例</h3>
      <Table :data="complexData" :columns="complexColumns" border>
        <template #expand="{ row }">
          <div style="padding: 16px;">
            <p><strong>工号：</strong>{{ row.id }}</p>
            <p><strong>姓名：</strong>{{ row.name }}</p>
            <p><strong>部门：</strong>{{ row.dept }}</p>
            <p><strong>职位：</strong>{{ row.role }}</p>
            <p><strong>城市：</strong>{{ row.city }}</p>
            <p><strong>详细地址：</strong>{{ row.address }}</p>
          </div>
        </template>
        <template #status="{ row }">
          <span :style="{
            padding: '2px 8px',
            borderRadius: '4px',
            background: row.status === 1 ? '#67C23A' : row.status === 2 ? '#E6A23C' : '#F56C6C',
            color: '#fff'
          }">{{ statusMap[row.status] || '未知' }}</span>
        </template>
        <template #action="{ row }">
          <Button size="small" type="primary" @click="handleEdit(row)">编辑</Button>
          <Button size="small" type="danger" @click="handleDelete(row)">删除</Button>
          <Button size="small" @click="handleView(row)">查看</Button>
        </template>
      </Table>
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
