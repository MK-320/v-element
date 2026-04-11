<template>
  <div class="vm-table-wrapper" :class="[`vm-table--${size}`]">
    <div v-if="loading" class="vm-table__loading">
      <div class="vm-table__loading-spinner"></div>
    </div>

    <div class="vm-table__container" :style="containerStyle">
      <table
        class="vm-table"
        :class="{
          'vm-table--border': border,
          'vm-table--stripe': stripe,
          'vm-table--loading': loading
        }"
      >
        <thead class="vm-table__header">
          <tr v-for="(row, rowIndex) in headerRows" :key="rowIndex">
            <th
              v-for="(column, index) in row"
              :key="column.__id || index"
              :rowspan="column.rowspan"
              :colspan="column.colspan"
              :class="headerCellClass(column)"
              :style="headerCellStyle(column)"
              @click="handleSort(column)"
            >
              <div class="vm-table__cell">
                <span v-if="column.type === 'selection'">
                  <input
                    type="checkbox"
                    :checked="isAllSelected"
                    @change="handleSelectAll"
                  >
                </span>
                <span v-else>{{ column.title }}</span>
                <span
                  v-if="column.sortable && column.isLeaf"
                  class="vm-table__sort"
                  :class="{
                    'vm-table__sort--ascending': sortState.prop === column.key && sortState.order === 'ascending',
                    'vm-table__sort--descending': sortState.prop === column.key && sortState.order === 'descending'
                  }"
                >
                  <i class="vm-table__sort-icon vm-table__sort-icon--up"></i>
                  <i class="vm-table__sort-icon vm-table__sort-icon--down"></i>
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody class="vm-table__body">
          <template v-for="(row, rowIndex) in paginatedData" :key="getRowKey(row, rowIndex)">
            <tr :class="bodyRowClass(row, rowIndex)" :style="bodyRowStyle(row, rowIndex)">
              <td
                v-for="(column, colIndex) in leafColumns"
                :key="column.__id ?? colIndex"
                :class="bodyCellClass(row, column, rowIndex, colIndex)"
                :style="bodyCellStyle(row, column, rowIndex, colIndex)"
              >
                <template v-if="column.type === 'selection'">
                  <input
                    type="checkbox"
                    :checked="selectedRows.includes(row)"
                    @change="(e) => handleSelectRow(e, row)"
                  >
                </template>
                <template v-else-if="column.type === 'expand'">
                  <button
                    @click="toggleExpand(row)"
                    class="vm-table__expand-button"
                  >
                    {{ expandedRows.includes(row) ? '−' : '+' }}
                  </button>
                </template>
                <template v-else-if="column.type === 'index'">
                  <span>{{ getRowDisplayIndex(rowIndex) }}</span>
                </template>
                <slot
                  :name="column.slot"
                  :row="row"
                  :column="column"
                  :rowIndex="rowIndex"
                  v-else-if="column.slot"
                ></slot>
                <template v-else>
                  <Tooltip
                    v-if="shouldUseTooltip(column)"
                    :content="renderCellText(row, column)"
                    :placement="tooltipPlacement"
                    :open-delay="tooltipDelay"
                  >
                    <div class="vm-table__cell-content is-ellipsis">
                      {{ renderCellText(row, column) }}
                    </div>
                  </Tooltip>
                  <div v-else class="vm-table__cell-content" :class="{ 'is-ellipsis': column.ellipsis !== false }">
                    {{ renderCellText(row, column) }}
                  </div>
                </template>
              </td>
            </tr>
            <tr v-if="expandedRows.includes(row)" class="vm-table__expand-row">
              <td :colspan="leafColumns.length">
                <slot
                  :name="getExpandSlotName()"
                  :row="row"
                  :rowIndex="rowIndex"
                ></slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div v-if="pagination" class="vm-table__pagination">
      <button
        :disabled="currentPage <= 1"
        @click="handlePageChange(currentPage - 1)"
      >
        上一页
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button
        :disabled="currentPage >= totalPages"
        @click="handlePageChange(currentPage + 1)"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, reactive } from 'vue'

defineOptions({
  name: 'VTable'
})
import type { Placement } from '@popperjs/core'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import type { TableColumn, TableProps } from './type'

type InnerColumn = TableColumn & {
  __id?: string
  level?: number
  colspan?: number
  rowspan?: number
  isLeaf?: boolean
  fixedLeft?: number
  fixedRight?: number
}

