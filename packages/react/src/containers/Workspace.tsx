import React, { Fragment, PropsWithChildren, useMemo, useRef } from 'react'
import { WorkspaceContext } from '../context'
import { useDesigner } from '../hooks'
export interface IWorkspaceProps {
  id?: string
  title?: string
  description?: string
}

export const Workspace: React.FC<PropsWithChildren<IWorkspaceProps>> = ({
  id,
  title,
  description,
  ...props
}) => {
  const oldId = useRef<string>(null)
  const designer = useDesigner()
  const workspace = useMemo(() => {
    if (!designer) return
    if (oldId.current && oldId.current !== id) {
      const old = designer.workbench.findWorkspaceById(oldId.current)
      if (old) old.viewport.detachEvents()
    }
    const workspace = {
      id: id || 'index',
      title,
      description,
    }
    designer.workbench.ensureWorkspace(workspace)
    oldId.current = workspace.id
    return workspace
  }, [id, designer])
  return (
    <Fragment>
      <WorkspaceContext.Provider value={workspace}>
        {props.children}
      </WorkspaceContext.Provider>
    </Fragment>
  )
}
