import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core';
import { drawerWidth } from './Drawer';
import Logo from '../../../assets/images/logo.svg';

export const appBarHeight = 88;

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    '& .MuiToolbar-root': {
      minHeight: appBarHeight
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
  }
}));

const AppBar: React.FC = () => {
  const classes = useStyles();

  return (
    <MuiAppBar position="fixed" className={classes.appBar} color="transparent">
      <Toolbar>
        <div className={classes.logoWrapper}>
          <img src={Logo} alt="Cryptoscapes" height={28} width={28} />
          <Typography variant="h5" noWrap>Cryptoscapes</Typography>
        </div>
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar;
