import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import DialogLayout from '../../../templates/DialogLayout';
import { StatusUpdate } from '../../../../models';
import { convertIsoString } from '../../../../common/helpers';
import { Box, Button, Link } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    width: '100%',
    '& .MuiButton-root': {
      width: '100%'
    },
    '&:hover': {
      textDecoration: 'none'
    },
    '& .MuiSvgIcon-root': {
      marginLeft: 6,
      fontSize: '1em'
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
        <Box paddingTop={1} marginBottom={2} display="flex" justifyContent="center">
          <Link href={link} target="_blank" rel="noopener noreferrer" className={classes.link}>
            <Button variant="contained" color="primary">View <OpenInNew /></Button>
          </Link>
        </Box>
      }
    </DialogLayout>
  )
}

export default StatusUpdateDialog;
