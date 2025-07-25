import cls from 'classnames'
import React from 'react'
import { usePrefix } from '../../hooks'
import { MobileBody } from './body'
import './styles.scss'
export interface IMobileSimulatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  style?: React.CSSProperties
}

export const MobileSimulator: React.FC<IMobileSimulatorProps> = (props) => {
  const prefix = usePrefix('mobile-simulator')
  return (
    <div {...props} className={cls(prefix, props.className)}>
      <div className={prefix + '-content'}>
        <MobileBody>{props.children}</MobileBody>
      </div>
    </div>
  )
}
