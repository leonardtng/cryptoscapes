import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, IconButton } from '@material-ui/core';
import { MenuRounded } from '@material-ui/icons';
import { useAppDispatch } from '../../../../app/hooks';
import { toggleMobileDrawerOpen } from '../../../../features/appStateSlice';

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

const AppBarActions: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  return (
    <Box display="flex">
      <IconButton
        className={classes.menuButton}
        onClick={() => dispatch(toggleMobileDrawerOpen(true))}
        color="primary"
      >
        <MenuRounded />
      </IconButton>
    </Box>
  )
}

export default AppBarActions;
