<p align="center">
<img width="600" src="https://img.alicdn.com/imgextra/i1/O1CN01bg1tTN1p5ZOPmhKV0_!!6000000005309-55-tps-2200-981.svg">
</p>

---

## Introduction

A fork of the original Designable repository focused on React 19 and Ant Design v6 support.

### Dependency Baseline

| Package               | Version |
| --------------------- | ------- |
| `react` / `react-dom` | 19.2.4  |
| `antd`                | 6.3.1   |

### Legacy schema compatibility (`migrateV5Schema`)

Schemas produced by the previous (v5-based) editor are still loadable. Deprecated antd props (`bordered`, `dropdownMatchSelectWidth`, `tooltipVisible`, `tooltipPlacement`) produce console warnings in v6 but still render correctly.

To automatically rewrite legacy keys to their v6 equivalents on load, enable the `migrateV5Schema` flag:

```ts
const engine = createDesigner({
  // ...
  migrateV5Schema: true,
})
```

When `true`, `transformToTreeNode` applies the following normalizations to `x-component-props`:

| Legacy key                 | v6 key                  |
| -------------------------- | ----------------------- |
| `bordered: false`          | `variant: 'borderless'` |
| `bordered: true`           | `variant: 'outlined'`   |
| `dropdownMatchSelectWidth` | `popupMatchSelectWidth` |
| `tooltipVisible`           | `tooltip.open`          |
| `tooltipPlacement`         | `tooltip.placement`     |

When `false` (the default), schemas are loaded and saved with their original keys unchanged.

## Screenshot

<img src="https://img.alicdn.com/imgextra/i1/O1CN01UYmA8f1apczHZRygt_!!6000000003379-2-tps-3040-1802.png" style="box-shadow:0px 0px 20px #aaa;border:1px solid #ddd"/>

## Features

- 🚀 High performance, Smooth and beautiful drag and drop experience
- 💡 Full scene coverage
- 🎨 Support Low Code and No Code
- 🏅 Strong scalability

## Website

[playground](https://designable.netlify.app)

## Contributors

This project exists thanks to all the people who contribute.

<p>
<a href="https://github.com/alibaba/designable/graphs/contributors"><img src="https://contrib.rocks/image?repo=alibaba/designable" /></a>
</p>
