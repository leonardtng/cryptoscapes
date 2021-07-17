import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';

const useStyles = makeStyles((theme: Theme) => ({
  dialogPaper: {
    borderRadius: 12
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  chip: {
    margin: '0 8px 8px 0'
  }
}));

interface Props {
  open: boolean;
  toggleClose: () => void;
  handleClickCategory: (category: string) => void;
}

const CoinCategoriesDialog: React.FC<Props> = ({ open, toggleClose, handleClickCategory }) => {
  const classes = useStyles();

  const coinDetails = useAppSelector(selectCoinDetails);

  return (
    <Dialog classes={{ paper: classes.dialogPaper }} open={open} onBackdropClick={toggleClose} maxWidth="xs">
      <DialogTitle disableTypography>
        <Typography variant="h6">Categories</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={toggleClose}>
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {coinDetails.value &&
          <>
            {coinDetails.value.categories.map((category: string) => (
              <Chip
                key={category}
                className={classes.chip}
                label={category}
                color="primary"
                clickable
                onClick={() => handleClickCategory(category)}
              />
            ))}
          </>
        }
      </DialogContent>
    </Dialog>
  )
}

export default CoinCategoriesDialog
