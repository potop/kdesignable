import { createBehavior, createResource } from '@kdesignable/core'
import { DnFC } from '@kdesignable/react'
import { DatePicker as FormilyDatePicker } from '@potop/formily-antd-v6'
import React from 'react'
import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const DatePicker: DnFC<React.ComponentProps<typeof FormilyDatePicker>> =
  FormilyDatePicker

DatePicker.Behavior = createBehavior(
  {
    name: 'DatePicker',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'DatePicker',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.DatePicker),
    },
    designerLocales: AllLocales.DatePicker,
  },
  {
    name: 'DatePicker.RangePicker',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'DatePicker.RangePicker',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.DatePicker.RangePicker),
    },
    designerLocales: AllLocales.DateRangePicker,
  }
)

DatePicker.Resource = createResource(
  {
    icon: 'DatePickerSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'DatePicker',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
        },
      },
    ],
  },
  {
    icon: 'DateRangePickerSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string[]',
          title: 'DateRangePicker',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker.RangePicker',
        },
      },
    ],
  }
)
