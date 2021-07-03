import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Dialog,
DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  Typography
} from '@material-ui/core';
import { CloseRounded, WarningRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  toggleSwitch: {
    width: '100%',
    justifyContent: 'space-between',
    marginLeft: 0,
    padding: '12px 0 24px'
  },
  warningIcon: {
    height: '0.8em',
    width: '0.8em',
    marginRight: 8,
    transform: 'translateY(3px)',
    fill: theme.palette.warning.main
  }
}));

interface Props {
  open: boolean;
  toggleClose: () => void;
  checked: boolean;
  toggleChange: () => void;
}

const SearchOptionsDialog: React.FC<Props> = ({ open, toggleClose, checked, toggleChange }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onBackdropClick={toggleClose} maxWidth="xs">
      <DialogTitle disableTypography>
        <Typography variant="h6">Search Options</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={toggleClose}>
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <WarningRounded className={classes.warningIcon} />
          Disabling some of these options may result in performance issues.
        </DialogContentText>
        <FormControlLabel
          className={classes.toggleSwitch}
          control={
            <Switch
              checked={checked}
              onChange={toggleChange}
              color="primary"
            />
          }
          label="Search only top 250 coins"
          labelPlacement="start"
        />
      </DialogContent>
    </Dialog>
  )
}

export default SearchOptionsDialog;
