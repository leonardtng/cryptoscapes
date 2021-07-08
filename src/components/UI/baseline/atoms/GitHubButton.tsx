import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  githubButton: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.card.paper,
    borderRadius: 12,
    '&:hover': {
      backgroundColor: `${theme.palette.text.secondary}80`
    }
  }
}));

const GitHubButton: React.FC = () => {
  const classes = useStyles();

  return (
    <Tooltip title="View project on GitHub">
      <IconButton
        className={classes.githubButton}
        href='https://github.com/leonardtng/'
        target='_blank'
        rel="noopener noreferrer"
        aria-label='View on GitHub'
      >
        <GitHub />
      </IconButton>
    </Tooltip>
  )
}

export default GitHubButton;
