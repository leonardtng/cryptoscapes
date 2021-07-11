import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';
import LargeProgressCard from '../atoms/LargeProgressCard';
import RepositoryCard from '../atoms/RepositoryCard';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%'
  },
  innerWrapper: {
    height: '100%',
    '& > .MuiGrid-item:not(:last-child)': {
      marginBottom: theme.spacing(3)
    }
  }
}));

const DeveloperStats: React.FC = () => {
  const classes = useStyles();

  const coinDetails = useAppSelector(selectCoinDetails);

  return (
    <Grid container spacing={3} className={classes.container}>
      <Grid item xs={4}>
        <LargeProgressCard title="Developer Score" value={coinDetails.value?.developerScore || 0} />
      </Grid>
      <Grid item xs={8}>
        <RepositoryCard />
      </Grid>
    </Grid>
  )
}

export default DeveloperStats
