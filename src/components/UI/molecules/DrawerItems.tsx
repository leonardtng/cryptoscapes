import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import NavListItem, { NavItem } from '../atoms/NavListItem';
import { List, ListSubheader } from '@material-ui/core';

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
  navItems?: NavItem[];
}

const DrawerItems: React.FC<Props> = ({ navItems }) => {
  const classes = useStyles();

  return (
    <>
      {navItems ? (
        <div className={classes.navItemsWrapper}>
          <List
            subheader={
              <ListSubheader component="div">
                Analytics
                </ListSubheader>
            }
          >
            {navItems.map((item: NavItem) => {
              return <NavListItem navItem={item} key={item.path} />
            })}
          </List>
        </div>
      ) : (
        <div className={classes.filterItemsWrapper}>
          <List
            subheader={
              <ListSubheader component="div">
                Filters
              </ListSubheader>
            }
          >

          </List>
        </div>
      )}
    </>
  )
}

export default DrawerItems;
