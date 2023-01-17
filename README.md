## umi4-antd5-多 tabs 页签

- 最小复现
- 无其他不相关内容

```js
"dependencies":{
    "classnames": "^2.2.6",
    "js-cookie": "^3.0.1",
    "lodash": "^4.17.19",
    "redux-persist": "^6.0.0",
}
  "devDependencies": {
    "@types/js-cookie": "^3.0.2",
    "cross-env": "^7.0.3",
    "mockjs": "^1.1.0",
    "@types/lodash": "^4.14.191",
  }
```

- <img src="https://raw.githubusercontent.com/eternallycyf/umi4-tab/main/public/tag.png" alt="stars">

## 如果部署在其他路径下

- 例如 xxx.com/aaa/

```js
# .umirc.ts
  base: '/umi4-tab/',
```

## 页签切换后不触发生命周期

```js
// hooks
useEffect(() => {

}, [window.location.pathname])

// class
// 1.通过 componentDidUpdate 对比
// 2. 动态设置 key
<Route path="/page/:pageid" render={(props) => (
  <Page key={props.match.params.pageid} {...props} />)
} />
// 3.动态路由参数
// https://umijs.org/docs/guides/routes#%E8%B7%AF%E7%94%B1%E5%8A%A8%E6%80%81%E5%8F%82%E6%95%B0
// 4.通过 history 监听
  componentDidMount() {
    history.listen(({ location }) => {
      console.log(location);
    })
  }
// 5.写一个子hoooks组件 专门监听
```
