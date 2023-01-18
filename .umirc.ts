import { defineConfig } from '@umijs/max';
import routerConfig from './src/routes';
import zhCN from 'antd/locale/zh_CN';
const proxyConfig = require('./src/config/proxyConfig');
const path = require('path');

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  base: process.env.NODE_ENV === 'production' ? '/umi4-tab/' : '/',
  publicPath:
    process.env.NODE_ENV === 'production'
      ? 'http://wangxince.site/umi4-tab/'
      : '/',
  routes: routerConfig,
  layout: {
    title: 'tabs切换',
    contentWidth: 'Fluid',
    locale: false,
  },
  locale: {
    antd: true,
    default: 'zh-CN',
    baseSeparator: '-',
  },
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
  devtool: process.env.NODE_ENV === 'production' ? 'eval' : 'source-map',
  antd: {
    configProvider: {
      locale: zhCN,
    },
    theme: { '@primary-color': '#00CA88' },
  },
  metas: [
    {
      'http-equiv': 'Content-Security-Policy',
      content: 'upgrade-insecure-requests',
    },
    { 'http-equiv': 'Cache-control', content: 'no-cache' },
    { 'http-equiv': 'Cache', content: 'no-cache' },
  ],
  fastRefresh: true,
  proxy: proxyConfig,
  clickToComponent: {},
  dva: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  hash: true,
  mfsu: true,
  npmClient: 'yarn',
});
