---
title: Table | V-Element
description: Table 组件的文档
---

# Table 表格
用于展示多条结构类似的数据，并支持排序、选择、展开、分页等交互。

## 基础用法

最基本的表格用法，只需传入 `data` 数据和 `columns` 列配置即可。`columns` 是一个对象数组，每个对象描述一列，`key` 对应 `data` 中的字段名，`title` 为列头显示文字。

<preview path="../demo/Table/Basic.vue" title="基础用法" description="Table 组件的基础用法"></preview>

## 带边框

通过 `border` 属性可以给表格添加纵向边框，使单元格边界更加清晰。适合数据列较多、需要在视觉上明确区分单元格时使用。

<preview path="../demo/Table/Border.vue" title="带边框" description="带边框的表格"></preview>

## 斑马纹

通过 `stripe` 属性可以呈现斑马纹效果，即奇偶行使用不同的背景色，能够有效引导视觉流，方便用户横向阅读数据。适合行数较多的表格。

<preview path="../demo/Table/Stripe.vue" title="斑马纹" description="带斑马纹的表格"></preview>

## 排序

通过设置列的 `sortable` 属性可以开启该列的点击排序功能。排序规则为三轮循环：未排序 → 升序 → 降序 → 未排序。点击排序图标或列头均可触发排序。可以通过 `defaultSort` 属性设置初始排序状态，接受 `prop`（排序字段名）和 `order`（排序方向 `'ascending'` 或 `'descending'`）两个参数。

<preview path="../demo/Table/Sort.vue" title="排序" description="可排序列"></preview>

## 行选择

通过设置列的 `type: 'selection'` 可以添加一列复选框，用于行选择。表头复选框为全选操作，选中某行后会高亮显示。行选择状态可在外部通过 `selectedRows` 等方式访问（后续版本将提供 `selection-change` 事件）。

<preview path="../demo/Table/Selection.vue" title="行选择" description="带复选框的表格"></preview>

## 索引列

通过设置列的 `type: 'index'` 可以显示一列行号。默认显示从 1 开始的序号，配合分页使用时，序号会根据当前页和每页条数自动计算。可以通过 `title` 属性自定义列头文字。

<preview path="../demo/Table/Index.vue" title="索引列" description="带索引列的表格"></preview>

## 行展开

通过设置列的 `type: 'expand'` 可以添加一个展开列，点击后可以展开/收起该行的详细信息。展开的内容通过具名插槽渲染，插槽名称由 `expandSlot` 属性指定（默认为 `'expand'`），作用域参数 `{ row, rowIndex }` 可访问当前行数据。`expandKey` 属性用于指定行数据的唯一标识字段，默认为 `'id'`。

<preview path="../demo/Table/Expand.vue" title="行展开" description="可展开的表格"></preview>

## 分页

通过 `pagination` 属性可以为表格添加分页功能。传入一个对象，包含 `pageSize`（每页条数）和 `currentPage`（当前页码）。表格会自动根据配置对数据进行分页，切页后排序状态会保留。如果不传入该属性，则不分页，显示全部数据。

<preview path="../demo/Table/Pagination.vue" title="分页" description="带分页的表格"></preview>

## 加载状态

通过 `loading` 属性可以控制表格的加载状态。当设为 `true` 时，表格上方会覆盖一层半透明遮罩并显示旋转加载动画。常用于数据异步加载时给用户明确的等待反馈。设为 `false` 可关闭加载状态。

<preview path="../demo/Table/Loading.vue" title="加载状态" description="带加载状态的表格"></preview>

## 固定列

通过设置列的 `fixed` 属性可以将列固定在左侧或右侧。固定列在横向滚动时始终保持可见，非常适合列数较多且有关键列（如姓名、操作列）需要始终展示的场景。`fixed` 可选值为 `'left'`（固定左侧）、`'right'`（固定右侧）或 `true`（等同于 `'left'`）。建议同时为固定列设置明确的 `width`，否则可能无法正确固定。

<preview path="../demo/Table/Fixed.vue" title="固定列" description="左右固定列"></preview>

## 多级表头

通过在列配置中使用 `children` 属性可以创建多级表头结构。含有 `children` 的列会作为父级表头，其下的子列会在下方渲染为多行表头。子列同样支持 `sortable`、`fixed`、`width` 等属性。多级表头常用于对列进行分组归类，提升大表格的可读性。

<preview path="../demo/Table/MultiHeader.vue" title="多级表头" description="多级表头"></preview>

## 自定义列模板

通过设置列的 `slot` 属性指定插槽名称后，即可在 Table 组件上使用具名插槽自定义该列的渲染内容。插槽作用域提供 `{ row, column, rowIndex }` 三个参数，分别对应当前行数据、列配置和行索引。这种方式适合在单元格中渲染按钮、标签、图标等复杂内容。操作列是典型的自定义列模板场景。

<preview path="../demo/Table/Custom.vue" title="自定义列模板" description="自定义列内容"></preview>

## 单元格省略与 Tooltip

当单元格内容过长时，默认会进行文本省略（`ellipsis` 默认为 `true`）。同时会自动使用 Tooltip 在鼠标悬停时显示完整内容。可以通过设置 `tooltip: false` 关闭 Tooltip，或设置 `tooltip: true` 强制开启。`tooltipConfig` 属性可以统一配置 Tooltip 的行为，如 `placement`（位置）、`showDelay`（显示延迟毫秒数）。

<preview path="../demo/Table/Ellipsis.vue" title="单元格省略与 Tooltip" description="单元格省略与 Tooltip"></preview>

## 复杂示例

综合运用排序、选择、索引、展开、固定列、分页、斑马纹等特性。该示例展示了 Table 组件在真实业务场景中的典型用法，包含了操作列的状态渲染、行操作按钮以及展开行的详细内容。

