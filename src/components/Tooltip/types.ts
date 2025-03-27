import type { Placement } from '@popperjs/core'
export interface TooltipProps {
  content?: string
  trigger?: 'hover' | 'click'
  placement: Placement
}

export interface TooltipEmits {
  // eslint-disable-next-line no-unused-vars
  (e: 'visible-change', value: boolean): void
}
