//  菜单项
export interface MenuItem {
  id?: string;
  code?: string; // 菜单路径
  path: string; //菜単路径
  name: string; // 菜单名称
  target?: string; // 菜单跳转路径
  icon?: string | null; // 菜单图标
  component?: string | null; // 菜单组件
  authority?: string[]; // 权限配置
  routes?: MenuItem[]; // 子菜单列表(配置)
  children?: MenuItem[] | null; // 子菜单列表
  hideInMenu?: boolean; // 是否在菜单中隐藏
  hideInTab?: boolean; // 是否在tab中隐藏
  multiple?: boolean; // 是否多开标签页
  keepAlive?: boolean; // 是否缓存标签页
}

// 用户信息
export interface UserInfo<T> {
  userId?: T;
  groupId?: T;
  username?: string;
  nickname?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  authority?: string[];
  [otherField: string]: any;
}
