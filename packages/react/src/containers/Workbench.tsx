import { observer } from '@formily/reactive-react'
import React, { PropsWithChildren } from 'react'
import { useWorkbench } from '../hooks'
import { Workspace } from './Workspace'

export const Workbench: React.FC<PropsWithChildren> = observer((props) => {
  const workbench = useWorkbench()
  return (
    <Workspace id={workbench.currentWorkspace?.id}>{props.children}</Workspace>
  )
})
