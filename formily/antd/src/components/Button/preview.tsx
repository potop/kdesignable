import { Button as AntdButton, ButtonProps } from 'antd'
import React from 'react'

import { createBehavior, createResource } from '@kdesignable/core'
import { DnFC } from '@kdesignable/react'
import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createVoidFieldSchema } from '../Field'

export const Button: DnFC<ButtonProps> = ({ children, onClick, ...props }) => (
  // `onClick` is dropped on the canvas. An author's handler is still a `{{…}}` *string* here —
  // React warns when handed one as a listener — and a compiled one would fire real API calls
  // while someone is designing the form.
  <AntdButton {...props} htmlType="button">
    <span data-content-editable="x-component-props.children">{children}</span>
  </AntdButton>
)

Button.Behavior = createBehavior({
  name: 'Button',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Button',
  designerProps: {
    droppable: false,
    propsSchema: createVoidFieldSchema(AllSchemas.Button),
  },
  designerLocales: AllLocales.Button,
})

Button.Resource = createResource({
  icon: 'ButtonSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Button',
        'x-component-props': {
          children: 'Button',
          type: 'primary',
        },
      },
    },
  ],
})
