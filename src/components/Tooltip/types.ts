/* eslint-disable no-unused-vars */
import type { Placement, Options } from '@popperjs/core'
export interface TooltipProps {
  content?: string
  trigger?: 'hover' | 'click'
  placement?: Placement
  manual?: boolean
  disabled?: boolean
  popperOptions?: Partial<Options> //这个options里面包含了placement，所以要是传入options的优先级要比placement更高，会覆盖掉
  // option是Popperjs的配置项，默认里面的每个参数都是必选的，
  // 使用ts提供的Partial类型，可以将每个参数都变成可选的
  transition?: string
  openDelay?: number
  closeDelay?: number
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void
  (e: 'click-outside', value: boolean): void
}
export interface TooltipInstance {
  hide: () => void
  show: () => void
}
