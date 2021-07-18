import React from 'react';
import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCoinList, addCoinListTableColumn, removeCoinListTableColumn } from '../../../../features/coinListSlice';
import { headCells } from './CoinListTableHeader';
import { Coin, CoinListTableHeadCell } from '../../../../models';
import DialogLayout from '../../../templates/DialogLayout';

interface Props {
  open: boolean;
  toggleClose: () => void;
}

const CustomiseTable: React.FC<Props> = ({ open, toggleClose }) => {
  const dispatch = useAppDispatch();

  const coinList = useAppSelector(selectCoinList);

  const handleToggle = (value: keyof Coin) => {
    if (coinList.coinListTableColumns.includes(value)) {
      dispatch(removeCoinListTableColumn(value));
    } else {
      dispatch(addCoinListTableColumn(value));
    }
  }

  return (
    <DialogLayout
      open={open}
      toggleClose={toggleClose}
      title="Customise Table"
      contentText="Add and remove metrics which you want to see in the table."
    >
      <List>
        {headCells
          .filter((headCell: CoinListTableHeadCell) => headCell.customisable)
          .map((headCell: CoinListTableHeadCell, index: number) => {
            return <ListItem key={index} dense button onClick={() => handleToggle(headCell.id)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={coinList.coinListTableColumns.includes(headCell.id)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText id={headCell.id} primary={headCell.label} />
            </ListItem>
          })}
      </List>
    </DialogLayout>
  )
}

export default CustomiseTable