const props = withDefaults(defineProps<TableProps>(), {
  border: false,
  stripe: false,
  loading: false,
  data: () => [],
  columns: () => [],
  defaultSort: undefined,
  pagination: undefined,
  expandKey: 'id',
  size: 'default',
  tooltipConfig: () => ({
    placement: 'top',
    showDelay: 150,
    hideDelay: 0
  })
})

const size = computed(() => props.size || 'default')

const tooltipPlacement = computed<Placement | undefined>(() => {
  const placement = props.tooltipConfig?.placement
  return (placement as Placement) || 'top'
})
const tooltipDelay = computed(() => props.tooltipConfig?.showDelay || 150)

const countLeaf = (columns: TableColumn[]): number => {
  return columns.reduce((sum, col) => {
    if (col.children && col.children.length) {
      return sum + countLeaf(col.children)
    }
    return sum + 1
  }, 0)
}

const processedColumns = computed(() => {
  const cols = [...props.columns]

  const selectionIndex = cols.findIndex(col => col.type === 'selection')
  if (selectionIndex !== -1) {
    const selectionCol: TableColumn = { ...cols.splice(selectionIndex, 1)[0], type: 'selection', title: '选择', key: 'selection', width: 50, align: 'center' }
    cols.unshift(selectionCol)
  }

  const expandIndex = cols.findIndex(col => col.type === 'expand')
  if (expandIndex !== -1) {
    const expandCol: TableColumn = { ...cols.splice(expandIndex, 1)[0], type: 'expand', title: '展开', key: 'expand', width: 56, align: 'center' }
    cols.unshift(expandCol)
  }

  const indexIdx = cols.findIndex(col => col.type === 'index')
  if (indexIdx !== -1) {
    const raw = cols.splice(indexIdx, 1)[0]
    const indexCol: TableColumn = {
      ...raw,
      type: 'index',
      title: raw.title || '#',
      key: raw.key || '__index',
      width: raw.width ?? 48,
      align: raw.align ?? 'center'
    }
    let insertAt = 0
    while (
      insertAt < cols.length &&
      (cols[insertAt].type === 'expand' || cols[insertAt].type === 'selection')
    ) {
      insertAt += 1
    }
    cols.splice(insertAt, 0, indexCol)
  }

  return cols
})

const maxDepth = (cols: TableColumn[]): number => {
  return cols.reduce((depth, col) => {
    if (col.children && col.children.length) {
      return Math.max(depth, 1 + maxDepth(col.children))
    }
    return Math.max(depth, 1)
  }, 0)
}

const normalizeColumns = computed(() => {
  const cols = processedColumns.value
  const depth = maxDepth(cols)
  const headerRows: InnerColumn[][] = Array.from({ length: depth }, () => [])
  const leafColumns: InnerColumn[] = []

  let idSeed = 0
  const traverse = (columns: TableColumn[], level: number, parentFixed?: 'left' | 'right' | boolean) => {
    columns.forEach((col) => {
      const current: InnerColumn = {
        ...col,
        __id: `${level}-${idSeed++}`,
        level,
        colspan: 1,
        rowspan: 1,
        isLeaf: !col.children || col.children.length === 0,
        fixed: col.fixed ?? parentFixed
      }

      if (col.children && col.children.length) {
        const childLeafCount = countLeaf(col.children)
        current.colspan = childLeafCount
        current.rowspan = 1
        headerRows[level].push(current)
        traverse(col.children, level + 1, current.fixed)
      } else {
        current.rowspan = depth - level
        headerRows[level].push(current)
        leafColumns.push(current)
      }
    })
  }

  traverse(cols, 0)
  const leafColumnsWithFixed = applyFixedOffsetsImmutable(leafColumns)
  const fixedById = new Map<string, { fixedLeft?: number; fixedRight?: number }>()
  leafColumnsWithFixed.forEach((c) => {
    if (c.__id) {
      fixedById.set(c.__id, { fixedLeft: c.fixedLeft, fixedRight: c.fixedRight })
    }
  })
  const patchedHeaderRows = headerRows.map((row) =>
    row.map((cell) => {
      const patch = cell.__id ? fixedById.get(cell.__id) : undefined
      if (!patch) return cell
      return { ...cell, ...patch }
    })
  )
  return { headerRows: patchedHeaderRows, leafColumns: leafColumnsWithFixed }
})

const headerRows = computed(() => normalizeColumns.value.headerRows)
const leafColumns = computed(() => normalizeColumns.value.leafColumns)

