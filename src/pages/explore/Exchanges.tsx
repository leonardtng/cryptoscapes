import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ExchangeListCard from '../../components/UI/exchanges/organisms/ExchangeListCard';
import { useScrollToTop } from '../../common/hooks/useScrollToTop';
import { useWindowSize } from '../../common/hooks/useWindowSize';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%'
  },
  scrollContainer: {
    height: '100%',
    overflow: 'scroll',
    paddingBottom: theme.spacing(3)
  }
}));


const Exchanges: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const windowSize = useWindowSize();
  const { FloatingButton, target, top } = useScrollToTop();

  return (
    <Grid
      container
      className={classes.wrapper}
      spacing={0}
    >
      <Grid item xs={12} className={classes.scrollContainer} ref={target}>
        <ExchangeListCard top={top} />
      </Grid>
      <FloatingButton
        size="medium"
        color="secondary"
        buttonOffset={windowSize.width > theme.breakpoints.values.lg ? 4 : 3}
      />
    </Grid>
  )
}

export default Exchanges