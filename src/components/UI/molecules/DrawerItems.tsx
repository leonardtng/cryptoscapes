import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import NavListItem from '../atoms/NavListItem';
import { List, ListSubheader } from '@material-ui/core';
import { RootModule } from '../../../models/common/RootModule';
import { Page } from '../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  navItemsWrapper: {
    padding: '0 22px',
    '& .MuiListItem-root.Mui-selected': {
      color: theme.palette.secondary.main,
      backgroundColor: 'rgba(33, 150, 243, 0.082)',
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
}

const DrawerItems: React.FC<Props> = ({ rootModule }) => {
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
            return <NavListItem page={page} key={page.path} />
          })}
        </List>
      })}
    </div>

  )
}

export default DrawerItems;
