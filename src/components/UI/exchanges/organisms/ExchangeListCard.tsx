import React, { useEffect } from 'react';
import { Box, useTheme } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchExchangeList, selectExchangeList, setExchangeQueryParams } from '../../../../features/exchangeListSlice';
import { Exchange } from '../../../../models';
import ExchangeCard from '../molecules/ExchangeCard';
import { useInfiniteScrollingObserver } from '../../../../common/hooks/useInfiniteScrollingObserver';
import CardSkeleton from '../../../skeletons/CardSkeleton';
import { useWindowSize } from '../../../../common/hooks/useWindowSize';

interface Props {
  top: React.MutableRefObject<any>
}

const ExchangeListCard: React.FC<Props> = ({ top }) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const exchangeList = useAppSelector(selectExchangeList);

  const windowSize = useWindowSize();
  const cardsPerRow =
    windowSize.width < theme.breakpoints.values.sm ? 1 :
      windowSize.width < theme.breakpoints.values.md ? 2 :
        windowSize.width < theme.breakpoints.values.lg ? 3 :
          windowSize.width < theme.breakpoints.values.xl ? 4 : 5

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
            return <Box key={index} width={`${100 / cardsPerRow}%`} padding={1}>
              {index === 0 && <div ref={top} />}
              <CardSkeleton />
            </Box>
          })}
        </>
      ) : (
        <>
          {exchangeList.value.map((exchange: Exchange, index: number) => {
            return <Box key={index} width={`${100 / cardsPerRow}%`} padding={1}>
              {index === 0 && <div ref={top} />}
              <ExchangeCard exchange={exchange} />
              {exchangeList.value.length === index + 1 && <div ref={lastRef} />}
            </Box>
          })}
          {exchangeList.hasMore && exchangeList.value.length !== 0 &&
            <>
              {Array.from(Array(cardsPerRow).keys()).map((index: number) => {
                return <Box key={index} width={`${100 / cardsPerRow}%`} padding={1}>
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

export default ExchangeListCard
