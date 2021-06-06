import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import AppBar, { appBarHeight } from '../UI/organisms/AppBar';
import Drawer, { drawerWidth } from '../UI/organisms/Drawer';
import { NavItem } from '../UI/atoms/NavListItem';

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
  navItems: NavItem[];
}

const PageLayout: React.FC<Props> = ({ navItems }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar />
      <Drawer navItems={navItems} />
      <main className={classes.content}>
        <Switch>
          {navItems
            .slice()
            .sort((a, b) => b.index - a.index)
            .map((item: NavItem) => {
              return <Route key={item.path} path={item.path} render={() => item.page} />
            })}
        </Switch>
      </main>
    </div>
  );
}

export default PageLayout
