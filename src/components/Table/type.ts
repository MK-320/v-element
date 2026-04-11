export interface TableColumn {
  title: string
  key: string
  width?: number
  align?: 'left' | 'center' | 'right'
  slot?: string
  sortable?: boolean
  fixed?: boolean | 'left' | 'right'
  type?: 'selection' | 'index' | 'expand'
  expandSlot?: string
  children?: TableColumn[] // 多级表头
  ellipsis?: boolean // 是否开启单元格省略
  tooltip?: boolean // 是否使用 Tooltip 展示溢出内容
  className?: string
  style?: Record<string, any>
}

export interface TableTooltipConfig {
  placement?: string
  offset?: number | [number, number]
  showDelay?: number
  hideDelay?: number
}

export interface TableProps {
  border?: boolean
  stripe?: boolean
  loading?: boolean
  data: Record<string, any>[]
  columns: TableColumn[]
  defaultSort?: {
    prop: string
    order: 'ascending' | 'descending'
  }
  pagination?: {
    pageSize: number
    currentPage: number
  }
  expandKey?: string
  height?: number | string // 固定表头/流体高度
  maxHeight?: number | string
  rowClass?: string | ((row: Record<string, any>, rowIndex: number) => string | string[])
  rowStyle?: Record<string, any> | ((row: Record<string, any>, rowIndex: number) => Record<string, any>)
  cellClass?: (row: Record<string, any>, column: TableColumn, rowIndex: number, columnIndex: number) => string | string[]
  cellStyle?: (row: Record<string, any>, column: TableColumn, rowIndex: number, columnIndex: number) => Record<string, any>
  tooltipConfig?: TableTooltipConfig
  size?: 'default' | 'small' | 'large'
}
