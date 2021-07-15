import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ExchangeCardList from '../../components/UI/exchanges/organisms/ExchangeCardList';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    '& ::-webkit-scrollbar': {
      display: 'none'
    }
  },
  scrollContainer: {
    height: '100%',
    overflow: 'scroll',
    paddingBottom: theme.spacing(3)
  }
}));

const Exchanges: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.wrapper}
      spacing={0}
    >
      <Grid item xs={12} className={classes.scrollContainer}>
        <ExchangeCardList />
      </Grid>
    </Grid>
  )
}

export default Exchanges