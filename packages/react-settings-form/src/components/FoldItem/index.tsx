import { observer, useField } from '@formily/react'
import { observable } from '@formily/reactive'
import { IconWidget, usePrefix } from '@kdesignable/react'
import { FormItem, IFormItemProps } from '@potop/formily-antd-v6'
import cls from 'classnames'
import React, { Fragment, PropsWithChildren, useMemo, useRef } from 'react'
import './styles.scss'

const ExpandedMap = new Map<string, boolean>()

export const FoldItem: React.FC<PropsWithChildren<IFormItemProps>> & {
  Base?: React.FC<PropsWithChildren>
  Extra?: React.FC<PropsWithChildren>
} = observer(({ className, style, children, ...props }) => {
  const prefix = usePrefix('fold-item')
  const field = useField()
  const expand = useMemo(
    () => observable.ref(ExpandedMap.get(field.address.toString())),
    []
  )
  const slots = useRef({ base: null, extra: null })
  React.Children.forEach(children, (node) => {
    if (React.isValidElement(node)) {
      if (node?.['type']?.['displayName'] === 'FoldItem.Base') {
        slots.current.base = (node.props as PropsWithChildren).children
      }
      if (node?.['type']?.['displayName'] === 'FoldItem.Extra') {
        slots.current.extra = (node.props as PropsWithChildren).children
      }
    }
  })
  return (
    <div className={cls(prefix, className)}>
      <div
        className={prefix + '-base'}
        onClick={() => {
          expand.value = !expand.value
          ExpandedMap.set(field.address.toString(), expand.value)
        }}
      >
        <FormItem.BaseItem
          {...props}
          label={
            <span
              className={cls(prefix + '-title', {
                expand: expand.value,
              })}
            >
              {slots.current.extra && <IconWidget infer="Expand" size={10} />}
              {props.label}
            </span>
          }
        >
          <div
            style={{ width: '100%' }}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {slots.current.base}
          </div>
        </FormItem.BaseItem>
      </div>
      {expand.value && slots.current.extra && (
        <div className={prefix + '-extra'}>{slots.current.extra}</div>
      )}
    </div>
  )
})

const Base: React.FC = () => {
  return <Fragment />
}

Base.displayName = 'FoldItem.Base'

const Extra: React.FC = () => {
  return <Fragment />
}

Extra.displayName = 'FoldItem.Extra'

FoldItem.Base = Base
FoldItem.Extra = Extra
