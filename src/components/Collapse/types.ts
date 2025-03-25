/* eslint-disable no-unused-vars */
import type { Ref, InjectionKey } from 'vue'

export type NameType = string | number

export interface CollapseProps {
  // 当前激活的面板
  modelValue: NameType[]
  // 是否手风琴模式
  accordion?: boolean
}

export interface CollapseItemProps {
  name: NameType
  title?: string
  disabled?: boolean
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}
export interface CollapseEmits {
  (e: 'update:modelValue', values: NameType[]): void
  (e: 'change', values: NameType[]): void
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')
