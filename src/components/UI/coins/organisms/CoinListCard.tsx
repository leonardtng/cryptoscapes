import React, { useEffect } from 'react';
import { CardHeader } from '@material-ui/core';
import { getTodayDate } from '../../../../common/helpers';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import CardLayout from '../../../templates/CardLayout';
import { fetchCoinList, selectCoinList } from '../../../../features/coinListSlice';
import CoinListTable from '../molecules/CoinListTable';
import CustomiseTable from '../molecules/CustomiseTable';

const CoinListCard: React.FC = () => {
  const dispatch = useAppDispatch();

  const coinList = useAppSelector(selectCoinList);

  useEffect(() => {
    if (coinList.value.length === 0 && coinList.status === 'IDLE') {
      dispatch(fetchCoinList({ coinQueryParams: coinList.coinQueryParams, append: false }));
    }
  }, [dispatch, coinList.value, coinList.status, coinList.coinQueryParams]);

  return (
    <CardLayout minWidth={600}>
      <CardHeader
        title="Cryptocurrency Prices by Market Cap"
        subheader={`Last Updated: ${getTodayDate()}`}
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'caption' }}
        action={<CustomiseTable />}
      />
      <CoinListTable />
    </CardLayout>
  )
}

export default CoinListCard
