export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'default'
export type NativeType = 'button' | 'submit' | 'reset'
export type ButtonSize = 'large' | 'small'

export interface ButtonInstance {
  ref: HTMLButtonElement
}
export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  nativeType?: NativeType
  round?: boolean
  plain?: boolean
  circle?: boolean
  disabled?: boolean
  autofocus?: boolean
}
