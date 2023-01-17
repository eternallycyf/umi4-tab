export const apiPrefixMock: string =
  process.env.NODE_ENV === 'development' ? '/api' : '/api';
export const tokenKey: string = 'acpauth';
export const agentId: string =
  process.env.NODE_ENV === 'development' ? '1480492321' : '1583908988';

// 部署在根路径下 请设置为 '/' 其他路径下为 '/xxx'
export const homePagePath =
  process.env.NODE_ENV === 'production' ? '/umi4-tab' : '/';
// 部署在根路径下 数据返回 设置为 '' 其他路径下为 '/xxx'
export const mockBaseUrl =
  process.env.NODE_ENV === 'production' ? '/umi4-tab' : '';
