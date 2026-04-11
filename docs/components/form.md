---
title: Form | V-Element
description: Form 组件的文档
---

# Form 表单

由输入框、选择器、开关等组件构成，用于提交、校验用户输入的数据。

## 基础用法

基础的登录表单，包含邮箱和密码两个字段。使用 `Form` 包裹 `FormItem`，`FormItem` 的 `prop` 属性对应 `model` 中的字段名，`rules` 中定义验证规则。调用 `formRef.value.validate()` 可触发表单全局校验，`resetFields()` 可重置所有字段。

<preview path="../demo/Form/Basic.vue" title="基础用法" description="基础登录表单"></preview>

## 表单校验

Form 组件基于 `async-validator` 实现表单校验。校验规则通过 `rules` 属性传入，规则对象中每个 `key` 对应一个 `FormItem` 的 `prop` 值。

常见的校验规则类型：

| 规则类型 | 说明 | 示例 |
|---------|------|------|
| `required: true` | 必填项 | 必须输入内容 |
| `type: 'email'` | 邮箱格式 | 必须符合邮箱格式 |
| `type: 'number'` | 数字类型 | 必须为纯数字 |
| `type: 'url'` | URL 格式 | 必须符合网址格式 |
| `min` / `max` | 最小/最大长度或数值 | 限制输入范围 |
| `pattern` | 正则表达式 | 自定义格式校验 |
| `validator` | 自定义校验函数 | 自定义复杂逻辑 |

`trigger` 指定触发校验的事件类型，默认为 `'blur'`，对于下拉选择等场景应设为 `'change'`。

<preview path="../demo/Form/Validate.vue" title="表单校验" description="多种校验规则示例"></preview>

## 自定义校验规则

通过 `validator` 属性可以自定义校验逻辑，函数接收 `(rule, value, callback)` 三个参数。示例中实现了两次密码必须一致的校验，以及昵称不能包含特定字符的校验。调用 `callback()` 通过校验，调用 `callback(new Error('错误信息'))` 返回错误。

<preview path="../demo/Form/Custom.vue" title="自定义校验规则" description="自定义校验器示例"></preview>

## Select 与 Switch 组合

Form 可以自由组合各种输入组件。Select 组件在值变更时触发校验，应将 `trigger` 设置为 `'change'`。Switch 组件同样推荐使用 `'change'` 作为触发时机。协议勾选使用 `type: 'enum'` 规则，枚举值中必须为 `true` 才能通过校验。

<preview path="../demo/Form/SelectSwitch.vue" title="Select 与 Switch" description="组合 Select、Switch 等组件"></preview>

## 复杂表单

综合示例，包含文本输入、下拉选择、文本域、开关等组件，同时演示了 `resetFields`（重置）和 `clearValidate`（清除校验状态）两个方法的效果对比。`resetFields` 会将表单值恢复为初始状态，`clearValidate` 仅清除校验提示而不改变值。

<preview path="../demo/Form/Complex.vue" title="复杂表单" description="综合示例"></preview>

# API

## Form Attributes

| Name    | Description | Type   | Default |
| ------- | ----------- | ------ | ------- |
| model   | 表单数据对象，**必填**，由外部传入，Form 本身不管理数据状态 | object | —       |
| rules   | 校验规则对象，**必填**，每个 key 对应 FormItem 的 prop 值 | object | —       |

## FormItem Attributes

| Name | Description | Type   | Default |
| ---- | ----------- | ------ | ------- |
| label | 表单项的标签文字，显示在输入框左侧 | string | —       |
| prop  | 对应 model 中的字段名，用于取值的关联和校验的匹配，**必填** | string | —       |

## Form Events

| Name   | Description                          | Type |
| ------ | ------------------------------------ | ---- |
| —      | Form 组件当前版本暂未暴露事件          | —    |

## Form Methods

通过 `ref` 获取 Form 实例后可以调用以下方法：

| Name        | Description                                                         | Type     |
| ---------- | ------------------------------------------------------------------- | -------- |
| validate   | 对整个表单进行校验，返回 Promise，校验成功 resolve，失败则 reject      | function |
| resetFields | 重置所有字段为初始值（调用各 FormItem 的初始值）                        | function |
| clearValidate | 清除所有字段的校验状态（不改变字段值）                               | function |

## FormItem Slots

| Name    | Description                          | Scope               |
| ------- | ------------------------------------ | ------------------- |
| label   | 自定义标签内容                         | { label }          |
| default | 自定义输入控件内容，作用域参数提供 validate 函数，可手动调用触发校验 | { validate }       |

## 校验规则 FormItemRule

基础规则继承自 `async-validator`，常用属性如下：

| Name     | Description                                              | Type     |
| -------- | ------------------------------------------------------- | -------- |
| required | 是否为必填项                                             | boolean  |
| type     | 数据类型，可选 `string`、`number`、`email`、`boolean`、`enum`、`url` 等 | string |
| message  | 校验失败时的错误提示文字                                    | string   |
| trigger  | 触发校验的事件类型，可选 `'blur'` 或 `'change'`             | string   |
| min      | 字符串最小长度或数值最小值                                  | number   |
| max      | 字符串最大长度或数值最大值                                  | number   |
| pattern  | 正则表达式                                                | RegExp   |
| enum     | 枚举值数组，配合 `type: 'enum'` 使用                       | any[]    |
| validator | 自定义校验函数，签名为 `(rule, value, callback) => void`   | function |

## 校验规则 trigger 说明

`trigger` 用于指定在什么事件下触发当前规则的校验：

| 值      | 说明                                           |
|--------|----------------------------------------------|
| blur   | 输入框失去焦点时触发，适用于大多数文本输入字段         |
| change | 值发生变化时触发，适用于 Select、Switch 等组件       |
| ''     | 空字符串时，所有事件均触发校验（不推荐）             |

同一条字段可以配置多条规则，每条规则可设置不同的 `trigger`，如同时设置 `{ required: true, trigger: 'blur' }` 和 `{ type: 'email', trigger: 'change' }` 可实现失去焦点检查必填、输入时检查格式的效果。
