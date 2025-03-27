export type AlertType = 'success' | 'warning' | 'danger' | 'info' | 'primary'

export interface AlertProps {
  content?: string
  type: AlertType
  effect?: 'light' | 'dark'
  closable?: boolean
}

export interface AlertEmits {
  // eslint-disable-next-line no-unused-vars
  (e: 'close'): void
}

export interface AlertInstance {
  hide: () => void
}
