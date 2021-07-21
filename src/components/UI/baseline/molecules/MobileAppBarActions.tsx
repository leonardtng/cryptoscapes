import React, { useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Slide } from '@material-ui/core';
import { MenuRounded, SearchRounded } from '@material-ui/icons';
import SearchField from './SearchField';

const useStyles = makeStyles((theme: Theme) => ({
  actionButton: {
    marginRight: 16,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.card.paper,
    borderRadius: 12,
    '&:hover': {
      backgroundColor: `${theme.palette.text.secondary}80`
    }
  },
  searchContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    zIndex: 100,
    padding: '4px 24px',
    backgroundColor: theme.palette.background.default
  }
}));

interface Props {
  handleDrawerToggle: () => void;
}

const AppBarActions: React.FC<Props> = ({ handleDrawerToggle }) => {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box display="flex">
      <IconButton className={classes.actionButton} onClick={handleDrawerToggle} color="primary">
        <MenuRounded />
      </IconButton>
      <IconButton className={classes.actionButton} onClick={() => setOpen(true)} color="primary">
        <SearchRounded />
      </IconButton>
      <Slide appear={false} direction="down" in={open}>
        <Box className={classes.searchContainer}>
          <SearchField mobile toggleMobileFunction={() => setOpen(false)} />
        </Box>
      </Slide>
    </Box>
  )
}

export default AppBarActions;
