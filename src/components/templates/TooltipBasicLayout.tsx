import React, { ReactElement } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  customTooltip: {
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8,
    padding: 8
  },
  contentWrapper: {
    cursor: 'pointer'
  },
  currencyIcon: {
    marginRight: 8
  }
}));

interface Props {
  children: ReactElement<any, any>;
  title: string;
  placement?: 
  'top' 
  | 'bottom' 
  | 'bottom-end' 
  | 'bottom-start' 
  | 'left-end' 
  | 'left-start' 
  | 'left' 
  | 'right-end' 
  | 'right-start' 
  | 'right' 
  | 'top-end' 
  | 'top-start'
}

const TooltipBasicLayout: React.FC<Props> = ({ children, title, placement }) => {
  const classes = useStyles()

  return (
    <Tooltip title={title} placement={placement} classes={{ tooltip: classes.customTooltip }}>
      {children}
    </Tooltip>
  )
}

export default TooltipBasicLayout
