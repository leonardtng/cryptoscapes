import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import CardLayout from '../molecules/CardLayout';
import { useAppSelector } from '../../../app/hooks';
import { selectGlobalCoinData } from '../../../features/globalCoinDataSlice';
import { ArrowDownwardRounded, ArrowUpwardRounded } from '@material-ui/icons';
import { roundDecimals } from '../../../common/helpers/roundDecimals';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  cardWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2)
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
    backgroundColor: '#111936',
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
  const globalCoinData = useAppSelector(selectGlobalCoinData);

  const change: number = globalCoinData.value?.marketCapChangePercentage24HUsd || 0
  const classes = useStyles({ change: change });

  return (
    <CardLayout>
      {globalCoinData.value === null ? (
        <>
          <Skeleton animation="wave" height={12} width="80%" />
          <Skeleton animation="wave" height={12} width="40%" />
        </>
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
            {change > 0 ? <ArrowUpwardRounded /> : <ArrowDownwardRounded />}
          </Box>
        </Box>
      )}

    </CardLayout>
  )
}

export default BannerCardSmall