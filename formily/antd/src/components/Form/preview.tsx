import { Form as FormilyForm } from '@formily/antd-v5'
import { createForm } from '@formily/core'
import { observer } from '@formily/react'
import { createBehavior, createResource } from '@kdesignable/core'
import { DnFC, usePrefix } from '@kdesignable/react'
import React, { useMemo } from 'react'
import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import './styles.scss'

export const Form: DnFC<React.ComponentProps<typeof FormilyForm>> = observer(
  (props) => {
    const prefix = usePrefix('designable-form')
    const form = useMemo(
      () =>
        createForm({
          designable: true,
        }),
      []
    )
    return (
      <FormilyForm
        {...props}
        style={{ ...props.style }}
        className={prefix}
        form={form}
      >
        {props.children}
      </FormilyForm>
    )
  }
)

Form.Behavior = createBehavior({
  name: 'Form',
  selector: (node) => node.componentName === 'Form',
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      propsSchema: {
        type: 'object',
        properties: {
          ...(AllSchemas.FormLayout.properties as any),
          style: AllSchemas.CSSStyle,
        },
      },
      defaultProps: {
        labelCol: 6,
        wrapperCol: 12,
      },
    }
  },
  designerLocales: AllLocales.Form,
})

Form.Resource = createResource({
  title: { 'en-US': 'Form' },
  icon: 'FormLayoutSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
        'x-component': 'Form',
      },
    },
  ],
})
