import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';
import { formatNumber } from '../../../../common/helpers';
import CirculatingSupplyTooltip from '../atoms/CirculatingSupplyTooltip';
import { HelpOutlineRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  detailsSurface: {
    width: '23%',
    backgroundColor: theme.palette.card.paper,
    borderRadius: 12
  },
  gutterBottom: {
    marginBottom: 7
  },
  marketCapRank: {
    marginLeft: 6,
    padding: '0 8px',
    borderRadius: 6,
    backgroundColor: theme.palette.card.default
  },
  supplyCard: {
    '& .MuiSvgIcon-root': {
      marginLeft: 6,
      fontSize: '1rem',
      cursor: 'pointer'
    }
  }
}));

const CoinDataCardGroup: React.FC = () => {
  const classes = useStyles();
  const coinDetails = useSelector(selectCoinDetails);

  const circulatingSupply = coinDetails.value?.marketData.circulatingSupply || 0;
  const totalSupply = coinDetails.value?.marketData.totalSupply || 0;

  return (
    <>
      {coinDetails.status === "LOADING" ? (
        <Box display="flex" justifyContent="space-between" padding="16px">
          {Array.from(Array(4).keys()).map((index: number) =>
            <Paper className={classes.detailsSurface}>
              <Box height="100%" padding="18px 24px">
                <Skeleton height={32} width="80%" className={classes.gutterBottom} />
                <Skeleton height={24} width="40%" />
              </Box>
            </Paper>
          )}
        </Box>
      ) : (
        <>
          {coinDetails.value &&
            <Box display="flex" justifyContent="space-between" padding="16px">
              <Paper className={classes.detailsSurface}>
                <Box height="100%" padding="18px 24px">
                  <Typography variant="h6" className={classes.gutterBottom}>
                    ${formatNumber(coinDetails.value.marketData.marketCap.usd)}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1" color="textSecondary">
                      Market Cap
                    </Typography>
                    <Typography variant="body1" color="textSecondary" className={classes.marketCapRank} >
                      #{coinDetails.value.marketCapRank}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
              <Paper className={classes.detailsSurface}>
                <Box height="100%" padding="18px 24px">
                  <Typography variant="h6" className={classes.gutterBottom}>
                    ${formatNumber(coinDetails.value.marketData.totalVolume.usd)}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Total Volume (24H)
                  </Typography>
                </Box>
              </Paper>
              <Paper className={classes.detailsSurface}>
                <Box height="100%" padding="18px 24px">
                  <Typography variant="h6" className={classes.gutterBottom}>
                    {formatNumber(circulatingSupply)} {coinDetails.value.symbol.toUpperCase()}
                  </Typography>
                  <Box display="flex" alignItems="center" className={classes.supplyCard}>
                    <Typography variant="body1" color="textSecondary">
                      Circulating Supply
                    </Typography>
                    <CirculatingSupplyTooltip
                      coinSymbol={coinDetails.value.symbol.toUpperCase()}
                      circulatingSupply={circulatingSupply}
                      totalSupply={totalSupply}
                    >
                      <HelpOutlineRounded />
                    </CirculatingSupplyTooltip>
                  </Box>
                </Box>
              </Paper>
              <Paper className={classes.detailsSurface}>
                <Box height="100%" padding="18px 24px">
                  <Typography variant="h6" className={classes.gutterBottom}>
                    {totalSupply ? formatNumber(totalSupply) : '∞'} {coinDetails.value.symbol.toUpperCase()}
                  </Typography>
                  <Box display="flex" alignItems="center" className={classes.supplyCard}>
                    <Typography variant="body1" color="textSecondary">
                      Total Supply
                    </Typography>
                    <CirculatingSupplyTooltip
                      coinSymbol={coinDetails.value.symbol.toUpperCase()}
                      circulatingSupply={circulatingSupply}
                      totalSupply={totalSupply}
                    >
                      <HelpOutlineRounded />
                    </CirculatingSupplyTooltip>
                  </Box>
                </Box>
              </Paper>
            </Box>
          }
        </>
      )}
    </>
  )
}

export default CoinDataCardGroup;
