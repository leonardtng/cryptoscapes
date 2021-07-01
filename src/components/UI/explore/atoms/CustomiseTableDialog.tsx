import React from 'react';
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCoinList, addCoinListTableColumn, removeCoinListTableColumn } from '../../../../features/coinListSlice';
import { HeadCell, headCells } from './CoinListTableHeader';
import { Coin } from '../../../../models';

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
    <Dialog open={open} onBackdropClick={() => toggleClose()}>
      <DialogTitle>Customise Table</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add and remove metrics which you want to see in the table.
        </DialogContentText>
        <List>
          {headCells
            .filter((headCell: HeadCell) => headCell.customisable)
            .map((headCell: HeadCell, index: number) => {
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
      </DialogContent>
    </Dialog>
  )
}

export default CustomiseTable
