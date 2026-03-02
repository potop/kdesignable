import { createBehavior, createResource } from '@kdesignable/core'
import { DnFC } from '@kdesignable/react'
import { Password as FormilyPassword } from '@potop/formily-antd-v6'
import React from 'react'
import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const Password: DnFC<React.ComponentProps<typeof FormilyPassword>> =
  FormilyPassword

Password.Behavior = createBehavior({
  name: 'Password',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Password',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Password),
  },
  designerLocales: AllLocales.Password,
})

Password.Resource = createResource({
  icon: 'PasswordSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: 'Password',
        'x-decorator': 'FormItem',
        'x-component': 'Password',
      },
    },
  ],
})
