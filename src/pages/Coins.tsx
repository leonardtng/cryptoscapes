import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import TopCoinsCard from '../components/UI/organisms/TopCoinsCard';
import DominanceCard from '../components/UI/organisms/DominanceCard';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    '& > .MuiGrid-item': {
      maxHeight: '100%',
    }
  }
}));

const Coins: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.wrapper}
      spacing={3}
      direction="row"
      justify="center"
      alignItems="stretch"
    >
      <Grid item xs={6} md={5} lg={4} xl={3}>
        <TopCoinsCard />
      </Grid>
      <Grid item xs={6} md={3} lg={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DominanceCard />
          </Grid>
          <Grid item xs={12}>

          </Grid>
          <Grid item xs={12}>

          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4} lg={4} xl={5}>

      </Grid>
    </Grid>
  )
}

export default Coins
