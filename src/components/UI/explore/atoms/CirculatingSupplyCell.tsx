import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, LinearProgress, Typography, Tooltip } from '@material-ui/core';
import { formatNumber, roundDecimals, shortenNumber } from '../../../../common/helpers';
import { Coin } from '../../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  customTooltip: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 12,
    minWidth: 335
  },
  progressBar: {
    marginTop: theme.spacing(1),
    width: '84%',
    float: 'right',
    borderRadius: 12,
    height: 6,
    minWidth: 150,
    '& .MuiLinearProgress-bar': {
      borderRadius: 12
    }
  },
  tooltipProgressBar: {
    borderRadius: 12,
    height: 8,
    margin: '6px 0 16px',
    '& .MuiLinearProgress-bar': {
      borderRadius: 12
    }
  }
}));

interface Props {
  coin: Coin
}

const CirculatingSupplyCell: React.FC<Props> = ({ coin }) => {
  const classes = useStyles();

  return (
    <Tooltip
      interactive
      title={
        <Box>
          {coin.totalSupply && coin.circulatingSupply < coin.totalSupply &&
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="textSecondary" align="justify">
                  Percentage
                </Typography>
                <Typography variant="body2" color="textSecondary" align="justify">
                  {roundDecimals(coin.circulatingSupply / coin.totalSupply * 100, 2)}%
                </Typography>
              </Box>
              <LinearProgress
                className={classes.tooltipProgressBar}
                variant="determinate"
                color="secondary"
                value={coin.circulatingSupply / coin.totalSupply * 100}
              />
            </Box>
          }
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary" align="justify" gutterBottom>
              Circulating Supply
            </Typography>
            <Typography variant="body2" color="textSecondary" align="justify" gutterBottom>
              {formatNumber(coin.circulatingSupply)} {coin.symbol.toUpperCase()}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary" align="justify" gutterBottom>
              Total Supply
            </Typography>
            <Typography variant="body2" color="textSecondary" align="justify" gutterBottom>
              {coin.totalSupply && coin.circulatingSupply < coin.totalSupply ?
                formatNumber(coin.totalSupply) : '∞'} {coin.symbol.toUpperCase()}
            </Typography>
          </Box>
        </Box>
      }
      classes={{ tooltip: classes.customTooltip }}
    >
      <Box>
        <Typography variant="subtitle2" noWrap>
          {formatNumber(roundDecimals(coin.circulatingSupply || 0, 0))} {coin.symbol.toUpperCase()}
        </Typography>
        {coin.totalSupply && coin.circulatingSupply < coin.totalSupply &&
          <LinearProgress
            className={classes.progressBar}
            variant="determinate"
            color="secondary"
            value={coin.circulatingSupply / coin.totalSupply * 100}
          />
        }
      </Box>
    </Tooltip>
  );
}

export default CirculatingSupplyCell