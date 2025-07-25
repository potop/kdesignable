import { FormItem } from '@formily/antd-v5'
import { Field as FieldType } from '@formily/core'
import { Field, observer, useField } from '@formily/react'
import { IconWidget, usePrefix } from '@kdesignable/react'
import { Radio } from 'antd'
import cls from 'classnames'
import React from 'react'
import { FlexStyleSetter } from '../FlexStyleSetter'
import './styles.scss'
export interface IDisplayStyleSetterProps {
  className?: string
  style?: React.CSSProperties
  value?: string
  onChange?: (value: string) => void
}

export const DisplayStyleSetter: React.FC<IDisplayStyleSetterProps> = observer(
  (props) => {
    const field = useField<FieldType>()
    const prefix = usePrefix('display-style-setter')
    return (
      <>
        <FormItem.BaseItem
          label={field.title}
          className={cls(prefix, props.className)}
          style={props.style}
        >
          <Radio.Group
            className={prefix + '-radio'}
            options={[
              {
                label: <IconWidget infer="DisplayBlock" size={16} />,
                value: 'block',
              },
              {
                label: <IconWidget infer="DisplayInlineBlock" size={16} />,
                value: 'inline-block',
              },
              {
                label: <IconWidget infer="DisplayInline" size={16} />,
                value: 'inline',
              },
              {
                label: <IconWidget infer="DisplayFlex" size={16} />,
                value: 'flex',
              },
            ]}
            value={props.value}
            onChange={(e) => {
              props.onChange?.(e.target.value)
            }}
            optionType="button"
          />
        </FormItem.BaseItem>
        <Field
          name="flex"
          basePath={field.address.parent()}
          visible={false}
          reactions={(flexField) => {
            flexField.visible = field.value === 'flex'
          }}
          component={[FlexStyleSetter]}
        />
      </>
    )
  }
)
