import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import { RefreshRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  updateDataButton: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.card.paper,
    borderRadius: 12,
    '&:hover': {
      backgroundColor: `${theme.palette.secondary.main}80`,
      color: theme.palette.text.primary
    }
  }
}));

const removeList = [
  'coins',
  'globalCoinData',
  'dominanceChart',
  'trendingCoins',
  'companies'
]

const UpdateDataButton: React.FC = () => {
  const classes = useStyles();

  const reloadDashboard = () => {
    removeList.forEach((item: string) => localStorage.removeItem(item));
    window.location.reload();
  }

  return (
    <Tooltip title="Update data">
      <IconButton
        className={classes.updateDataButton}
        onClick={reloadDashboard}
        color="secondary"
      >
        <RefreshRounded />
      </IconButton>
    </Tooltip>
  )
}

export default UpdateDataButton;
