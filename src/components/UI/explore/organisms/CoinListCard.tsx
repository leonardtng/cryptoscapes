import React, { useEffect } from 'react';
import { CardHeader } from '@material-ui/core';
import { getTodayDate } from '../../../../common/helpers';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import CardLayout from '../../../templates/CardLayout';
import { fetchCoinList, selectCoinList } from '../../../../features/coinListSlice';
import { fetchCoinCategories, selectCoinCategories } from '../../../../features/coinCategoriesSlice';
import CoinListTable from '../molecules/CoinListTable';
import CustomiseTable from '../molecules/CustomiseTable';

const CoinListCard: React.FC = () => {
  const dispatch = useAppDispatch();

  const coinList = useAppSelector(selectCoinList);
  const coinCategories = useAppSelector(selectCoinCategories);

  useEffect(() => {
    if (coinList.value.length === 0 && coinList.status === 'IDLE') {
      dispatch(fetchCoinList({ coinQueryParams: coinList.coinQueryParams, append: false }));
    }
  }, [dispatch, coinList.value, coinList.status, coinList.coinQueryParams]);

  useEffect(() => {
    if (coinCategories.value.length === 0 && coinCategories.status === 'IDLE') {
      dispatch(fetchCoinCategories());
    }
  }, [dispatch, coinCategories.value, coinCategories.status]);

  return (
    <CardLayout>
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
