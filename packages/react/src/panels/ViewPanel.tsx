import { observer } from '@formily/reactive-react'
import { ITreeNode, TreeNode, WorkbenchTypes } from '@kdesignable/core'
import { requestIdle } from '@kdesignable/shared'
import React, { useEffect, useState } from 'react'
import { Viewport } from '../containers'
import { useTree, useWorkbench } from '../hooks'

export interface IViewPanelProps {
  type: WorkbenchTypes
  children: (
    tree: TreeNode,
    onChange: (tree: ITreeNode) => void
  ) => React.ReactElement
  scrollable?: boolean
  dragTipsDirection?: 'left' | 'right'
}

export const ViewPanel: React.FC<IViewPanelProps> = observer(
  ({ scrollable = true, ...props }) => {
    const [visible, setVisible] = useState(true)
    const workbench = useWorkbench()
    const tree = useTree()
    useEffect(() => {
      if (workbench.type === props.type) {
        requestIdle(() => {
          requestAnimationFrame(() => {
            setVisible(true)
          })
        })
      } else {
        setVisible(false)
      }
    }, [workbench.type])
    if (workbench.type !== props.type) return null
    const render = () => {
      return props.children(tree, (payload) => {
        tree.from(payload)
        tree.takeSnapshot()
      })
    }
    if (workbench.type === 'DESIGNABLE')
      return (
        <Viewport dragTipsDirection={props.dragTipsDirection}>
          {render()}
        </Viewport>
      )
    return (
      <div
        style={{
          overflow: scrollable ? 'overlay' : 'hidden',
          height: '100%',
          cursor: 'auto',
          userSelect: 'text',
        }}
      >
        {visible && render()}
      </div>
    )
  }
)
