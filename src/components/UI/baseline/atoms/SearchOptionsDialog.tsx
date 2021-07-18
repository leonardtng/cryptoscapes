import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Switch } from '@material-ui/core';
import { WarningRounded } from '@material-ui/icons';
import DialogLayout from '../../../templates/DialogLayout';

const useStyles = makeStyles((theme: Theme) => ({
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
    <DialogLayout
      open={open}
      toggleClose={toggleClose}
      title="Search Options"
      contentText={
        <>
          <WarningRounded className={classes.warningIcon} />
          Disabling some of these options may result in performance issues.
        </>
      }
      maxWidth="xs"
    >
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
    </DialogLayout>
  )
}

export default SearchOptionsDialog;
