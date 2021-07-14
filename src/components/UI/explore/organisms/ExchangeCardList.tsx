import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchExchangeList, selectExchangeList } from '../../../../features/exchangeListSlice';
import { Exchange } from '../../../../models';
import ExchangeCard from '../molecules/ExchangeCard';

const ExchangeCardList: React.FC = () => {
  const dispatch = useAppDispatch();

  const exchangeList = useAppSelector(selectExchangeList);

  useEffect(() => {
    if (exchangeList.value.length === 0 && exchangeList.status === 'IDLE') {
      dispatch(fetchExchangeList());
    }
  }, [dispatch, exchangeList.value, exchangeList.status]);

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
      {exchangeList.value.map((exchange: Exchange) => {
        return <ExchangeCard exchange={exchange} />
      })}
    </Box >
  )
}

export default ExchangeCardList
