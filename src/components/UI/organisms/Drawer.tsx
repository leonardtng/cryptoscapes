import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Drawer as MuiDrawer, Toolbar } from '@material-ui/core';
import DrawerItems from '../molecules/DrawerItems';
import { NavItem } from '../atoms/NavListItem';
import { appBarHeight } from './AppBar';

export const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiToolbar-root': {
      minHeight: appBarHeight
    }
  },
  drawerPaper: {
    width: drawerWidth,
    border: 'none',
    background: 'transparent'
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

interface Props {
  navItems?: NavItem[];
  anchor?: "bottom" | "left" | "right" | "top";
}

const Drawer: React.FC<Props> = ({ navItems, anchor }) => {
  const classes = useStyles();

  return (
    <MuiDrawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor={anchor}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <DrawerItems navItems={navItems} />
      </div>
    </MuiDrawer>
  )
}

export default Drawer;
