import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@material-ui/core';
import { Coin, CoinSortingKey, CoinSortingOrder } from '../../../../models';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoinList } from '../../../../features/coinListSlice';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiTableCell-stickyHeader': {
      backgroundColor: theme.palette.card.default
    }
  },
  stickyColumn: {
    zIndex: 3
  }
}));

export interface HeadCell {
  id: keyof Coin;
  label: string;
  numeric: boolean;
  customisable: boolean;
}

export const headCells: HeadCell[] = [
  { id: 'marketCapRank', numeric: false, label: '#', customisable: false },
  { id: 'name', numeric: false, label: 'Name', customisable: false },
  { id: 'currentPrice', numeric: true, label: 'Price', customisable: false  },
  { id: 'priceChangePercentage24HInCurrency', numeric: true, label: '24h %', customisable: true },
  { id: 'priceChangePercentage7DInCurrency', numeric: true, label: '7d %', customisable: true },
  { id: 'marketCap', numeric: true, label: 'Market Cap', customisable: true },
  { id: 'totalVolume', numeric: true, label: 'Volume (24h)', customisable: true },
  { id: 'circulatingSupply', numeric: true, label: 'Circulating Supply', customisable: true },
  { id: 'sparklineIn7D', numeric: true, label: 'Last 7 Days', customisable: true },
];

interface CoinListTableHeaderProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: CoinSortingKey) => void;
  order: CoinSortingOrder;
  orderBy: CoinSortingKey;
}

const CoinListTableHeader: React.FC<CoinListTableHeaderProps> = ({ order, orderBy, onRequestSort }) => {
  const classes = useStyles();
  const coinList = useAppSelector(selectCoinList);

  const idToSort: (property: keyof Coin) => CoinSortingKey = (property: keyof Coin) => {
    switch (property) {
      case 'marketCap':
        return 'market_cap'
      case 'totalVolume':
        return 'volume'
    }
    return 'market_cap'
  };

  const createSortHandler = (property: keyof Coin) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, idToSort(property));
  };

  const sortToId: (property: CoinSortingKey) => keyof Coin = (sortingKey: CoinSortingKey) => {
    switch (sortingKey) {
      case 'market_cap':
        return 'marketCap'
      case 'volume':
        return 'totalVolume'
    }
  };

  const sortingId = sortToId(orderBy);

  return (
    <TableHead className={classes.root}>
      <TableRow>
        {headCells
        .filter((headCell: HeadCell) => coinList.coinListTableColumns.includes(headCell.id) || !headCell.customisable)
        .map((headCell: HeadCell, index: number) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={sortingId === headCell.id ? order : false}
            className={index < 2 ? classes.stickyColumn : undefined}
            style={{ left: index === 0 ? 0 : index === 1 ? 67 : 'auto' }}
          >
            <TableSortLabel
              disabled={headCell.id !== 'marketCap' && headCell.id !== 'totalVolume'}
              active={sortingId === headCell.id}
              direction={sortingId === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="subtitle2" noWrap>
                {headCell.label}
              </Typography>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CoinListTableHeader