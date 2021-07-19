import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import GaugeChart from 'react-gauge-chart';
import { useAppSelector } from '../../../../app/hooks';
import { selectFearGreedIndex } from '../../../../features/fearGreedIndexSlice';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& #fear-greed-index-gauge': {
      height: '100%',
      width: '200px !important',
      '& svg': {
        height: '100%',
        width: '100%'
      }
    }
  }
}));

const FearGreedIndexGaugeChart: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const fearGreedIndex = useAppSelector(selectFearGreedIndex);

  return (
    <Box className={classes.container}>
      <GaugeChart
        id="fear-greed-index-gauge"
        nrOfLevels={20}
        textColor={theme.palette.text.primary}
        needleColor={theme.palette.gauge.needle}
        needleBaseColor={theme.palette.gauge.needle}
        colors={[theme.palette.error.main, theme.palette.success.main]}
        percent={fearGreedIndex.today === null ?
          0 : Number(fearGreedIndex.today.value) / 100}
      />
    </Box>
  )
}

export default FearGreedIndexGaugeChart
