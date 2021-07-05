import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router';
import CoinDetailsCard from '../../components/UI/explore/organisms/CoinDetailsCard';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    '& > .MuiGrid-item': {
      height: '100%',
    }
  }
}));


const CoinDetails: React.FC = () => {
  const classes = useStyles();
  const { coinId }: { coinId: string } = useParams();

  return (
    <Grid
      container
      className={classes.wrapper}
      spacing={3}
      direction="row"
      justify="center"
      alignItems="stretch"
    >
      <Grid item xs={12}>
        <CoinDetailsCard coinId={coinId} />
      </Grid>
    </Grid>
  )
}

export default CoinDetails
