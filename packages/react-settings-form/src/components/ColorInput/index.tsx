import { usePrefix } from '@kdesignable/react'
import { Input, Popover } from 'antd'
import React, { useRef } from 'react'
import { SketchPicker } from 'react-color'
import './styles.scss'

export interface IColorInputProps {
  value?: string
  onChange?: (color: string) => void
}

export const ColorInput: React.FC<IColorInputProps> = (props) => {
  const container = useRef<HTMLDivElement>(null)
  const prefix = usePrefix('color-input')
  const color = props.value as string
  return (
    <div ref={container} className={prefix}>
      <Input
        value={props.value === null ? undefined : props.value}
        onChange={(e) => {
          props.onChange?.(e.target.value)
        }}
        placeholder="Color"
        prefix={
          <Popover
            autoAdjustOverflow
            trigger="click"
            styles={{
              content: {
                padding: 0,
              },
            }}
            getPopupContainer={() => container.current}
            content={
              <SketchPicker
                color={color}
                onChange={({ rgb }) => {
                  props.onChange?.(`rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`)
                }}
              />
            }
          >
            <div
              className={prefix + '-color-tips'}
              style={{
                backgroundColor: color,
              }}
            ></div>
          </Popover>
        }
      />
    </div>
  )
}
