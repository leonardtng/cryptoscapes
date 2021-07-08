import React, { useState } from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Box, Chip, LinearProgress, Link, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';
import { formatNumber, roundDecimals } from '../../../../common/helpers';
import CoinCategoriesDialog from '../atoms/CoinCategoriesDialog';
import { CoinCategory, CoinQueryParams } from '../../../../models';
import { fetchCoinList, selectCoinList, setCoinQueryParams } from '../../../../features/coinListSlice';
import { selectCoinCategories } from '../../../../features/coinCategoriesSlice';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) => ({
  coinDetailsHeader: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(1)
  },
  avatarLarge: {
    height: theme.spacing(8),
    width: theme.spacing(8),
    marginRight: 16
  },
  gutterBottom: {
    marginBottom: 6
  },
  coinSymbol: {
    marginLeft: 16,
    padding: '0 6px',
    borderRadius: 6,
    backgroundColor: theme.palette.card.paper
  },
  link: {
    margin: '0 12px 0 2px',
    '& a': {
      color: theme.palette.text.secondary
    }
  },
  chip: {
    marginRight: 8
  },
  priceChange: {
    marginLeft: 16
  },
  progressBar: {
    margin: '0 8px',
    borderRadius: 12,
    height: 6,
    width: 100,
    '& .MuiLinearProgress-bar': {
      borderRadius: 12
    }
  }
}));

const CoinDetailsHeader: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory();
  const dispatch = useAppDispatch();

  const coinList = useAppSelector(selectCoinList);
  const coinCategories = useAppSelector(selectCoinCategories);
  const coinDetails = useAppSelector(selectCoinDetails);

  const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);

  const handleClickCategory = (categoryName: string) => {
    const queryParams: CoinQueryParams = {
      ...coinList.coinQueryParams,
      page: 1,
      category: coinCategories.value.find((category: CoinCategory) => category.name === categoryName)?.categoryId || ''
    };

    dispatch(setCoinQueryParams(queryParams));
    dispatch(fetchCoinList({ coinQueryParams: queryParams, append: false }));

    history.push('/coins');
  };

  const calculateProgress = (current: number, low: number, high: number) => {
    if (current <= low) return 0
    if (current >= high) return 100
    return (current - low) / (high - low) * 100
  };

  return (
    <>
      {coinDetails.value && coinDetails.status !== "LOADING" ? (
        <Box display="flex" justifyContent="space-between" padding={3}>
          <Box display="flex" alignItems="center">
            <Avatar
              src={coinDetails.value.image.large}
              alt={coinDetails.value.id}
              className={classes.avatarLarge}
            />
            <Box>
              <Box display="flex" alignItems="center" marginBottom="6px">
                <Typography variant="h4">{coinDetails.value.name}</Typography>
                <Typography variant="body1" color="textSecondary" className={classes.coinSymbol} >
                  {coinDetails.value.symbol.toUpperCase()}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" >
                {coinDetails.value.links.homepage[0] &&
                  <Typography variant="body1" className={classes.link}>
                    <Link
                      href={coinDetails.value.links.homepage[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Website
                    </Link>
                  </Typography>
                }
                {coinDetails.value.links.blockchainSite[0] &&
                  <Typography variant="body1" className={classes.link}>
                    <Link
                      href={coinDetails.value.links.blockchainSite[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Blockchain
                    </Link>
                  </Typography>
                }
                {coinDetails.value.links.officialForumUrl[0] &&
                  <Typography variant="body1" className={classes.link}>
                    <Link
                      href={coinDetails.value.links.officialForumUrl[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Forum
                    </Link>
                  </Typography>
                }
                {coinDetails.value.categories.slice(0, 2).map((category: string) => (
                  <Chip
                    key={category}
                    className={classes.chip}
                    label={category}
                    size="small"
                    color="primary"
                    clickable
                    onClick={() => handleClickCategory(category)}
                  />
                ))}
                {coinDetails.value.categories.length > 2 &&
                  <Chip label="View All" size="small" clickable onClick={() => setCategoriesOpen(true)} />
                }
                <CoinCategoriesDialog
                  open={categoriesOpen}
                  toggleClose={() => setCategoriesOpen(false)}
                  handleClickCategory={handleClickCategory}
                />
              </Box>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box>
              <Box width="100%" display="flex" alignItems="center" justifyContent="flex-end" marginBottom="6px">
                <Typography variant="h4">${formatNumber(coinDetails.value.marketData.currentPrice.usd)}</Typography>
                <Typography
                  variant="h6"
                  className={classes.priceChange}
                  style={{
                    color: coinDetails.value.marketData.priceChangePercentage24H >= 0 ?
                      theme.palette.success.main : theme.palette.error.main
                  }}
                >
                  {coinDetails.value.marketData.priceChangePercentage24H >= 0 ? '+' : ''}
                  {roundDecimals(coinDetails.value.marketData.priceChangePercentage24H)}%
                </Typography>
              </Box>
              {coinDetails.value.marketData.low24H.usd && coinDetails.value.marketData.high24H.usd &&
                <Box display="flex" alignItems="center">
                  <Typography variant="subtitle2" color="textSecondary">
                    Low: ${formatNumber(Math.min(
                      coinDetails.value.marketData.low24H.usd, coinDetails.value.marketData.currentPrice.usd))}
                  </Typography>
                  <LinearProgress
                    className={classes.progressBar}
                    variant="determinate"
                    color="secondary"
                    value={
                      calculateProgress(
                        coinDetails.value.marketData.currentPrice.usd,
                        coinDetails.value.marketData.low24H.usd,
                        coinDetails.value.marketData.high24H.usd
                      )
                    }
                  />
                  <Typography variant="subtitle2" color="textSecondary">
                    High: ${formatNumber(Math.max(
                      coinDetails.value.marketData.high24H.usd, coinDetails.value.marketData.currentPrice.usd))}
                  </Typography>
                </Box>
              }
            </Box>
          </Box>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" padding={3}>
          <Skeleton variant="circle" className={classes.avatarLarge} />
          <Box>
            <Skeleton height={41} width={250} className={classes.gutterBottom} />
            <Skeleton height={24} width={350} />
          </Box>
        </Box>
      )}
    </>
  )
}

export default CoinDetailsHeader
