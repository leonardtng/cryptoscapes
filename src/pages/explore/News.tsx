import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Hidden } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    '& > .MuiGrid-item': {
      height: '100%',
    }
  },
  innerWrapper: {
    height: '100%',
    '& > .MuiGrid-item:not(:last-child)': {
      marginBottom: theme.spacing(3)
    }
  }
}));

const News: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid
      container
      className={classes.wrapper}
      spacing={3}
      direction="row"
      justify="center"
      alignItems="stretch"
    >
      <Grid item xs={12} lg={8} xl={9}>
        
      </Grid>
      <Hidden mdDown>
        <Grid item lg={4} xl={3}>
          <Grid container className={classes.innerWrapper} spacing={0}>
            <Grid item xs={12} style={{ height: `calc(50% - ${theme.spacing(3) / 2}px)` }}>
              
            </Grid>
            <Grid item xs={12} style={{ height: `calc(50% - ${theme.spacing(3) / 2}px)` }}>

            </Grid>
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  )
}

export default News