import React, { ReactElement } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  customTooltip: {
    fontSize: 11,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8,
    padding: 8,
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
  | 'top-start';
  additionalStyles?: string;
}

const TooltipBasicLayout: React.FC<Props> = ({ children, title, placement, additionalStyles }) => {
  const classes = useStyles()

  return (
    <Tooltip title={title} placement={placement} classes={{ tooltip: `${classes.customTooltip} ${additionalStyles}` }}>
      {children}
    </Tooltip>
  )
}

export default TooltipBasicLayout
