import { ButtonProps } from 'antd'

export type TButton = ButtonProps & {
  variant?: 'primary' | 'secondary' | 'login'
  onClick?: React.MouseEventHandler<HTMLElement>
  children: React.ReactNode
  className?: string
  htmlType?: 'button' | 'submit' | 'reset' | undefined
}
