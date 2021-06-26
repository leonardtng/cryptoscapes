import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Tooltip, Typography } from '@material-ui/core';
import { HelpOutlineRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      cursor: 'pointer',
      marginLeft: 6,
      height: 16,
      width: 16
    }
  },
  customTooltip: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 12,
    maxWidth: 260
  }
}));

interface Props {
  title: string;
  tooltipContent: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal;
}

const HelpIconHeader: React.FC<Props> = ({ title, tooltipContent }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.header} variant="body2" color="textSecondary">
      {title} 
      <Tooltip
        title={tooltipContent}
        classes={{
          tooltip: classes.customTooltip,
        }}
      >
        <HelpOutlineRounded />
      </Tooltip>
    </Typography>
  )
}

export default HelpIconHeader
