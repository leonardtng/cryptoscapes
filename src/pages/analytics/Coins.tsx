import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import TopCoinsCard from '../../components/UI/organisms/TopCoinsCard';
import DominanceCard from '../../components/UI/organisms/DominanceCard';
import GasOracleCard from '../../components/UI/organisms/GasOracleCard';
import TrendingCoinsCard from '../../components/UI/organisms/TrendingCoinsCard';
import InstitutionHoldersCard from '../../components/UI/organisms/InstitutionHoldersCard';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    '& > .MuiGrid-item': {
      height: '100%',
    }
  },
  innerWrapper: {
    height: '100%',
  }
}));

const Coins: React.FC = () => {
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
      <Grid item xs={6} md={6} lg={4} xl={3}>
        <TopCoinsCard />
      </Grid>
      <Grid item xs={6} md={6} lg={4}>
        <Grid container className={classes.innerWrapper} spacing={0}>
          <Grid item xs={12} style={{ height: 275, marginBottom: theme.spacing(3) }}>
            <DominanceCard />
          </Grid>
          <Grid item xs={12} style={{ height: 205, marginBottom: theme.spacing(3) }}>
            <GasOracleCard />
          </Grid>
          <Grid item xs={12} style={{ height: `calc(100% - ${275 + 205 + theme.spacing(3) * 2}px)` }}>
            <TrendingCoinsCard />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} xl={5}>
        <InstitutionHoldersCard />
      </Grid>
    </Grid>
  )
}

export default Coins
