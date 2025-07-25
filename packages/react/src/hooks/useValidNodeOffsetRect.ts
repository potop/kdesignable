import { CursorDragType, CursorStatus, TreeNode } from '@kdesignable/core'
import { LayoutObserver } from '@kdesignable/shared'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDesigner } from './useDesigner'
import { useViewport } from './useViewport'

const isEqualRect = (rect1: DOMRect, rect2: DOMRect) => {
  return (
    rect1?.x === rect2?.x &&
    rect1?.y === rect2?.y &&
    rect1?.width === rect2?.width &&
    rect1?.height === rect2?.height
  )
}

export const useValidNodeOffsetRect = (node: TreeNode) => {
  const engine = useDesigner()
  const viewport = useViewport()
  const [, forceUpdate] = useState(null)
  const rectRef = useMemo(
    () => ({ current: viewport.getValidNodeOffsetRect(node) }),
    [viewport]
  )

  const element = viewport.findElementById(node?.id)

  const compute = useCallback(() => {
    if (
      engine.cursor.status !== CursorStatus.Normal &&
      engine.cursor.dragType === CursorDragType.Move
    )
      return
    const nextRect = viewport.getValidNodeOffsetRect(node)
    if (!isEqualRect(rectRef.current, nextRect) && nextRect) {
      rectRef.current = nextRect
      forceUpdate([])
    }
  }, [viewport, node])

  useEffect(() => {
    const layoutObserver = new LayoutObserver(compute)
    if (element) layoutObserver.observe(element)
    return () => {
      layoutObserver.disconnect()
    }
  }, [node, viewport, element])
  return rectRef.current
}
