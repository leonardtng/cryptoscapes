import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Box, Card, CardContent, CardHeader, Link, Tooltip, Typography } from '@material-ui/core';
import { Coin, Exchange } from '../../../../models';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoins } from '../../../../features/coinsSlice';
import { shortenNumber } from '../../../../common/helpers';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.card.default,
    border: `1px solid ${theme.palette.background.default}`,
    borderRadius: 12
  },
  titleWrapper: {
    maxWidth: 'calc(100% - 105px)',
    '& a': {
      color: theme.palette.text.primary
    }
  },
  volumeWrapper: {
    width: 'fit-content',
    cursor: 'pointer'
  },
  customTooltip: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 8,
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

  const bitcoin: Coin | undefined = coins.value.find((coin: Coin) => {
    return coin.id === 'bitcoin'
  });

  const mapTrustColor = () => {
    if (exchange.trustScore > 7) return theme.palette.success.main
    if (exchange.trustScore > 4) return theme.palette.warning.main
    return theme.palette.error.main
  }

  return (
    <Card className={classes.card} elevation={0}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center">
            <Tooltip title={exchange.name} placement="top" classes={{ tooltip: classes.customTooltip }}>
              <Typography variant="h6" noWrap className={classes.titleWrapper}>
                <Link
                  href={exchange.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {exchange.name}
                </Link>
              </Typography>
            </Tooltip>
            <Typography variant="body1" color="textSecondary" noWrap className={classes.trustScoreRank} >
              #{exchange.trustScoreRank}
            </Typography>
          </Box>
        }
        subheader={
          <Tooltip title="Total Volume (24H)" placement="bottom" classes={{ tooltip: classes.customTooltip }}>
            <Typography variant="subtitle2" color="textSecondary" noWrap className={classes.volumeWrapper}>
              {bitcoin ?
                `US$${shortenNumber(exchange.tradeVolume24HBtc * bitcoin.currentPrice)}` : '-'}
            </Typography>
          </Tooltip>
        }
        avatar={<Avatar src={exchange.image} alt={exchange.name} className={classes.avatarColor} variant="rounded" />}
      />
      <CardContent>
        <Box textAlign="center">
          <Typography variant="h5" style={{ color: mapTrustColor() }}>{exchange.trustScore || 0}</Typography>
          <Typography variant="body2" color="textSecondary">Trust Score</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ExchangeCard
