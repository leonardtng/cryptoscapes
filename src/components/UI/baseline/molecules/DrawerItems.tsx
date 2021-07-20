import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import NavListItem from '../atoms/NavListItem';
import { List, ListSubheader } from '@material-ui/core';
import { RootModule } from '../../../../models/common/RootModule';
import { Page } from '../../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  navItemsWrapper: {
    padding: '0 22px',
    '& .MuiListItem-root.Mui-selected': {
      color: theme.palette.secondary.main,
      backgroundColor: `${theme.palette.secondary.main}15`,
      '& .MuiListItemIcon-root': {
        color: theme.palette.secondary.main,
      }
    }
  },
  filterItemsWrapper: {
    padding: '0 22px',
  }
}));

interface Props {
  rootModule: RootModule[];
  handleDrawerToggle?: () => void;
}

const DrawerItems: React.FC<Props> = ({ rootModule, handleDrawerToggle }) => {
  const classes = useStyles();

  return (
    <div className={classes.navItemsWrapper}>
      {rootModule.map((moduleObject: RootModule) => {
        return <List
          key={moduleObject.moduleName}
          subheader={
            <ListSubheader component="div">
              {moduleObject.moduleName}
            </ListSubheader>
          }
        >
          {moduleObject.pages.map((page: Page) => {
            return <NavListItem key={page.path} page={page} handleDrawerToggle={handleDrawerToggle} />
          })}
        </List>
      })}
    </div>

  )
}

export default DrawerItems;
