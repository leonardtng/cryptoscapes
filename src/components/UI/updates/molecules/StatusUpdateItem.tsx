import React, { useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { StatusUpdate } from '../../../../models';
import { getTimeFromNow } from '../../../../common/helpers';
import StatusUpdateDialog from '../atoms/StatusUpdateDialog';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  timeFromNow: {
    width: 42,
    textAlign: 'center',
  },
  listItemAvatar: {
    minWidth: 46,
    display: 'flex',
    justifyContent: 'center',
    marginRight: 8
  },
  avatarSmall: {
    height: theme.spacing(3),
    width: theme.spacing(3)
  },
  statusUpdateDescription: {
    width: 0,
    paddingRight: 8
  }
}));

interface Props {
  statusUpdate: StatusUpdate;
}

const StatusUpdateItem: React.FC<Props> = ({ statusUpdate }) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ListItem button onClick={() => setOpen(true)}>
        <Typography variant="body2" color="textSecondary" className={classes.timeFromNow}>
          {getTimeFromNow(statusUpdate.createdAt)}
        </Typography>
        <ListItemAvatar className={classes.listItemAvatar}>
          <Avatar
            src={statusUpdate.project.image.large}
            alt={statusUpdate.project.name}
            className={classes.avatarSmall}
          />
        </ListItemAvatar>
        <ListItemText
          className={classes.statusUpdateDescription}
          primary={statusUpdate.description}
          secondary={statusUpdate.project.name}
          primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
          secondaryTypographyProps={{ variant: 'caption' }}
        />
      </ListItem>
      <StatusUpdateDialog open={open} toggleClose={() => setOpen(false)} statusUpdate={statusUpdate} />
    </>
  )
}

export default StatusUpdateItem
