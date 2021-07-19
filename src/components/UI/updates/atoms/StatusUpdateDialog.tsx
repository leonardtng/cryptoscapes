import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import DialogLayout from '../../../templates/DialogLayout';
import { StatusUpdate } from '../../../../models';
import { convertIsoString } from '../../../../common/helpers';
import { Box, Button } from '@material-ui/core';
import { OpenInNewRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  linkButton: {
    width: '100%',
    '& .MuiSvgIcon-root': {
      fontSize: '1.1em'
    }
  }
}));

interface Props {
  open: boolean;
  toggleClose: () => void;
  statusUpdate: StatusUpdate;
}

const StatusUpdateDialog: React.FC<Props> = ({ open, toggleClose, statusUpdate }) => {
  const classes = useStyles();

  const link = /(https?:\/\/[^ ]*)/.exec(statusUpdate.description) === null ?
    '' : /(https?:\/\/[^ ]*)/.exec(statusUpdate.description)![1];

  return (
    <DialogLayout
      open={open}
      toggleClose={toggleClose}
      title={statusUpdate.project.name}
      subheader={convertIsoString(statusUpdate.createdAt)}
      contentText={statusUpdate.description}
      maxWidth="xs"
    >
      {statusUpdate.description.includes('https://') &&
        <Box paddingTop={1} paddingBottom={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            className={classes.linkButton}
            endIcon={<OpenInNewRounded />}
          >
            View
          </Button>
        </Box>
      }
    </DialogLayout>
  )
}

export default StatusUpdateDialog;
