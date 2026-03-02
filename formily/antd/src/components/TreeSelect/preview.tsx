import { createBehavior, createResource } from '@kdesignable/core'
import { DnFC } from '@kdesignable/react'
import { TreeSelect as FormilyTreeSelect } from '@potop/formily-antd-v6'
import React from 'react'
import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const TreeSelect: DnFC<React.ComponentProps<typeof FormilyTreeSelect>> =
  FormilyTreeSelect

TreeSelect.Behavior = createBehavior({
  name: 'TreeSelect',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'TreeSelect',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.TreeSelect),
  },
  designerLocales: AllLocales.TreeSelect,
})

TreeSelect.Resource = createResource({
  icon: 'TreeSelectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: 'TreeSelect',
        'x-decorator': 'FormItem',
        'x-component': 'TreeSelect',
      },
    },
  ],
})
