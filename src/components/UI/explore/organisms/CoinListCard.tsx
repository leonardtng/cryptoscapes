import React, { useEffect } from 'react';
// import { Theme, makeStyles } from '@material-ui/core/styles';
import { CardHeader } from '@material-ui/core';
import { getTodayDate } from '../../../../common/helpers/dateHandler';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import CardLayout from '../../../templates/CardLayout';
import { fetchCoinList, selectCoinList } from '../../../../features/coinListSlice';
import CoinListTable from '../molecules/CoinListTable';

// const useStyles = makeStyles((theme: Theme) => ({

// }));

const CoinListCard: React.FC = () => {
  // const classes = useStyles();
  const dispatch = useAppDispatch();

  const coinList = useAppSelector(selectCoinList);

  useEffect(() => {
    if (coinList.value.length === 0 && coinList.status === 'IDLE') {
      dispatch(fetchCoinList(coinList.coinQueryParams));
    }
  }, [dispatch, coinList.value, coinList.status, coinList.coinQueryParams]);

  return (
    <CardLayout>
      <CardHeader
        title="Cryptocurrency Prices by Market Cap"
        subheader={`Last Updated: ${getTodayDate()}`}
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'caption' }}
      />
      <CoinListTable />
    </CardLayout>
  )
}

export default CoinListCard
