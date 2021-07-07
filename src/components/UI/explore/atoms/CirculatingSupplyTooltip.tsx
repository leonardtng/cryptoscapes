import React, { ReactElement } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, LinearProgress, Typography, Tooltip } from '@material-ui/core';
import { formatNumber, roundDecimals } from '../../../../common/helpers';

const useStyles = makeStyles((theme: Theme) => ({
  customTooltip: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 12,
    minWidth: 335
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
  children: ReactElement<any, any>;
  coinSymbol: string;
  circulatingSupply: number;
  maxSupply: number;
}

const CirculatingSupplyTooltip: React.FC<Props> = ({ children, coinSymbol, circulatingSupply, maxSupply }) => {
  const classes = useStyles();

  return (
    <Tooltip
      interactive
      title={
        <Box>
          {circulatingSupply <= maxSupply &&
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="textSecondary" align="justify">
                  Percentage
                </Typography>
                <Typography variant="body2" color="textSecondary" align="justify">
                  {roundDecimals(circulatingSupply / maxSupply * 100, 2)}%
                </Typography>
              </Box>
              <LinearProgress
                className={classes.tooltipProgressBar}
                variant="determinate"
                color="secondary"
                value={circulatingSupply / maxSupply * 100}
              />
            </Box>
          }
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary" align="justify" gutterBottom>
              Circulating Supply
            </Typography>
            <Typography variant="body2" color="textSecondary" align="justify" gutterBottom>
              {formatNumber(circulatingSupply)} {coinSymbol}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary" align="justify" gutterBottom>
              Max Supply
            </Typography>
            <Typography variant="body2" color="textSecondary" align="justify" gutterBottom>
              {circulatingSupply <= maxSupply ?
                formatNumber(maxSupply) : '∞'} {coinSymbol}
            </Typography>
          </Box>
        </Box>
      }
      classes={{ tooltip: classes.customTooltip }}
    >
      {children}
    </Tooltip>
  );
}

export default CirculatingSupplyTooltip