/** 不修改入参，返回带 fixedLeft / fixedRight 的叶子列副本 */
const applyFixedOffsetsImmutable = (leafCols: InnerColumn[]): InnerColumn[] => {
  let left = 0
  const withLeft = leafCols.map((col) => {
    if (col.fixed === 'left' || col.fixed === true) {
      const fixedLeft = left
      left += col.width || 80
      return { ...col, fixedLeft }
    }
    return { ...col }
  })

  let right = 0
  const result = withLeft.map((c) => ({ ...c }))
  for (let i = result.length - 1; i >= 0; i -= 1) {
    const col = result[i]
    if (col.fixed === 'right') {
      const fixedRight = right
      right += col.width || 80
      result[i] = { ...col, fixedRight }
    }
  }
  return result
}

const containerStyle = computed(() => {
  return {
    maxHeight: props.maxHeight ? toPx(props.maxHeight) : undefined,
    height: props.height ? toPx(props.height) : undefined,
    overflow: props.maxHeight || props.height ? 'auto' : undefined
  }
})

const toPx = (val?: number | string) => {
  if (val === undefined || val === null) return undefined
  return typeof val === 'number' ? `${val}px` : val
}

const sortState = reactive({
  prop: '',
  order: '' as 'ascending' | 'descending' | ''
})

const applyDefaultSort = (ds: TableProps['defaultSort']) => {
  if (!ds) {
    sortState.prop = ''
    sortState.order = ''
    return
  }
  sortState.prop = ds.prop
  sortState.order = ds.order
}

applyDefaultSort(props.defaultSort)

watch(
  () => props.defaultSort,
  (ds) => {
    applyDefaultSort(ds)
  },
  { deep: true }
)

const handleSort = (column: TableColumn) => {
  if (column.type === 'index') return
  if (!column.sortable || column.children?.length) return

  if (sortState.prop === column.key) {
    if (sortState.order === '') {
      sortState.order = 'ascending'
    } else if (sortState.order === 'ascending') {
      sortState.order = 'descending'
    } else {
      sortState.order = ''
    }
  } else {
    sortState.prop = column.key
    sortState.order = 'ascending'
  }
}

const sortedData = computed(() => {
  if (!sortState.prop || !sortState.order) {
    return props.data
  }

  const sorted = [...props.data]
  const order = sortState.order === 'ascending' ? 1 : -1

  return sorted.sort((a, b) => {
    const aVal = a[sortState.prop]
    const bVal = b[sortState.prop]

    if (aVal === bVal) return 0
    if (aVal == null && bVal == null) return 0
    if (aVal == null) return order
    if (bVal == null) return -order

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return order * aVal.localeCompare(bVal)
    }

    if (typeof aVal === 'number' && typeof bVal === 'number' && (Number.isNaN(aVal) || Number.isNaN(bVal))) {
      return 0
    }

    return order * (aVal > bVal ? 1 : aVal < bVal ? -1 : 0)
  })
})

const currentPage = ref(props.pagination?.currentPage || 1)
const pageSize = ref(props.pagination?.pageSize || 10)

watch(
  () => props.pagination,
  (p) => {
    if (!p) return
    if (p.currentPage != null) currentPage.value = p.currentPage
    if (p.pageSize != null) pageSize.value = p.pageSize
  },
  { deep: true }
)

const paginatedData = computed(() => {
  if (!props.pagination) return sortedData.value

  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return sortedData.value.slice(start, end)
})

const totalPages = computed(() => {
  if (!props.pagination) return 1
  return Math.ceil(sortedData.value.length / pageSize.value)
})

const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

const selectedRows = ref<Record<string, any>[]>([])

const isAllSelected = computed(() => {
  if (paginatedData.value.length === 0) return false
  return paginatedData.value.every(row => selectedRows.value.includes(row))
})

const handleSelectAll = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked

  if (checked) {
    selectedRows.value = [...new Set([...selectedRows.value, ...paginatedData.value])]
  } else {
    selectedRows.value = selectedRows.value.filter(
      row => !paginatedData.value.includes(row)
    )
  }
}

const handleSelectRow = (e: Event, row: Record<string, any>) => {
  const checked = (e.target as HTMLInputElement).checked

  if (checked) {
    selectedRows.value.push(row)
  } else {
    const index = selectedRows.value.indexOf(row)
    if (index > -1) {
      selectedRows.value.splice(index, 1)
    }
  }
}

const expandedRows = ref<Record<string, any>[]>([])

const toggleExpand = (row: Record<string, any>) => {
  const index = expandedRows.value.indexOf(row)
  if (index > -1) {
    expandedRows.value.splice(index, 1)
  } else {
    expandedRows.value.push(row)
  }
}

