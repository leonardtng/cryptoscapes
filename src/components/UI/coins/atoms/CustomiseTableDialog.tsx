import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCoinList, addCoinListTableColumn, removeCoinListTableColumn } from '../../../../features/coinListSlice';
import { headCells } from './CoinListTableHeader';
import { Coin, CoinListTableHeadCell } from '../../../../models';
import { CloseRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  dialogPaper: {
    borderRadius: 12
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

interface Props {
  open: boolean;
  toggleClose: () => void;
}

const CustomiseTable: React.FC<Props> = ({ open, toggleClose }) => {
  const classes = useStyles();
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
    <Dialog classes={{ paper: classes.dialogPaper }} open={open} onBackdropClick={toggleClose}>
      <DialogTitle disableTypography>
        <Typography variant="h6">Customise Table</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={toggleClose}>
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add and remove metrics which you want to see in the table.
        </DialogContentText>
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
      </DialogContent>
    </Dialog>
  )
}

export default CustomiseTable
