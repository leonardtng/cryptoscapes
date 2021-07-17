import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@material-ui/core';
import { StatusUpdate } from '../../../../models';
import { getTimeFromNow } from '../../../../common/helpers';

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
  },
  customTooltip: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 8,
    margin: '4px 0 0'
  },
  tooltipWrapper: {
    cursor: 'pointer'
  }
}));

interface Props {
  statusUpdate: StatusUpdate;
}

const StatusUpdateItem: React.FC<Props> = ({ statusUpdate }) => {
  const classes = useStyles();

  return (
    <ListItem>
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
        disableTypography
        className={classes.statusUpdateDescription}
        primary={
          <Tooltip
            interactive
            title={
              <Typography variant="body2" color="textSecondary">
                {statusUpdate.description}
              </Typography>
            }
            placement="bottom"
            classes={{ tooltip: classes.customTooltip }}
            className={classes.tooltipWrapper}
          >
            <Typography variant="subtitle2" noWrap>
              {statusUpdate.description}
            </Typography>
          </Tooltip>
        }
        secondary={
          <Typography variant="caption">
            {statusUpdate.project.name}
          </Typography>
        }
      />
    </ListItem>
  )
}

export default StatusUpdateItem
