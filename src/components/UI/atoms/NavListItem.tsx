import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  navListItem: {
    borderRadius: 12,
    marginBottom: 5,
  }
}));

export interface NavItem {
  label: string;
  path: string;
  icon: JSX.Element;
  page: JSX.Element;
  index: number;
}

interface Props {
  navItem: NavItem
}

const NavListItem: React.FC<Props> = ({ navItem }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const handleClick = () => {
    history.push(navItem.path)
  }

  return (
    <ListItem
      button
      className={classes.navListItem}
      key={navItem.index}
      onClick={handleClick}
      selected={navItem.path === location.pathname}
    >
      <ListItemIcon>{navItem.icon}</ListItemIcon>
      <ListItemText primary={navItem.label} />
    </ListItem>
  )
}

export default NavListItem;
