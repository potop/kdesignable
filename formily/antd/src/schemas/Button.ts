import { ISchema } from '@formily/react'

export const Button: ISchema = {
  type: 'object',
  properties: {
    // Formily resolves `componentProps.children` into the React children argument, so this is
    // the label. Presented as "Content" in the locales.
    children: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    type: {
      type: 'string',
      enum: ['default', 'primary', 'dashed', 'link', 'text'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'primary',
      },
    },
    size: {
      type: 'string',
      enum: ['large', 'small', 'middle', ''],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'middle',
      },
    },
    shape: {
      type: 'string',
      enum: ['default', 'circle', 'round', 'square'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'default',
      },
    },
    block: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    danger: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    ghost: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    disabled: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    href: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    loading: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['BOOLEAN', 'EXPRESSION'],
      },
    },
    // Where a button's behaviour lives. EXPRESSION mode stores `{{…}}`, which Formily compiles
    // against the form scope and passes through as the prop.
    onClick: {
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION'],
      },
    },
  },
}
