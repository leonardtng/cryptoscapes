import React, { useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, CardContent, CardHeader, Tooltip, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import CardLayout from '../molecules/CardLayout';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchFearGreedIndex, selectFearGreedIndex } from '../../../features/fearGreedIndexSlice';
import FearGreedIndexGaugeChart from '../molecules/FearGreedIndexGaugeChart';
import { FaceRounded, HelpOutlineRounded } from '@material-ui/icons';
import MappedSemtimentIcon from '../atoms/MappedSentimentIcon';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      cursor: 'pointer',
      marginLeft: 6,
      height: 16,
      width: 16
    },
  },
  customTooltip: {
    backgroundColor: theme.palette.background.default
  },
  avatarColor: {
    marginRight: 6,
    color: theme.palette.warning.main,
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8
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
          <Typography className={classes.header} variant="body2" color="textSecondary">
            Fear & Greed Index <Tooltip
              title={
                <div>
                  <Typography variant="subtitle1" color="primary">Data Sources Breakdown:</Typography>
                  <Typography variant="body2">- Price Volatility (25%)</Typography>
                  <Typography variant="body2">- Market Momentum / Volume (25%)</Typography>
                  <Typography variant="body2">- Social Media (15%)</Typography>
                  <Typography variant="body2">- Surveys (15%)</Typography>
                  <Typography variant="body2">- Bitcoin Dominance (10%)</Typography>
                  <Typography variant="body2">- Google Trends (10%)</Typography>
                </div>
              }
              classes={{
                tooltip: classes.customTooltip,
              }}
            >
              <HelpOutlineRounded />
            </Tooltip>
          </Typography>
        }
        subheader={
          fearGreedIndex.value.length === 0 ?
            <Skeleton animation="wave" height={32} width={150} /> :
            `Now: ${fearGreedIndex.value[0].valueClassification}`
        }
        subheaderTypographyProps={{ variant: 'h6', color: 'textPrimary' }}
        avatar={
          <Avatar variant="rounded" className={classes.avatarColor}>
            {fearGreedIndex.value.length === 0 ?
              <FaceRounded /> : <MappedSemtimentIcon />}
          </Avatar>
        }
      />
      <CardContent>
        <FearGreedIndexGaugeChart />
      </CardContent>
    </CardLayout>
  )
}

export default FearGreedIndexCard
