import { createBehavior, createResource } from '@kdesignable/core'
import { DnFC } from '@kdesignable/react'
import { Transfer as FormilyTransfer } from '@potop/formily-antd-v6'
import React from 'react'
import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const Transfer: DnFC<React.ComponentProps<typeof FormilyTransfer>> =
  FormilyTransfer

Transfer.Behavior = createBehavior({
  name: 'Transfer',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Transfer',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Transfer),
  },
  designerLocales: AllLocales.Transfer,
})

Transfer.Resource = createResource({
  icon: 'TransferSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: 'Transfer',
        'x-decorator': 'FormItem',
        'x-component': 'Transfer',
      },
    },
  ],
})
