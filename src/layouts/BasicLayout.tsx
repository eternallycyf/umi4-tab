import TagsNav from '@/components/TagsNav';
import { ConnectState } from '@/typings/connect';
import { connect, getDvaApp, withRouter } from '@umijs/max';

const BasicLayout = (props: any) => {
  const { location, children } = props;

  const { breadcrumbNameMap = {}, menuList = [] } =
    getDvaApp()._store.getState().global;

  let TagsNavProps = {
    breadcrumbNameMap,
    menuList,
    location,
  };

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
