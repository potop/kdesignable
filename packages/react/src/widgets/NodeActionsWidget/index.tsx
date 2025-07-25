import { observer } from '@formily/reactive-react'
import { Divider, Space, Typography, TypographyProps } from 'antd'
import cls from 'classnames'
import React, { PropsWithChildren } from 'react'
import { usePrefix, useSelected, useTreeNode } from '../../hooks'
import { IconWidget } from '../IconWidget'
import { TextWidget } from '../TextWidget'
import './styles.scss'

export interface INodeActionsWidgetProps {
  className?: string
  style?: React.CSSProperties
  activeShown?: boolean
}

export interface INodeActionsWidgetActionProps
  extends Omit<React.ComponentProps<'a'>, 'title' | 'type' | 'ref'>,
    Partial<TypographyProps['Link']> {
  className?: string
  style?: React.CSSProperties
  title: React.ReactNode
  icon?: React.ReactNode
}

export const NodeActionsWidget: React.FC<
  PropsWithChildren<INodeActionsWidgetProps>
> & {
  Action?: React.FC<INodeActionsWidgetActionProps>
} = observer(({ children, ...props }) => {
  const node = useTreeNode()
  const prefix = usePrefix('node-actions')
  const selected = useSelected()
  if (selected.indexOf(node.id) === -1 && props.activeShown) return null
  return (
    <div className={cls(prefix, props.className)} style={props.style}>
      <div className={prefix + '-content'}>
        <Space split={<Divider type="vertical" />}>{children}</Space>
      </div>
    </div>
  )
})

NodeActionsWidget.Action = ({ icon, title, ...props }) => {
  const prefix = usePrefix('node-actions-item')
  return (
    <Typography.Link
      {...props}
      className={cls(props.className, prefix)}
      data-click-stop-propagation="true"
    >
      <span className={prefix + '-text'}>
        <IconWidget infer={icon} />
        <TextWidget>{title}</TextWidget>
      </span>
    </Typography.Link>
  )
}
