import React, { useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import CardLayout from '../../../templates/CardLayout';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchGlobalCoinData, selectGlobalCoinData } from '../../../../features/globalCoinDataSlice';
import { ArrowDownwardRounded, ArrowUpwardRounded } from '@material-ui/icons';
import { roundDecimals } from '../../../../common/helpers/roundDecimals';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  cardWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  skeletonWrapper: {
    padding: theme.spacing(2),
  },
  content: {
    marginLeft: 8,
    '& .MuiTypography-h6': {
      color: (styleProps: StyleProps) =>
        styleProps.change >= 0 ?
          theme.palette.success.main :
          theme.palette.error.main
    }
  },
  icon: {
    display: 'flex',
    marginRight: 8,
    color: theme.palette.primary.main,
    backgroundColor: (styleProps: StyleProps) =>
    styleProps.change >= 0 ?
      `${theme.palette.success.main}25` :
      `${theme.palette.error.main}25`,
    borderRadius: 8,
    '& .MuiSvgIcon-root': {
      height: theme.spacing(5),
      width: theme.spacing(5),
      color: (styleProps: StyleProps) =>
        styleProps.change >= 0 ?
          theme.palette.success.main :
          theme.palette.error.main
    }
  }
}));

interface StyleProps {
  change: number;
}

const BannerCardSmall: React.FC = () => {
  const dispatch = useAppDispatch();
  const globalCoinData = useAppSelector(selectGlobalCoinData);

  const change: number = globalCoinData.value?.marketCapChangePercentage24HUsd || 0
  const classes = useStyles({ change: change });

  useEffect(() => {
    if (globalCoinData.value === null && globalCoinData.status === 'IDLE') {
      dispatch(fetchGlobalCoinData());
    }
  }, [dispatch, globalCoinData.value, globalCoinData.status]);

  return (
    <CardLayout>
      {globalCoinData.value === null ? (
        <Box className={classes.skeletonWrapper}>
          <Skeleton animation="wave" height={32} width="60%" />
          <Skeleton animation="wave" height={21} width="80%" />
        </Box>
      ) : (
        <Box className={classes.cardWrapper}>
          <Box className={classes.content}>
            <Typography variant="h6">
              {roundDecimals(change, 3)}%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              24H Market Cap Change
            </Typography>
          </Box>
          <Box className={classes.icon}>
            {change >= 0 ? <ArrowUpwardRounded /> : <ArrowDownwardRounded />}
          </Box>
        </Box>
      )}

    </CardLayout>
  )
}

export default BannerCardSmall