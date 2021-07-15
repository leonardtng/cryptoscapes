import React, { Fragment } from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, CardHeader, Divider, List } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import CardLayout from '../../../templates/CardLayout';
import { useAppSelector } from '../../../../app/hooks';
import { selectCompanies } from '../../../../features/companiesSlice';
import { formatNumber, roundDecimals, shortenNumber } from '../../../../common/helpers';
import { selectCoins } from '../../../../features/coinsSlice';
import { Coin, Company } from '../../../../models';
import ListItemSkeleton from '../../../skeletons/ListItemSkeleton';
import CompanyItem from '../molecules/CompanyItem';

const useStyles = makeStyles((theme: Theme) => ({
  coinAvatar: {
    marginRight: 6
  },
  trendingCoinList: {
    overflow: 'scroll',
    paddingBottom: 8
  }
}));

interface Props {
  coinId: 'bitcoin' | 'ethereum';
}

const CompaniesCard: React.FC<Props> = ({ coinId }) => {
  const classes = useStyles();
  const theme = useTheme()

  const coins = useAppSelector(selectCoins);
  const companies = useAppSelector(selectCompanies);

  const coinData = coins.value.find((coin: Coin) => coin.id === coinId);
  const companiesData = companies.value && companies.value[coinId];

  return (
    <CardLayout>
      <CardHeader
        title={
          coinData && companiesData !== null ?
            `Top Companies Holding ${coinData.name}` :
            <Skeleton height={20} width={60} />
        }
        titleTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
        subheader={
          coinData && companiesData !== null ?
            `US$${shortenNumber(companiesData.totalValueUsd)} 
            (${formatNumber(roundDecimals(companiesData.totalHoldings, 0))} ${coinData?.symbol.toUpperCase()})` :
            <Skeleton height={32} width={120} />
        }
        subheaderTypographyProps={{ variant: 'h6', color: 'textPrimary' }}
        avatar={
          coinData && companiesData !== null ?
            <Avatar src={coinData?.image} alt={coinData?.name} className={classes.coinAvatar} /> :
            <Skeleton variant="circle" height={theme.spacing(5)} width={theme.spacing(5)} />
        }
      />
      <Divider />
      <List dense disablePadding className={classes.trendingCoinList}>
        {!companiesData || companies.status === 'LOADING' || !coinData ? (
          <ListItemSkeleton count={7} height={60} iconDimensions={theme.spacing(3)} />
        ) : (
          <>
            {companiesData.companies.map((company: Company, index: number) => {
              return <Fragment key={index}>
                <CompanyItem company={company} index={index} coinSymbol={coinData.symbol.toUpperCase()} />
                {index < companiesData.companies.length - 1 && <Divider />}
              </Fragment>
            })}
          </>
        )}
      </List>
    </CardLayout>
  )
}

export default CompaniesCard
