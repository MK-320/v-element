---
title: Table | V-Element
description: Table 组件的文档
---

# Table 表格
用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

## 基础用法
基础的表格展示用法。

<preview path="../demo/Table/Basic.vue" title="基础用法" description="Table 组件的基础用法"></preview>

## 带边框的表格
添加 `border` 属性即可实现带边框的表格。

<preview path="../demo/Table/Border.vue" title="带边框的表格" description="Table 组件的带边框表格"></preview>

## 自定义列模板
通过插槽可以自定义列的内容。

<preview path="../demo/Table/Custom.vue" title="自定义列模板" description="Table 组件的自定义列模板"></preview>

## 排序表格
设置 `sortable` 属性可以对表格进行排序。

<preview path="../demo/Table/Sort.vue" title="排序表格" description="Table 组件的排序功能"></preview>

## 带斑马纹的表格
添加 `stripe` 属性可以实现斑马纹效果。

<preview path="../demo/Table/Stripe.vue" title="带斑马纹的表格" description="Table 组件的斑马纹效果"></preview>

## 可选择的表格
添加 `type: 'selection'` 列可以实现表格行选择功能。

<preview path="../demo/Table/Selection.vue" title="可选择的表格" description="Table 组件的行选择功能"></preview>

## 可展开的表格
添加 `type: 'expand'` 列可以实现表格行展开功能。

<preview path="../demo/Table/Expand.vue" title="可展开的表格" description="Table 组件的行展开功能"></preview>

## 带分页的表格
通过 `pagination` 属性可以为表格添加分页功能。

<preview path="../demo/Table/Pagination.vue" title="带分页的表格" description="Table 组件的分页功能"></preview>

## 加载状态的表格
通过 `loading` 属性可以控制表格的加载状态。

<preview path="../demo/Table/Loading.vue" title="加载状态的表格" description="Table 组件的加载状态"></preview>

### Table Attributes

| Name        | Description         | Type      | Default |
| ----------- | ------------------- | --------- | ------- |
| data        | 显示的数据          | `array`   | []      |
| columns     | 表格列的配置描述    | `array`   | []      |
| border      | 是否带有纵向边框    | `boolean` | false   |
| stripe      | 是否为斑马纹 table  | `boolean` | false   |
| loading     | 是否显示加载状态    | `boolean` | false   |
| defaultSort | 默认排序字段和顺序  | `object`  | —       |
| pagination  | 分页配置            | `object`  | —       |
| expandKey   | 展开行的唯一标识字段| `string`  | 'id'    |

### Table Events

| Name   | Description         | Type      |
| ------ | ------------------- | --------- |
| —      | —                   | —         |

### Table Slots

| Name | Description               | Type      |
| ---- | ------------------------- | --------- |
| —    | 自定义列的内容            | —         |

### Column Attributes

| Name       | Description                              | Type              | Default |
| ---------- | ---------------------------------------- | ----------------- | ------- |
| title      | 列标题                                   | `string`          | —       |
| key        | 列内容的字段名                           | `string`          | —       |
| width      | 列宽度                                   | `number`          | —       |
| align      | 对齐方式 (left/center/right)             | `string`          | left    |
| slot       | 插槽名称，用于自定义列内容               | `string`          | —       |
| sortable   | 是否可排序                               | `boolean`         | false   |
| fixed      | 是否固定列                               | `boolean|string`  | false   |
| type       | 列的类型(selection/index/expand)         | `string`          | —       |
| expandSlot | 展开行的插槽名称                         | `string`          | 'expand'|