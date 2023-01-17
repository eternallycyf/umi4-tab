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

# config/config.ts
export const homePagePath = '/umi4-tab';
export const mockBaseUrl = '/umi4-tab';

# 初始化获取的路由需要加上前缀 例如
 {
    children: null,
    code: 'react_index_page',
    component: null,
    icon: null,
    id: 'index',
    name: '首页',
    path: mockBaseUrl,
    upperId: '0',
    url: null,
  },
```

## 如果部署在根目录

```js
# .umirc.ts
  base: '/',
# config/config.ts
export const homePagePath = '/';
export const mockBaseUrl = '';
# 初始化获取的路由需要加上前缀 例如
 {
    children: null,
    code: 'react_index_page',
    component: null,
    icon: null,
    id: 'index',
    name: '首页',
    path: mockBaseUrl,
    upperId: '0',
    url: null,
  },
```
