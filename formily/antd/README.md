# @kdesignable/formily-antd

### Install

```bash
npm install --save @kdesignable/formily-antd
```

### Peer dependencies

| Package                  | Range    |
| ------------------------ | -------- |
| `antd`                   | ^6.0.0   |
| `react` / `react-dom`    | >=18.0.0 |
| `@potop/formily-antd-v6` | ^2.0.1   |
| `@formily/react`         | ^2.3.7   |
| `@formily/reactive`      | ^2.3.7   |
| `@formily/shared`        | ^2.3.7   |

### Migration from v5

This package now targets **Ant Design v6** and **React 18+**.

Key changes:

- `@formily/antd-v5` has been replaced by `@potop/formily-antd-v6`.
- `@ant-design/v5-patch-for-react-19` is no longer required.
- All `antd/lib/*` deep imports have been removed.
- `Tabs.TabPane` and `Collapse.Panel` have been migrated to the `items` API.
- Deprecated schema props (`bordered`, `dropdownMatchSelectWidth`, `tooltipVisible`, `tooltipPlacement`) have been updated to their v6 equivalents in the built-in schema definitions.

#### Legacy schema support

Pass `migrateV5Schema: true` to `createDesigner()` to automatically normalize v5 prop keys when loading schemas created by the previous editor version. See the root README for the full normalization table.
