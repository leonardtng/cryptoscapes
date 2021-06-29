import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Drawer as MuiDrawer, Toolbar } from '@material-ui/core';
import DrawerItems from '../molecules/DrawerItems';
import { RootModule } from '../../../../models/common/RootModule';
import { appBarHeight, drawerWidth } from '../../../../common/shared/dimensions';

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
  rootModule: RootModule[];
  anchor?: "bottom" | "left" | "right" | "top";
}

const Drawer: React.FC<Props> = ({ rootModule, anchor }) => {
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
        <DrawerItems rootModule={rootModule} />
      </div>
    </MuiDrawer>
  )
}

export default Drawer;
