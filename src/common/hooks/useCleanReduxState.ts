import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearCoinListValue, selectCoinList } from '../../features/coinListSlice';
import { clearExchangeListValue, selectExchangeList } from '../../features/exchangeListSlice';

export const useCleanReduxState = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const coinList = useAppSelector(selectCoinList);
  const exchangeList = useAppSelector(selectExchangeList);

  useEffect(() => {
    if (location.pathname !== '/coins' && coinList.value.length > coinList.coinQueryParams.perPage) {
      dispatch(clearCoinListValue());
    };
    if (location.pathname !== '/exchanges' && exchangeList.value.length > exchangeList.exchangeQueryParams.perPage) {
      dispatch(clearExchangeListValue());
    };
  }, [
    coinList.coinQueryParams.perPage, 
    coinList.value.length, 
    dispatch, 
    exchangeList.exchangeQueryParams.perPage, 
    exchangeList.value.length, 
    location
  ]);
};
