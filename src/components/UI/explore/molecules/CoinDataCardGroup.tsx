import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';
import { formatNumber, roundDecimals } from '../../../../common/helpers';
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
  const maxSupply = coinDetails.value?.marketData.maxSupply || 0;

  return (
    <>
      {coinDetails.status === "LOADING" ? (
        <Box display="flex" justifyContent="space-between" padding={3}>
          {Array.from(Array(4).keys()).map((index: number) =>
            <Paper key={index} className={classes.detailsSurface}>
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
            <Box display="flex" justifyContent="space-between" padding={3}>
              <Paper className={classes.detailsSurface}>
                <Box height="100%" padding="18px 24px">
                  <Typography variant="h6" className={classes.gutterBottom} noWrap>
                    ${formatNumber(coinDetails.value.marketData.marketCap.usd)}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1" color="textSecondary" noWrap>
                      Market Cap
                    </Typography>
                    <Typography variant="body1" color="textSecondary" className={classes.marketCapRank}>
                      #{coinDetails.value.marketCapRank || ' -'}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
              <Paper className={classes.detailsSurface}>
                <Box height="100%" padding="18px 24px">
                  <Typography variant="h6" className={classes.gutterBottom} noWrap>
                    ${formatNumber(coinDetails.value.marketData.totalVolume.usd)}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" noWrap>
                    Total Volume (24H)
                  </Typography>
                </Box>
              </Paper>
              <Paper className={classes.detailsSurface}>
                <Box height="100%" padding="18px 24px">
                  <Typography variant="h6" className={classes.gutterBottom} noWrap>
                    {formatNumber(roundDecimals(circulatingSupply, 0))} {coinDetails.value.symbol.toUpperCase()}
                  </Typography>
                  <Box display="flex" alignItems="center" className={classes.supplyCard}>
                    <Typography variant="body1" color="textSecondary" noWrap>
                      Circulating Supply
                    </Typography>
                    <CirculatingSupplyTooltip
                      coinSymbol={coinDetails.value.symbol.toUpperCase()}
                      circulatingSupply={circulatingSupply}
                      maxSupply={maxSupply}
                    >
                      <HelpOutlineRounded />
                    </CirculatingSupplyTooltip>
                  </Box>
                </Box>
              </Paper>
              <Paper className={classes.detailsSurface}>
                <Box height="100%" padding="18px 24px">
                  <Typography variant="h6" className={classes.gutterBottom} noWrap>
                    {maxSupply ?
                      formatNumber(roundDecimals(maxSupply, 0))
                      : '∞'} {coinDetails.value.symbol.toUpperCase()}
                  </Typography>
                  <Box display="flex" alignItems="center" className={classes.supplyCard}>
                    <Typography variant="body1" color="textSecondary" noWrap>
                      Max Supply
                    </Typography>
                    <CirculatingSupplyTooltip
                      coinSymbol={coinDetails.value.symbol.toUpperCase()}
                      circulatingSupply={circulatingSupply}
                      maxSupply={maxSupply}
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
