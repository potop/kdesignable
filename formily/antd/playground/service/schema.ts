import { Engine } from '@kdesignable/core'
import {
  transformToSchema,
  transformToTreeNode,
} from '@kdesignable/formily-transformer'
import { message } from 'antd'

export const saveSchema = (designer: Engine) => {
  localStorage.setItem(
    'formily-schema',
    JSON.stringify(transformToSchema(designer.getCurrentTree()))
  )
  message.success('Save Success')
}

export const loadInitialSchema = (designer: Engine) => {
  try {
    designer.setCurrentTree(
      transformToTreeNode(JSON.parse(localStorage.getItem('formily-schema')), {
        migrateV5Schema: designer.props.migrateV5Schema,
      })
    )
  } catch {}
}
