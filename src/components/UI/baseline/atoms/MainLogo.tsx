import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { LandscapeRounded } from '@material-ui/icons';
import { drawerWidth } from '../../../../common/shared/dimensions';

const useStyles = makeStyles((theme: Theme) => ({
  logoWrapper: {
    width: `calc(${drawerWidth}px - 48px)`, // 240 - 24*2
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: 8
    }
  },
  landscapeIcon: {
    fill: "url(#landscapeGradient)",
    height: theme.spacing(4),
    width: theme.spacing(4)
  }
}));

const MainLogo: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box className={classes.logoWrapper}>
      <svg width="0" height="0">
        <linearGradient id="landscapeGradient">
          <stop offset="20%" stopColor={theme.palette.primary.main} />
          <stop offset="80%" stopColor={theme.palette.secondary.main} />
        </linearGradient>
      </svg>
      <LandscapeRounded classes={{ root: classes.landscapeIcon }} />
      <Typography variant="h5" noWrap>Cryptoscapes</Typography>
    </Box>
  )
}

export default MainLogo;
