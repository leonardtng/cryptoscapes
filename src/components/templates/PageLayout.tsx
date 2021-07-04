import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import AppBar from '../UI/baseline/organisms/AppBar';
import Drawer from '../UI/baseline/organisms/Drawer';
import { Page, RootModule } from '../../models';
import { appBarHeight, drawerWidth } from '../../common/shared/dimensions';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    height: `calc(100vh - ${appBarHeight}px)`,
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: theme.palette.background.paper,
    marginTop: appBarHeight,
    marginRight: 20,
    padding: '24px 24px 0 24px',
    borderRadius: 12
  },
}));

interface Props {
  rootModule: RootModule[];
}

const PageLayout: React.FC<Props> = ({ rootModule }) => {
  const classes = useStyles();

  const pages = rootModule.map(
    (moduleObject: RootModule) => moduleObject.pages
  ).reduce((acc, page: Page[]) => acc.concat(page), []);

  return (
    <div className={classes.root}>
      <AppBar />
      <Drawer rootModule={rootModule} />
      <main className={classes.content}>
        <Switch>
          {pages
            .filter((page: Page) => page.subpage)
            .map((page: Page) => {
              return <Route
                key={`${page.path}/:${page.subpage?.path}`}
                path={`${page.path}/:${page.subpage?.path}`}
                render={() => page.subpage?.page}
              />
            })}
          {pages
            .slice()
            .sort((a, b) => b.index - a.index)
            .map((page: Page) => {
              return <Route
                key={page.path}
                path={page.path}
                render={() => page.page}
              />
            })}
        </Switch>
      </main>
    </div>
  );
}

export default PageLayout
