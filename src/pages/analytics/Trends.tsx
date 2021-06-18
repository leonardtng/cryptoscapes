import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Grid, Hidden } from '@material-ui/core';
import CoinCorrelationCard from '../../components/UI/organisms/CoinCorrelationCard';
import InstitutionHoldersCard from '../../components/UI/organisms/InstitutionHoldersCard';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    '& > .MuiGrid-item': {
      height: '100%',
    }
  }
}));

const Trends: React.FC = () => {
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
      <Grid item xs={12} xl={9}>
        <CoinCorrelationCard />
      </Grid>
      <Hidden lgDown>
        <Grid item xl={3}>
          <InstitutionHoldersCard />
        </Grid>
      </Hidden>
    </Grid>
  )
}

export default Trends
