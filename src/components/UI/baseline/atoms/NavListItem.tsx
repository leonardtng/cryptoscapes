import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { Page } from '../../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  navListItem: {
    borderRadius: 12,
    marginBottom: 5,
  }
}));

interface Props {
  page: Page
}

const NavListItem: React.FC<Props> = ({ page }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const handleClick = () => {
    history.push(page.path);
  };

  const pathGroup =
    /(.+)\//.exec(location.pathname) === null ? location.pathname : /(.+)\//.exec(location.pathname)![1];

  return (
    <ListItem
      button
      className={classes.navListItem}
      onClick={handleClick}
      selected={pathGroup === page.path}
    >
      <ListItemIcon>{page.icon}</ListItemIcon>
      <ListItemText primary={page.label} />
    </ListItem>
  )
}

export default NavListItem;