const getExpandSlotName = () => {
  const expandColumn = props.columns.find(col => col.type === 'expand')
  return expandColumn?.expandSlot || 'expand'
}

const getRowKey = (row: Record<string, any>, rowIndex: number) => {
  const k = props.expandKey
  const val = k ? row[k] : undefined
  if (val !== undefined && val !== null && String(val) !== '') {
    return String(val)
  }
  return `__row_${rowIndex}`
}

const getRowDisplayIndex = (rowIndex: number) => {
  if (!props.pagination) {
    return rowIndex + 1
  }
  return (currentPage.value - 1) * pageSize.value + rowIndex + 1
}

const renderCellText = (row: Record<string, any>, column: TableColumn) => {
  if (column.type === 'index') {
    return ''
  }
  const val = row[column.key]
  if (val === null || val === undefined) {
    return ''
  }
  return String(val)
}

const shouldUseTooltip = (column: TableColumn) => {
  if (column.tooltip === false) return false
  if (column.tooltip === true) return true
  return column.ellipsis !== false
}

const headerCellClass = (column: InnerColumn) => {
  return [
    column.align ? `vm-table__th--align-${column.align}` : 'vm-table__th--align-left',
    column.sortable ? 'vm-table__th--sortable' : '',
    column.fixed ? 'vm-table__th--fixed' : '',
    column.className || ''
  ].filter(Boolean)
}

const headerCellStyle = (column: InnerColumn) => {
  const style: Record<string, any> = {
    ...(column.style || {}),
    width: column.width ? `${column.width}px` : undefined,
    minWidth: column.width ? `${column.width}px` : undefined
  }
  if (column.fixedLeft !== undefined) {
    style.position = 'sticky'
    style.left = `${column.fixedLeft}px`
    style.zIndex = 3
  }
  if (column.fixedRight !== undefined) {
    style.position = 'sticky'
    style.right = `${column.fixedRight}px`
    style.zIndex = 3
  }
  return style
}

const bodyRowClass = (row: Record<string, any>, rowIndex: number) => {
  const stripeClass = props.stripe && rowIndex % 2 === 1 ? 'vm-table__row--stripe' : ''
  const user = typeof props.rowClass === 'function' ? props.rowClass(row, rowIndex) : props.rowClass
  return [stripeClass, user].filter(Boolean)
}

const bodyRowStyle = (row: Record<string, any>, rowIndex: number) => {
  return typeof props.rowStyle === 'function' ? props.rowStyle(row, rowIndex) : props.rowStyle
}

const bodyCellClass = (row: Record<string, any>, column: InnerColumn, rowIndex: number, colIndex: number) => {
  const alignClass = column.align ? `vm-table__td--align-${column.align}` : 'vm-table__td--align-left'
  const fixedClass = column.fixed ? 'vm-table__td--fixed' : ''
  const ellipsisClass = column.ellipsis !== false ? 'is-ellipsis' : ''
  const columnClass = column.className || ''
  const custom = props.cellClass ? props.cellClass(row, column, rowIndex, colIndex) : ''
  return [alignClass, fixedClass, ellipsisClass, columnClass, custom].filter(Boolean)
}

const bodyCellStyle = (row: Record<string, any>, column: InnerColumn, rowIndex: number, colIndex: number) => {
  const style: Record<string, any> = {
    ...(column.style || {}),
    width: column.width ? `${column.width}px` : undefined,
    minWidth: column.width ? `${column.width}px` : undefined
  }
  if (column.fixedLeft !== undefined) {
    style.position = 'sticky'
    style.left = `${column.fixedLeft}px`
    style.zIndex = 2
    style.background = 'var(--vm-bg-color)'
  }
  if (column.fixedRight !== undefined) {
    style.position = 'sticky'
    style.right = `${column.fixedRight}px`
    style.zIndex = 2
    style.background = 'var(--vm-bg-color)'
  }
  const userStyle = props.cellStyle ? props.cellStyle(row, column, rowIndex, colIndex) : undefined
  return { ...style, ...userStyle }
}

watch(
  () => props.data,
  (newData) => {
    if (import.meta.env.DEV && !Array.isArray(newData)) {
      console.warn('[Table] data prop should be an array')
    }
  },
  { immediate: true }
)

watch(
  () => props.columns,
  (newColumns) => {
    if (import.meta.env.DEV && !Array.isArray(newColumns)) {
      console.warn('[Table] columns prop should be an array')
    }
  },
  { immediate: true }
)
</script>
