import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';
import { convertIsoString, formatNumber, roundDecimals } from '../../../../common/helpers';
import { coinDetailsGaugeHeight } from '../../../../common/shared/dimensions';

const useStyles = makeStyles((theme: Theme) => ({
  statsCard: {
    height: coinDetailsGaugeHeight * 2 + theme.spacing(3), // Margin = 24px
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
  },
  gutterBottom: {
    marginBottom: 6
  },
  dataList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    flex: 1,
    paddingBottom: theme.spacing(2),
    '& .MuiListItem-root': {
      display: 'flex',
      justifyContent: 'space-between'
    }
  },
  listSubheaderWrapper: {
    backgroundColor: 'inherit',
    '& ul': {
      backgroundColor: 'inherit',
      padding: 0
    }
  }
}));

const CoinPriceStatistics: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const coinDetails = useAppSelector(selectCoinDetails);
  const marketData = coinDetails.value?.marketData;

  const coinStats = coinDetails.value && marketData ? [
    {
      name: `${coinDetails.value.name} Price Today`,
      items: [
        ...(marketData.currentPrice.usd) ? [{
          name: 'Current Price',
          content: `$${formatNumber(marketData.currentPrice.usd)}`
        }] : [],
        ...(marketData.priceChange24HInCurrency.usd) ? [{
          name: 'Price Change (24H)',
          content: `${marketData.priceChange24HInCurrency.usd > 0 ?
            '+' : '-'}$${formatNumber(marketData.priceChange24HInCurrency.usd, true)}`,
          color: marketData.priceChange24HInCurrency.usd > 0 ? theme.palette.success.main : theme.palette.error.main
        }] : [],
        ...(marketData.low24H.usd && marketData.high24H.usd) ? [{
          name: '24H Low / 24H High',
          content: `$${formatNumber(marketData.low24H.usd)} / $${formatNumber(marketData.high24H.usd)}`
        }] : [],
        ...(marketData.totalVolume.usd) ? [{
          name: 'Trading Volume',
          content: `${formatNumber(marketData.totalVolume.usd)}`
        }] : [],
        ...(marketData.totalVolume.usd && marketData.marketCap.usd) ? [{
          name: 'Volume / Market Cap',
          content: `${marketData.totalVolume.usd / marketData.marketCap.usd}`
        }] : [],
        ...(marketData.marketCapRank) ? [{
          name: 'Market Rank',
          content: `#${marketData.marketCapRank}`
        }] : []
      ]
    },
    {
      name: `${coinDetails.value.name} Market Cap`,
      items: [
        ...(marketData.marketCap.usd) ? [{
          name: 'Market Cap',
          content: `$${formatNumber(marketData.marketCap.usd)}`
        }] : [],
        ...(marketData.fullyDilutedValuation.usd) ? [{
          name: 'Fully Diluted Market Cap',
          content: `$${formatNumber(marketData.fullyDilutedValuation.usd)}`
        }] : [],
      ]
    },
    {
      name: `${coinDetails.value.name} Price History`,
      items: [
        ...(marketData.priceChangePercentage7DInCurrency.usd) ? [{
          name: '7D Change',
          content: `${marketData.priceChangePercentage7DInCurrency.usd > 0 ?
            '+' : ''}${roundDecimals(marketData.priceChangePercentage7DInCurrency.usd)}%`,
          color: marketData.priceChangePercentage7DInCurrency.usd > 0 ?
            theme.palette.success.main : theme.palette.error.main
        }] : [],
        ...(marketData.priceChangePercentage14DInCurrency.usd) ? [{
          name: '14D Change',
          content: `${marketData.priceChangePercentage14DInCurrency.usd > 0 ?
            '+' : ''}${roundDecimals(marketData.priceChangePercentage14DInCurrency.usd)}%`,
          color: marketData.priceChangePercentage14DInCurrency.usd > 0 ?
            theme.palette.success.main : theme.palette.error.main
        }] : [],
        ...(marketData.priceChangePercentage30DInCurrency.usd) ? [{
          name: '30D Change',
          content: `${marketData.priceChangePercentage30DInCurrency.usd > 0 ?
            '+' : ''}${roundDecimals(marketData.priceChangePercentage30DInCurrency.usd)}%`,
          color: marketData.priceChangePercentage30DInCurrency.usd > 0 ?
            theme.palette.success.main : theme.palette.error.main
        }] : [],
        ...(marketData.priceChangePercentage60DInCurrency.usd) ? [{
          name: '60D Change',
          content: `${marketData.priceChangePercentage60DInCurrency.usd > 0 ?
            '+' : ''}${roundDecimals(marketData.priceChangePercentage60DInCurrency.usd)}%`,
          color: marketData.priceChangePercentage60DInCurrency.usd > 0 ?
            theme.palette.success.main : theme.palette.error.main
        }] : [],
        ...(marketData.priceChangePercentage200DInCurrency.usd) ? [{
          name: '200D Change',
          content: `${marketData.priceChangePercentage200DInCurrency.usd > 0 ?
            '+' : ''}${roundDecimals(marketData.priceChangePercentage200DInCurrency.usd)}%`,
          color: marketData.priceChangePercentage200DInCurrency.usd > 0 ?
            theme.palette.success.main : theme.palette.error.main
        }] : [],
        ...(marketData.priceChangePercentage1YInCurrency.usd) ? [{
          name: '1Y Change',
          content: `${marketData.priceChangePercentage1YInCurrency.usd > 0 ?
            '+' : ''}${roundDecimals(marketData.priceChangePercentage1YInCurrency.usd)}%`,
          color: marketData.priceChangePercentage1YInCurrency.usd > 0 ?
            theme.palette.success.main : theme.palette.error.main
        }] : [],
        ...(marketData.ath.usd && marketData.athDate.usd) ? [{
          name: `All Time High (${convertIsoString(marketData.athDate.usd)})`,
          content: `$${formatNumber(marketData.ath.usd)}`
        }] : [],
        ...(marketData.atl.usd && marketData.atlDate.usd) ? [{
          name: `All Time Low (${convertIsoString(marketData.atlDate.usd)})`,
          content: `$${formatNumber(marketData.atl.usd)}`
        }] : [],
        ...(marketData.roi) ? [{
          name: `${coinDetails.value.name} ROI`,
          content: `${marketData.roi.percentage > 0 ?
            '+' : ''}${roundDecimals(marketData.roi.percentage)}%`,
          color: marketData.roi.percentage > 0 ? theme.palette.success.main : theme.palette.error.main
        }] : []
      ]
    },
    {
      name: `${coinDetails.value.name} Supply`,
      items: [
        ...(marketData.circulatingSupply) ? [{
          name: 'Circulating Supply',
          content: `${formatNumber(marketData.circulatingSupply)} ${coinDetails.value.symbol.toUpperCase()}`
        }] : [{
          name: 'Circulating Supply',
          content: 'No Data'
        }],
        ...(marketData.totalSupply) ? [{
          name: 'Total Supply',
          content: `${formatNumber(marketData.totalSupply)} ${coinDetails.value.symbol.toUpperCase()}`
        }] : [{
          name: 'Total Supply',
          content: 'No Data'
        }],
        ...(marketData.maxSupply) ? [{
          name: 'Max Supply',
          content: `${formatNumber(marketData.maxSupply)} ${coinDetails.value.symbol.toUpperCase()}`
        }] : [{
          name: 'Max Supply',
          content: 'No Data'
        }]
      ]
    },
    ...(marketData.totalValueLocked) ? [{
      name: `${coinDetails.value.name} DeFi`,
      items: [
        {
          name: 'Total Value Locked (TVL)',
          content: `$${formatNumber(marketData.totalValueLocked.usd)}`
        },
        ...(marketData.marketCap.usd) ? [{
          name: 'Market Cap / TVL',
          content: `${roundDecimals(marketData.marketCap.usd / marketData.totalValueLocked.usd)}`
        }] : [],
        ...(marketData.fullyDilutedValuation.usd) ? [{
          name: 'Fully Diluted Market Cap / TVL',
          content: `${roundDecimals(marketData.fullyDilutedValuation.usd / marketData.totalValueLocked.usd)}`
        }] : []
      ]
    }] : [],
  ] : [];

  return (
    <>
      {coinDetails.value && coinDetails.status !== 'LOADING' ? (
        <Card className={classes.statsCard}>
          <CardHeader
            title={`${coinDetails.value.name} Price Statistics`}
            titleTypographyProps={{ variant: 'h6', color: 'textPrimary' }}
          />
          <List className={classes.dataList} subheader={<li />} dense>
            {coinStats.map((section, index: number) => (
              <li key={index} className={classes.listSubheaderWrapper}>
                <ul>
                  <ListSubheader>{section.name}</ListSubheader>
                  {section.items.map((item, index: number) => (
                    <ListItem key={index}>
                      <ListItemText primary={item.name} />
                      <ListItemText
                        primary={item.content}
                        primaryTypographyProps={{ align: 'right' }}
                        style={{ color: item.color || '' }}
                      />
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List>
        </Card>
      ) : (
        <Card className={classes.statsCard}>
          <CardContent>
            <Skeleton height={32} width={250} className={classes.gutterBottom} />
            <Skeleton height={24} width="90%" />
            <Skeleton height={24} width="100%" />
            <Skeleton height={24} width="60%" />
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default CoinPriceStatistics
