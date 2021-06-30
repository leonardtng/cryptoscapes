import React, { useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, CardContent, CardHeader, Typography } from '@material-ui/core';
import { FaceRounded } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import CardLayout from '../../../templates/CardLayout';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchFearGreedIndex, selectFearGreedIndex, setShowBitcoinCorrelation } from '../../../../features/fearGreedIndexSlice';
import HelpIconHeader from '../atoms/HelpIconHeader';
import FearGreedIndexGaugeChart from '../molecules/FearGreedIndexGaugeChart';
import HistoricFearGreedIndexChart from '../molecules/HistoricFearGreedIndexChart';
import ShowBitcoinCorrelationSwitch from '../atoms/ShowBitcoinCorrelationSwitch';
import MappedSemtimentIcon from '../atoms/MappedSentimentIcon';

const useStyles = makeStyles((theme: Theme) => ({
  avatarColor: {
    marginRight: 6,
    color: theme.palette.warning.main,
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8
  },
  contentWrapper: {
    height: 'calc(100% - 84px) !important'
  }
}));

const FearGreedIndexCard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const fearGreedIndex = useAppSelector(selectFearGreedIndex);

  useEffect(() => {
    if (fearGreedIndex.value.length === 0 && fearGreedIndex.status === 'IDLE') {
      dispatch(fetchFearGreedIndex());
    }
  }, [dispatch, fearGreedIndex.value, fearGreedIndex.status]);

  return (
    <CardLayout>
      <CardHeader
        title={
          <HelpIconHeader
            title="Fear & Greed Index"
            tooltipContent={
              <Box>
                <Typography variant="subtitle1" color="secondary">Data Sources Breakdown:</Typography>
                <Typography variant="body2" color="textSecondary">- Price Volatility (25%)</Typography>
                <Typography variant="body2" color="textSecondary">- Market Momentum / Volume (25%)</Typography>
                <Typography variant="body2" color="textSecondary">- Social Media (15%)</Typography>
                <Typography variant="body2" color="textSecondary">- Surveys (15%)</Typography>
                <Typography variant="body2" color="textSecondary">- Bitcoin Dominance (10%)</Typography>
                <Typography variant="body2" color="textSecondary">- Google Trends (10%)</Typography>
              </Box>
            }
          />
        }
        subheader={
          fearGreedIndex.today === null ?
            <Skeleton animation="wave" height={32} width={150} /> :
            `Now: ${fearGreedIndex.today.valueClassification}`
        }
        subheaderTypographyProps={{ variant: 'h6', color: 'textPrimary' }}
        avatar={
          <Avatar variant="rounded" className={classes.avatarColor}>
            {fearGreedIndex.value.length === 0 ?
              <FaceRounded /> : <MappedSemtimentIcon />}
          </Avatar>
        }
        action={
          <ShowBitcoinCorrelationSwitch
            currentState={fearGreedIndex.showBitcoinCorrelation}
            toggleFunction={setShowBitcoinCorrelation}
          />
        }
      />
      <CardContent className={classes.contentWrapper}>
        <FearGreedIndexGaugeChart />
        <Box height="calc(100% - 96px)" width="100%">
          <HistoricFearGreedIndexChart />
        </Box>
      </CardContent>
    </CardLayout>
  )
}

export default FearGreedIndexCard
