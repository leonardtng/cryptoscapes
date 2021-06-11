import React, { useEffect, useState } from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar as MuiAppBar, Box, CircularProgress, IconButton, Toolbar, Typography } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import { drawerWidth } from './Drawer';
import Logo from '../../../assets/images/logo.svg';
import { useStore } from 'react-redux';

export const appBarHeight = 88;

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    '& .MuiToolbar-root': {
      minHeight: appBarHeight,
      justifyContent: 'space-between',
    }
  },
  logoWrapper: {
    width: `calc(${drawerWidth}px - 48px)`, // 240 - 24*2
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      marginRight: 8
    }
  },
  sideUtils: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiTypography-root': {
      marginRight: theme.spacing(2)
    }
  },
  githubButton: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.card.paper,
    borderRadius: 12
  }
}));

const AppBar: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const store = useStore();

  const [allStates, setAllStates] = useState<any>(store.getState());
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);

  store.subscribe(() => {
    setAllStates(store.getState());
  });

  useEffect(() => {
    setGlobalLoading(!!Object.values(allStates).find((item: any) => item.status === 'LOADING'));
  }, [allStates]);

  return (
    <MuiAppBar position="fixed" className={classes.appBar} color="transparent">
      <Toolbar>
        <Box className={classes.logoWrapper}>
          <img src={Logo} alt="Cryptoscapes" height={28} width={28} />
          <Typography variant="h5" noWrap>Cryptoscapes</Typography>
        </Box>
        <Box className={classes.sideUtils}>
          {globalLoading &&
            <>
              <Typography variant="caption" color="textSecondary">Fetching Data...</Typography>
              <CircularProgress size={theme.spacing(3)} />
            </>}
          <IconButton
            className={classes.githubButton}
            href='https://github.com/leonardtng/'
            target='_blank'
            rel='noopener'
            aria-label='GitHub'
          >
            <GitHub />
          </IconButton>
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar;
