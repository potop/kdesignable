import { usePrefix } from '@kdesignable/react'
import { ColorPicker, Input } from 'antd'
import React from 'react'
import './styles.scss'

export interface IColorInputProps {
  value?: string
  onChange?: (color: string) => void
}

export const ColorInput: React.FC<IColorInputProps> = (props) => {
  const prefix = usePrefix('color-input')
  const color = props.value as string
  return (
    <div className={prefix}>
      <Input
        value={props.value === null ? undefined : props.value}
        onChange={(e) => {
          props.onChange?.(e.target.value)
        }}
        placeholder="Color"
        prefix={
          <ColorPicker
            value={color}
            onChange={(value) => {
              props.onChange?.(value.toRgbString())
            }}
          >
            <div
              className={prefix + '-color-tips'}
              style={{
                backgroundColor: color,
              }}
            ></div>
          </ColorPicker>
        }
      />
    </div>
  )
}
