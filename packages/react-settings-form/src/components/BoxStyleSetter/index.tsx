import { observer, useField } from '@formily/react'
import { IconWidget, usePrefix } from '@kdesignable/react'
import cls from 'classnames'
import React from 'react'
import { FoldItem } from '../FoldItem'
import { InputItems } from '../InputItems'
import { SizeInput } from '../SizeInput'

type Position = 'top' | 'right' | 'left' | 'bottom' | 'all'
export interface IMarginStyleSetterProps {
  className?: string
  style?: React.CSSProperties
  labels?: React.ReactNode[]
  value?: string
  onChange?: (value: string) => void
}

const PositionMap = {
  top: 1,
  right: 2,
  bottom: 3,
  left: 4,
  all: 1,
}

const BoxRex =
  /([\d\.]+[^\d\s\.+-]+)(?:\s+([\d\.]+[^\d\s\.+-]+)(?:\s+([\d\.]+[^\d\s\.+-]+)(?:\s+([\d\.]+[^\d\s\.+-]+))?)?)?/

export const BoxStyleSetter: React.FC<IMarginStyleSetterProps> = observer(
  (props) => {
    // Use default parameter destructuring
    const {
      labels = [
        <IconWidget infer="Top" size={16} key="1" />,
        <IconWidget infer="Right" size={16} key="2" />,
        <IconWidget infer="Bottom" size={16} key="3" />,
        <IconWidget infer="Left" size={16} key="4" />,
      ],
    } = props

    const field = useField()
    const prefix = usePrefix('box-style-setter')
    const createPositionHandler = (
      position: Position,
      props: IMarginStyleSetterProps
    ) => {
      const matched = String(props.value).match(BoxRex) || []
      const value = matched[PositionMap[position]]
      const v1 = matched[1]
      const v2 = matched[2]
      const v3 = matched[3]
      const v4 = matched[4]
      const allEqualls = v1 === v2 && v2 === v3 && v3 === v4
      return {
        ...props,
        value: position === 'all' ? (allEqualls ? v1 : undefined) : value,
        onChange(value: string) {
          if (position === 'all') {
            props.onChange?.(
              `${value || '0px'} ${value || '0px'} ${value || '0px'} ${
                value || '0px'
              }`
            )
          } else {
            matched[PositionMap[position]] = value
            props.onChange?.(
              `${matched[1] || '0px'} ${matched[2] || '0px'} ${
                matched[3] || '0px'
              } ${matched[4] || '0px'}`
            )
          }
        },
      }
    }

    return (
      <FoldItem className={cls(prefix, props.className)} label={field.title}>
        <FoldItem.Base>
          <SizeInput
            {...createPositionHandler('all', props)}
            exclude={['inherit', 'auto']}
          />
        </FoldItem.Base>
        <FoldItem.Extra>
          <InputItems width="50%">
            <InputItems.Item icon={labels[0]}>
              <SizeInput
                {...createPositionHandler('top', props)}
                exclude={['inherit', 'auto']}
              />
            </InputItems.Item>
            <InputItems.Item icon={labels[1]}>
              <SizeInput
                {...createPositionHandler('right', props)}
                exclude={['inherit', 'auto']}
              />
            </InputItems.Item>
            <InputItems.Item icon={labels[2]}>
              <SizeInput
                {...createPositionHandler('bottom', props)}
                exclude={['inherit', 'auto']}
              />
            </InputItems.Item>
            <InputItems.Item icon={labels[3]}>
              <SizeInput
                {...createPositionHandler('left', props)}
                exclude={['inherit', 'auto']}
              />
            </InputItems.Item>
          </InputItems>
        </FoldItem.Extra>
      </FoldItem>
    )
  }
)
