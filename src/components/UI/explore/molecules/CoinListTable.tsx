import React from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Paper
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchCoinList, selectCoinList, setCoinQueryParams } from '../../../../features/coinListSlice';
import { Coin, CoinQueryParams, CoinSortingKey } from '../../../../models';
import CoinListTableHeader, { headCells } from '../atoms/CoinListTableHeader';
import CoinSparkline from '../atoms/CoinSparkline';
import { roundDecimals } from '../../../../common/helpers/roundDecimals';
import { formatNumber } from '../../../../common/helpers/formatNumber';
import { useInfiniteScrollingObserver } from '../../../../common/hooks/useInfiniteScrollingObserver';
import { selectSupportedCoins } from '../../../../features/supportedCoinsSlice';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'calc(100% - 83px)',
      width: '100%',
      overflowY: 'scroll',
    },
    paper: {
      height: '100%',
      width: '100%',
      backgroundColor: theme.palette.card.default
    },
    table: {
      height: '100%',
      minWidth: 750
    },
    tableContainer: {
      height: '100%',
      '& .MuiTableBody-root .MuiTableRow-root': {
        height: 83
      },
      '& .MuiTableBody-root .MuiTableRow-root:last-child .MuiTableCell-root': {
        borderBottom: 'none'
      }
    },
    coinNameGroup: {
      '& .MuiAvatar-root': {
        height: theme.spacing(4),
        width: theme.spacing(4),
        marginRight: 16
      },
      '& .MuiTypography-root:last-child': {
        marginLeft: 16
      }
    },
    chartWrapper: {
      height: 50,
      width: 150,
      float: 'right'
    }
  }),
);

const CoinListTable: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const coinList = useAppSelector(selectCoinList);
  const supportedCoins = useAppSelector(selectSupportedCoins);

  const [lastRef] = useInfiniteScrollingObserver(
    coinList.status,
    setCoinQueryParams({
      ...coinList.coinQueryParams,
      page: coinList.coinQueryParams.page + 1
    }),
    fetchCoinList({
      coinQueryParams: { ...coinList.coinQueryParams, page: coinList.coinQueryParams.page + 1 },
      append: true
    })
  );

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: CoinSortingKey) => {
    const queryParams: CoinQueryParams = {
      ...coinList.coinQueryParams,
      sortingKey: property,
      sortingOrder: coinList.coinQueryParams.sortingOrder === 'asc' ? 'desc' : 'asc',
      page: 1
    };

    dispatch(fetchCoinList({ coinQueryParams: queryParams, append: false }));
    dispatch(setCoinQueryParams(queryParams));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table} stickyHeader>
            <CoinListTableHeader
              order={coinList.coinQueryParams.sortingOrder}
              orderBy={coinList.coinQueryParams.sortingKey}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {coinList.value.length === 0 ? (
                <>
                  {Array.from(Array(coinList.coinQueryParams.perPage).keys()).map((index: number) => {
                    return <TableRow tabIndex={-1} key={index}>
                      {Array.from(Array(headCells.length).keys()).map((index: number) => {
                        return <TableCell key={index}>
                          <Skeleton />
                        </TableCell>
                      })}
                    </TableRow>
                  })}
                </>
              ) : (
                <>
                  {coinList.value.map((coin: Coin, index: number) => {
                    const gain24H = coin.priceChangePercentage24HInCurrency >= 0;
                    const gain7D = coin.priceChangePercentage7DInCurrency >= 0;
                    return <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                      ref={coinList.value.length === index + 1 ? lastRef : null}
                    >
                      <TableCell component="th" scope="row">
                        <Typography variant="subtitle2" noWrap>
                          {coin.marketCapRank || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" className={classes.coinNameGroup} >
                          <Avatar src={coin.image} alt={coin.id} />
                          <Typography variant="subtitle2" noWrap>
                            {coin.name}
                          </Typography>
                          <Typography variant="subtitle2" color="textSecondary" noWrap>
                            {coin.symbol.toUpperCase()}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" noWrap>
                          ${coin.currentPrice}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="subtitle2"
                          style={{ color: gain24H ? theme.palette.success.main : theme.palette.error.main }}
                          noWrap
                        >
                          {gain24H ? '+' : ''}{roundDecimals(coin.priceChangePercentage24HInCurrency)}%
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="subtitle2"
                          style={{ color: gain7D ? theme.palette.success.main : theme.palette.error.main }}
                          noWrap
                        >
                          {gain7D ? '+' : ''}{roundDecimals(coin.priceChangePercentage7DInCurrency)}%
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" noWrap>
                          ${formatNumber(coin.marketCap || 0)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" noWrap>
                          ${formatNumber(coin.totalVolume || 0)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <div className={classes.chartWrapper}>
                          <CoinSparkline data={coin.sparklineIn7D?.price || []} gain={gain7D} />
                        </div>
                      </TableCell>
                    </TableRow>
                  })}
                  {coinList.value.length !== supportedCoins.value.length && coinList.value.length !== 0 &&
                    <TableRow>
                      {Array.from(Array(headCells.length).keys()).map((index: number) => {
                        return <TableCell key={index}>
                          <Skeleton />
                        </TableCell>
                      })}
                    </TableRow>
                  }
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default CoinListTable