<preview path="../demo/Table/Complex.vue" title="复杂示例" description="综合示例"></preview>

# API

## Table Attributes

| Name           | Description                                                        | Type      | Default  |
| -------------- | ------------------------------------------------------------------- | --------- | -------- |
| data           | 表格数据，为一个对象数组，每个对象代表一行数据                         | array     | []       |
| columns        | 列配置数组，每个对象描述一列的基本属性和行为                          | array     | []       |
| border         | 是否添加纵向边框                                                    | boolean   | false    |
| stripe         | 是否显示斑马纹效果                                                  | boolean   | false    |
| loading        | 是否显示加载状态遮罩                                                | boolean   | false    |
| size           | 表格尺寸，影响单元格内边距大小，可选值为 `'large'`、`'default'`、`'small'` | string    | default  |
| height         | 固定表头高度，传入数值时单位为 px，也可传入带单位的字符串              | number / string | —     |
| maxHeight      | 表格最大高度，超出后在表格容器内显示滚动条                            | number / string | —     |
| defaultSort    | 初始排序状态，`prop` 为排序字段名，`order` 为 `'ascending'` 或 `'descending'` | object | —     |
| pagination     | 分页配置，对象包含 `pageSize`（每页条数）和 `currentPage`（当前页）   | object    | —        |
| expandKey      | 展开行的唯一标识字段名，用于追踪展开状态                               | string    | id       |
| rowClass       | 自定义行类名，传入字符串或函数，函数参数为 `(row, rowIndex)`           | string / function | — |
| rowStyle       | 自定义行样式，传入样式对象或函数，函数参数为 `(row, rowIndex)`         | object / function | —  |
| cellClass      | 自定义单元格类名，函数参数为 `(row, column, rowIndex, colIndex)`        | function  | —        |
| cellStyle      | 自定义单元格样式，函数参数为 `(row, column, rowIndex, colIndex)`        | function  | —        |
| tooltipConfig  | 单元格 Tooltip 配置，可配置 `placement`（位置）、`showDelay`、`hideDelay` | object | —     |

## TableColumn Attributes

| Name       | Description                                                        | Type      | Default   |
| ---------  | ------------------------------------------------------------------ | --------- | --------  |
| title      | 列头显示的文字                                                     | string    | —         |
| key        | 对应 data 中的字段名，用于取单元格值                                 | string    | —         |
| width      | 列宽度，单位为 px，建议为固定列和关键列设置明确宽度                  | number    | —         |
| align      | 单元格文本对齐方式，可选 `'left'`（居左）、`'center'`（居中）、`'right'`（居右） | string | left   |
| slot       | 插槽名称，定义后可在 Table 上使用具名插槽自定义该列渲染内容            | string    | —         |
| sortable   | 是否启用该列的点击排序功能                                          | boolean   | false     |
| fixed      | 固定列位置，可选 `'left'`（固定左侧）、`'right'`（固定右侧）或 `true`（固定左侧） | string / boolean | false |
| type       | 列类型，可选 `'selection'`（复选框）、`'index'`（行号）、`'expand'`（展开列） | string | —      |
| expandSlot | 展开行的插槽名称，与 `type: 'expand'` 配合使用                        | string    | expand    |
| ellipsis   | 单元格文本过长时是否省略并用 Tooltip 显示完整内容，默认为 `true`        | boolean   | true      |
| tooltip    | 是否强制启用 Tooltip 显示溢出内容，覆盖 `ellipsis` 的默认行为          | boolean   | —         |
| className  | 自定义该列所有单元格的类名                                          | string    | —         |
| style      | 自定义该列所有单元格的样式对象                                       | object    | —         |
| children   | 子列配置数组，用于构建多级表头，含此属性的列作为父级表头              | array     | —         |

## Table Events

| Name | Description | Type |
| ---- | ----------- | ---- |
| —    | Table 组件当前版本暂未暴露事件，后续版本将补充 `selection-change` 等事件 | — |

## Table Slots

| Name   | Description                                           | Scope                      |
| ------ | ----------------------------------------------------- | -------------------------- |
| (自定义列插槽) | 通过 `columns` 中各列的 `slot` 属性指定插槽名称后，在此定义对应插槽的内容 | `{ row, column, rowIndex }` |
| expand | 行展开后的详细内容插槽，与 `type: 'expand'` 列配合使用     | `{ row, rowIndex }`         |

## Column Type 可选值

| Value     | Description                                      |
| --------- | ----------------------------------------------- |
| selection | 复选框列，用于多行选择，表头复选框为全选功能       |
| index     | 索引列，显示从 1 开始的行号，配合分页时自动计算偏移 |
| expand    | 展开列，点击可展开/收起该行，显示详细信息           |

## Column Fixed 可选值

| Value | Description                              |
| ----- | --------------------------------------- |
| left  | 固定在左侧，横向滚动时始终可见             |
| right | 固定在右侧，横向滚动时始终可见             |
| true  | 等同于 `'left'`，固定在左侧              |
| false | 不固定，随表格横向滚动（默认值）           |

## Column Align 可选值

| Value  | Description                        |
| ------ | --------------------------------- |
| left   | 文本居左对齐，单元格内容靠左显示     |
| center | 文本居中对齐，单元格内容居中显示     |
| right  | 文本居右对齐，单元格内容靠右显示     |

## Table Size 可选值

| Value  | Description                                      |
| ------ | ------------------------------------------------ |
| large  | 大尺寸，单元格内边距较大，适合数据密度低的场景     |
| default | 默认尺寸，中等边距，适合大多数场景                |
| small  | 小尺寸，单元格内边距紧凑，适合数据密度高的场景     |
