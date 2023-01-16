import TagsNav from '@/components/TagsNav';
import { ConnectState } from '@/typings/connect';
import { connect, getDvaApp, withRouter } from '@umijs/max';
import { menuList, breadcrumbNameMap } from '../../mock/user';

const BasicLayout = (props: any) => {
  const { location, children } = props;

  const { breadcrumbNameMap = {}, menuList = [] } =
    getDvaApp()._store.getState().global;

  let TagsNavProps = {
    breadcrumbNameMap,
    menuList,
    location,
  };

  if (!breadcrumbNameMap || !menuList) {
    TagsNavProps.breadcrumbNameMap = breadcrumbNameMap;
    TagsNavProps.menuList = menuList;
  }

  return (
    <>
      <TagsNav {...TagsNavProps} />
      {children}
    </>
  );
};

export default connect(({ global }: ConnectState) => ({
  ...global,
}))(withRouter(BasicLayout));
