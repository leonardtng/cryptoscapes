import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from '@material-ui/core';
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
  title: string;
  subheader?: string;
  contentText?: JSX.Element | string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const DialogLayout: React.FC<Props> = (
  {
    children,
    open,
    toggleClose,
    title,
    subheader,
    contentText,
    maxWidth = 'sm',
    ...other
  }
) => {
  const classes = useStyles();

  return (
    <Dialog classes={{ paper: classes.dialogPaper }} open={open} onBackdropClick={toggleClose} maxWidth={maxWidth}>
      <DialogTitle disableTypography>
        <Typography variant="h6">{title}</Typography>
        {subheader &&
          <Typography variant="caption" color="textSecondary">{subheader}</Typography>
        }
        <IconButton aria-label="close" className={classes.closeButton} onClick={toggleClose}>
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <DialogContent {...other}>
        {contentText &&
          <DialogContentText>
            {contentText}
          </DialogContentText>
        }
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default DialogLayout
