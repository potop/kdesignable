import { observer } from '@formily/reactive-react'
import { TreeNode, Viewport } from '@kdesignable/core'
import { globalThisPolyfill } from '@kdesignable/shared'
import cls from 'classnames'
import React, { useLayoutEffect, useRef } from 'react'
import { useOutline, usePrefix, useTree, useWorkbench } from '../../hooks'
import { NodeContext } from './context'
import { Insertion } from './Insertion'
import { OutlineTreeNode } from './OutlineNode'

export interface IOutlineTreeWidgetProps {
  className?: string
  style?: React.CSSProperties
  onClose?: () => void
  renderTitle?: (node: TreeNode) => React.ReactNode
  renderActions?: (node: TreeNode) => React.ReactNode
}

export const OutlineTreeWidget: React.FC<IOutlineTreeWidgetProps> = observer(
  ({ onClose, style, renderActions, renderTitle, className, ...props }) => {
    const ref = useRef<HTMLDivElement>(null)
    const prefix = usePrefix('outline-tree')
    const workbench = useWorkbench()
    const current = workbench?.activeWorkspace || workbench?.currentWorkspace
    const workspaceId = current?.id
    const tree = useTree(workspaceId)
    const outline = useOutline(workspaceId)
    const outlineRef = useRef<Viewport>(null)
    useLayoutEffect(() => {
      if (!workspaceId) return
      if (outlineRef.current && outlineRef.current !== outline) {
        outlineRef.current.onUnmount()
      }
      if (ref.current && outline) {
        outline.onMount(ref.current, globalThisPolyfill)
      }
      outlineRef.current = outline
      return () => {
        outline.onUnmount()
      }
    }, [workspaceId, outline])

    if (!outline || !workspaceId) return null
    return (
      <NodeContext.Provider value={{ renderActions, renderTitle }}>
        <div
          {...props}
          className={cls(prefix + '-container', className)}
          style={style}
        >
          <div className={prefix + '-content'} ref={ref}>
            <OutlineTreeNode node={tree} workspaceId={workspaceId} />
            <div
              className={prefix + '-aux'}
              style={{
                pointerEvents: 'none',
              }}
            >
              <Insertion workspaceId={workspaceId} />
            </div>
          </div>
        </div>
      </NodeContext.Provider>
    )
  }
)
