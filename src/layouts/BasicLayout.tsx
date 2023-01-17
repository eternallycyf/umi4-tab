import TagsNav from '@/components/TagsNav';
import Router from '@/routes';
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

  console.log(TagsNavProps);

  return (
    <>
      <TagsNav {...TagsNavProps}>{children}</TagsNav>
    </>
  );
};

export default connect(({ global }: ConnectState) => ({
  ...global,
}))(withRouter(BasicLayout));
