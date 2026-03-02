import { PlusOutlined } from '@ant-design/icons'
import { createForm, Form as FormCore } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { observer } from '@formily/reactive-react'
import { TextWidget, usePrefix } from '@kdesignable/react'
import { ValueInput } from '@kdesignable/react-settings-form'
import { ArrayItems, Form, FormItem, Input } from '@potop/formily-antd-v6'
import { Button } from 'antd'
import React, { Fragment, useMemo } from 'react'
import { Header } from './Header'
import { traverseTree } from './shared'
import './styles.scss'
import { ITreeDataSource } from './types'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayItems,
    ValueInput,
  },
})

export interface IDataSettingPanelProps {
  treeDataSource: ITreeDataSource
  allowExtendOption?: boolean
  effects?: (form: FormCore<any>) => void
}

export const DataSettingPanel: React.FC<IDataSettingPanelProps> = observer(
  (props) => {
    const { allowExtendOption, effects } = props
    const prefix = usePrefix('data-source-setter')
    const form = useMemo(() => {
      let values: any
      traverseTree(props.treeDataSource.dataSource, (dataItem) => {
        if (dataItem.key === props.treeDataSource.selectedKey) {
          values = dataItem
        }
      })
      return createForm({
        values,
        effects: effects,
      })
    }, [
      props.treeDataSource.selectedKey,
      props.treeDataSource.dataSource.length,
    ])
    if (!props.treeDataSource.selectedKey)
      return (
        <Fragment>
          <Header
            title={
              <TextWidget token="SettingComponents.DataSourceSetter.nodeProperty" />
            }
            extra={null}
          />
          <div className={`${prefix + '-layout-item-content'}`}>
            <TextWidget token="SettingComponents.DataSourceSetter.pleaseSelectNode" />
          </div>
        </Fragment>
      )
    return (
      <Fragment>
        <Header
          title={
            <TextWidget token="SettingComponents.DataSourceSetter.nodeProperty" />
          }
          extra={
            allowExtendOption ? (
              <Button
                type="text"
                onClick={() => {
                  form.setFieldState('map', (state) => {
                    state.value.push({})
                  })
                }}
                icon={<PlusOutlined />}
              >
                <TextWidget token="SettingComponents.DataSourceSetter.addKeyValuePair" />
              </Button>
            ) : null
          }
        />
        <div className={`${prefix + '-layout-item-content'}`}>
          <Form form={form} labelWidth={60} wrapperWidth={160}>
            <SchemaField>
              <SchemaField.Array name="map" x-component="ArrayItems">
                <SchemaField.Object
                  x-decorator="ArrayItems.Item"
                  x-decorator-props={{ type: 'divide' }}
                >
                  <SchemaField.String
                    x-decorator-props={{
                      label: (
                        <TextWidget token="SettingComponents.DataSourceSetter.label" />
                      ),
                    }}
                    x-decorator="FormItem"
                    x-disabled={!allowExtendOption}
                    name="label"
                    x-component="Input"
                  />
                  <SchemaField.String
                    x-decorator-props={{
                      label: (
                        <TextWidget token="SettingComponents.DataSourceSetter.value" />
                      ),
                    }}
                    x-decorator="FormItem"
                    name="value"
                    x-component="ValueInput"
                  />
                  <SchemaField.Void
                    x-component="ArrayItems.Remove"
                    x-visible={allowExtendOption}
                    x-component-props={{
                      style: {
                        margin: 5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    }}
                  />
                </SchemaField.Object>
              </SchemaField.Array>
            </SchemaField>
          </Form>
        </div>
      </Fragment>
    )
  }
)
