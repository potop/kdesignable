import { ISchema } from '@formily/react'

export const FormCollapse: ISchema & { CollapsePanel?: ISchema } = {
  type: 'object',
  properties: {
    accordion: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    collapsible: {
      type: 'string',
      enum: ['header', 'disabled'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'header',
        optionType: 'button',
      },
    },
    ghost: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    variant: {
      type: 'string',
      enum: ['outlined', 'borderless', 'filled', ''],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'outlined',
      },
    },
  },
}

FormCollapse.CollapsePanel = {
  type: 'object',
  properties: {
    collapsible: {
      type: 'string',
      enum: ['header', 'disabled'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'header',
        optionType: 'button',
      },
    },
    header: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    extra: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}
