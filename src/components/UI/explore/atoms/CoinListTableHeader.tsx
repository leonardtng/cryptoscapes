import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@material-ui/core';
import { Coin, CoinSortingKey, CoinSortingOrder } from '../../../../models';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTableCell-stickyHeader': {
        backgroundColor: theme.palette.card.default
      }
    }
  }),
);

interface HeadCell {
  id: keyof Coin;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'marketCapRank', numeric: false, label: '#' },
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'currentPrice', numeric: true, label: 'Price' },
  { id: 'priceChangePercentage24HInCurrency', numeric: true, label: '24h %' },
  { id: 'priceChangePercentage7DInCurrency', numeric: true, label: '7d %' },
  { id: 'marketCap', numeric: true, label: 'Market Cap' },
  { id: 'totalVolume', numeric: true, label: 'Volume (24h)' },
  { id: 'sparklineIn7D', numeric: true, label: 'Last 7 Days' },
];

interface CoinListTableHeaderProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: CoinSortingKey) => void;
  order: CoinSortingOrder;
  orderBy: CoinSortingKey;
}

const CoinListTableHeader: React.FC<CoinListTableHeaderProps> = ({ order, orderBy, onRequestSort }) => {
  const classes = useStyles();

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
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={sortingId === headCell.id ? order : false}
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