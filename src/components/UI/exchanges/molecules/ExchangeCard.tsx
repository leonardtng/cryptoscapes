import React, { useState } from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Box, Card, CardActionArea, CardContent, CardHeader, Link, Typography } from '@material-ui/core';
import { Coin, Exchange } from '../../../../models';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoins } from '../../../../features/coinsSlice';
import { shortenNumber } from '../../../../common/helpers';
import ExchangeVolumeDialog from '../atoms/ExchangeVolumeDialog';
import TooltipBasicLayout from '../../../templates/TooltipBasicLayout';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.card.default,
    border: `1px solid ${theme.palette.background.default}`,
    borderRadius: 12,
    '& .MuiCardHeader-content': {
      overflow: 'hidden'
    }
  },
  titleWrapper: {
    '& a': {
      color: theme.palette.text.primary
    }
  },
  volumeWrapper: {
    width: 'fit-content',
    cursor: 'pointer'
  },
  customTooltipStyles: {
    margin: '4px 0 0'
  },
  trustScoreRank: {
    marginLeft: 10,
    padding: '0 6px',
    borderRadius: 6,
    backgroundColor: theme.palette.card.paper
  },
  avatarColor: {
    height: theme.spacing(4),
    width: theme.spacing(4),
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8,
    padding: 4,
    '& .MuiAvatar-img': {
      borderRadius: 8
    }
  }
}));

interface Props {
  exchange: Exchange;
}

const ExchangeCard: React.FC<Props> = ({ exchange }) => {
  const classes = useStyles();
  const theme = useTheme();

  const coins = useAppSelector(selectCoins);
  const [volumeOpen, setVolumeOpen] = useState<boolean>(false);

  const bitcoin: Coin | undefined = coins.value.find((coin: Coin) => {
    return coin.id === 'bitcoin'
  });

  const mapTrustColor = () => {
    if (exchange.trustScore > 7) return theme.palette.success.main
    if (exchange.trustScore > 4) return theme.palette.warning.main
    return theme.palette.error.main
  };

  return (
    <Card className={classes.card} elevation={0}>
      <CardActionArea onClick={() => setVolumeOpen(true)}>
        <CardHeader
          disableTypography
          title={
            <Box display="flex" alignItems="center">
              <TooltipBasicLayout title={exchange.name} placement="top" additionalStyles={classes.customTooltipStyles}>
                <Typography variant="h6" noWrap className={classes.titleWrapper}>
                  <Link
                    href={exchange.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {exchange.name}
                  </Link>
                </Typography>
              </TooltipBasicLayout>
              <Typography variant="body1" color="textSecondary" className={classes.trustScoreRank} >
                #{exchange.trustScoreRank}
              </Typography>
            </Box>
          }
          subheader={
            <TooltipBasicLayout title="Total Volume (24H)" additionalStyles={classes.customTooltipStyles}>
              <Typography variant="subtitle2" color="textSecondary" noWrap className={classes.volumeWrapper}>
                {bitcoin ?
                  `US$${shortenNumber(exchange.tradeVolume24HBtc * bitcoin.currentPrice)}` : '-'}
              </Typography>
            </TooltipBasicLayout>
          }
          avatar={<Avatar src={exchange.image} alt={exchange.name} className={classes.avatarColor} variant="rounded" />}
        />
        <CardContent>
          <Box textAlign="center" paddingBottom="16px">
            <Typography variant="h5" style={{ color: mapTrustColor() }}>{exchange.trustScore || 0}</Typography>
            <Typography variant="body2" color="textSecondary">Trust Score</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <ExchangeVolumeDialog open={volumeOpen} toggleClose={() => setVolumeOpen(false)} exchange={exchange} />
    </Card>
  )
}

export default ExchangeCard
