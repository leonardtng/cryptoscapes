import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchExchangeList, selectExchangeList, setExchangeQueryParams } from '../../../../features/exchangeListSlice';
import { Exchange } from '../../../../models';
import ExchangeCard from '../molecules/ExchangeCard';
import { useInfiniteScrollingObserver } from '../../../../common/hooks/useInfiniteScrollingObserver';
import CardSkeleton from '../../../skeletons/CardSkeleton';

const ExchangeCardList: React.FC = () => {
  const dispatch = useAppDispatch();
  const exchangeList = useAppSelector(selectExchangeList);

  useEffect(() => {
    if (exchangeList.value.length === 0 && exchangeList.status === 'IDLE') {
      dispatch(fetchExchangeList({ exchangeQueryParams: exchangeList.exchangeQueryParams, append: false }));
    }
  }, [dispatch, exchangeList.value, exchangeList.status, exchangeList.exchangeQueryParams]);

  const [lastRef] = useInfiniteScrollingObserver(
    exchangeList.status,
    setExchangeQueryParams({
      ...exchangeList.exchangeQueryParams,
      page: exchangeList.exchangeQueryParams.page + 1
    }),
    fetchExchangeList({
      exchangeQueryParams: {
        ...exchangeList.exchangeQueryParams,
        page: exchangeList.exchangeQueryParams.page + 1
      },
      append: true
    }),
    exchangeList.hasMore
  );

  return (
    <Box display="flex" flexWrap="wrap">
      {exchangeList.status === 'LOADING' ? (
        <>
          {Array.from(Array(exchangeList.exchangeQueryParams.perPage).keys()).map((index: number) => {
            return <Box key={index} width="25%" padding={1}>
              <CardSkeleton />
            </Box>
          })}
        </>
      ) : (
        <>
          {exchangeList.value.map((exchange: Exchange, index: number) => {
            return <Box key={index} width="25%" padding={1}>
              <ExchangeCard exchange={exchange} />
              {exchangeList.value.length === index + 1 && <div ref={lastRef} />}
            </Box>
          })}
          {exchangeList.hasMore && exchangeList.value.length !== 0 &&
            <>
              {Array.from(Array(4).keys()).map((index: number) => {
                return <Box key={index} width="25%" padding={1}>
                  <CardSkeleton />
                </Box>
              })}
            </>
          }
        </>
      )}
    </Box >
  )
}

export default ExchangeCardList
