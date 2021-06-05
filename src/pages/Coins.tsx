import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import TopCoinsCard from '../components/UI/organisms/TopCoinsCard';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 24,
    height: '100%',
  },
  wrapper: {
    height: '100%',
    '& > .MuiGrid-item': {
      height: '100%'
    }
  }
}));

const Coins: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.wrapper}>
        <Grid item xs={4} xl={3}>
          <TopCoinsCard />
        </Grid>
        <Grid item xs={4}>

        </Grid>
        <Grid item xs={4} xl={5}>

        </Grid>
      </Grid>
    </div>
  )
}

export default Coins
