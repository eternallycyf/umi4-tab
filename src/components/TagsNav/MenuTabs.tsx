import { ConnectState } from '@/typings/connect';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Dropdown, Tabs, TabsProps } from 'antd';
import cx from 'classnames';
import { connect } from 'dva';
import React from 'react';
import { RouterProps } from 'react-router';
import styles from './index.less';
import { homePagePath } from '@/config';

export enum closeType {
  refresh = 'refresh',
  closeOne = 'closeOne',
  closeALl = 'closeALl',
  closeOthers = 'closeOthers',
}

export interface MenuTab {
  tab: string;
  key: string;
  refresh?: boolean;
  closeable?: boolean;
  location?: RouterProps['location'];
  extraProperties?: any;
}

export interface MenuTabsProps {
  tabs: MenuTab[];
  activeKey: string;
  tabChildren?: any;
  tabsProps?: TabsProps;
  onRefresh: (key: string) => void;
  onSwitch: (key: string) => void;
  onRemove: (key: string) => void;
  onRemoveAll: (key: string) => void;
  onRemoveOthers: (key: string) => void;
  dispatch?: any;
  collapsed?: boolean;
}

const MenuTabs: React.FC<MenuTabsProps> = (props) => {
  const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');
  const {
    tabs,
    activeKey,
    tabChildren,
    tabsProps,
    onRefresh,
    onSwitch,
    onRemove,
    onRemoveAll,
    onRemoveOthers,
    dispatch,
    collapsed,
  } = props;

  const handleTabEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'remove' && typeof targetKey === 'string') {
      onRemove(targetKey);
    }
  };

  const handleTabsMenuClick = (tabKey: string, event: any): void => {
    const { key } = event;
    if (key === closeType.refresh) {
      onRefresh(tabKey);
    } else if (key === closeType.closeOne) {
      onRemove(tabKey);
    } else if (key === closeType.closeALl) {
      onRemoveAll(tabKey);
    } else if (key === closeType.closeOthers) {
      onRemoveOthers(tabKey);
    }
  };

  const getMenu = (key: string, index: number) => {
    return [
      {
        label: '??????',
        disabled: key !== activeKey,
        key: closeType.refresh,
      },
      {
        label: '????????????',
        disabled: index === 0,
        key: closeType.closeOne,
      },
      {
        label: '????????????',
        key: closeType.closeALl,
      },
      {
        label: '????????????',
        disabled: tabs.length === 1,
        key: closeType.closeOthers,
      },
    ];
  };

  const setTab = (tab: string, key: string, index: number) => {
    return (
      <div onContextMenu={(event) => event.preventDefault()}>
        <Dropdown
          menu={{
            items: getMenu(key, index),
            onClick: (e) => handleTabsMenuClick(key, e),
          }}
          trigger={['contextMenu']}
        >
          <div className={cx(styles.tabTitle)}>
            {key === homePagePath ? (
              <HomeOutlined className={styles['icon-home']} />
            ) : (
              tab
            )}
          </div>
        </Dropdown>
      </div>
    );
  };

  const handleMenuCollapse = () => {
    setInitialState({
      ...initialState,
      layout: {
        ...initialState.layout,
        collapsed: !initialState.layout.collapsed,
      },
    });
  };

  return (
    <Tabs
      hideAdd
      animated={false}
      type="editable-card"
      className={styles.tabs}
      tabBarStyle={{ margin: 0, height: 30, display: 'flex' }}
      tabBarGutter={0}
      activeKey={activeKey}
      onChange={onSwitch}
      onEdit={handleTabEdit}
      tabBarExtraContent={{
        left: collapsed ? (
          <MenuUnfoldOutlined
            onClick={handleMenuCollapse}
            style={{ padding: '0 10px' }}
          />
        ) : (
          <MenuFoldOutlined
            onClick={handleMenuCollapse}
            style={{ padding: '0 10px' }}
          />
        ),
      }}
      items={tabs.map((item, index) => ({
        ...item,
        tab: setTab(item.tab, item.key, index),
        label: setTab(item.tab, item.key, index),
        closable: index !== 0,
        className: (item.key === activeKey && 'tab-tabpane-active') || '',
        children: tabChildren[item.key],
      }))}
      {...tabsProps}
    ></Tabs>
  );
};

export default connect(({ global }: ConnectState) => ({
  ...global,
}))(MenuTabs);
