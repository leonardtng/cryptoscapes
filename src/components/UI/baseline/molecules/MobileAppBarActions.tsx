import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, IconButton } from '@material-ui/core';
import { MenuRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.card.paper,
    borderRadius: 12,
    '&:hover': {
      backgroundColor: `${theme.palette.text.secondary}80`
    }
  }
}));

interface Props {
  handleDrawerToggle: () => void;
}

const AppBarActions: React.FC<Props> = ({ handleDrawerToggle }) => {
  const classes = useStyles();

  return (
    <Box display="flex">
      <IconButton className={classes.menuButton} onClick={handleDrawerToggle} color="primary">
        <MenuRounded />
      </IconButton>
    </Box>
  )
}

export default AppBarActions;
