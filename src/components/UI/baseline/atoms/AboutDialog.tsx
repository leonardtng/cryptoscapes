import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Link, Typography } from '@material-ui/core';
import { DashboardRounded, GitHub, OpenInNewRounded, WarningRounded } from '@material-ui/icons';
import DialogLayout from '../../../templates/DialogLayout';
import { version } from '../../../../../package.json';

const useStyles = makeStyles((theme: Theme) => ({
  warningIcon: {
    height: '0.6em',
    width: '0.6em',
    marginRight: 4,
    transform: 'translateY(3px)',
    fill: theme.palette.warning.main
  },
  link: {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      textDecoration: 'none'
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1em',
      marginLeft: 4,
      color: theme.palette.text.secondary
    }
  },
  linkButton: {
    width: '48%',
    display: 'flex',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      fontSize: '1.1em'
    }
  }
}));

interface Props {
  open: boolean;
  toggleClose: () => void;
}

const AboutDialog: React.FC<Props> = ({ open, toggleClose }) => {
  const classes = useStyles();

  return (
    <DialogLayout
      open={open}
      toggleClose={toggleClose}
      title="Cryptoscapes"
      subheader={`Version ${version}`}
      maxWidth="xs"
    >
      <Typography variant="body1">
        A Cryptocurrency Information Dashboard for the Casual Enthusiast!
      </Typography>
      <Box paddingTop={3} paddingBottom={3}>
        <Typography variant="body2" color="textSecondary" gutterBottom>Powered by the following sources:</Typography>
        <Box paddingLeft="8px">
          <Link href="https://www.coingecko.com/en" target='_blank' rel="noopener noreferrer" className={classes.link}>
            <Typography variant="body2" color="textSecondary">- CoinGecko</Typography>
            <OpenInNewRounded />
          </Link>
          <Link href="https://ethgasstation.info/" target='_blank' rel="noopener noreferrer" className={classes.link}>
            <Typography variant="body2" color="textSecondary">- ETH Gas Station</Typography>
            <OpenInNewRounded />
          </Link>
          <Link href="https://alternative.me/" target='_blank' rel="noopener noreferrer" className={classes.link}>
            <Typography variant="body2" color="textSecondary">- Alternative.me</Typography>
            <OpenInNewRounded />
          </Link>
          <Link href="https://www.blockchain.com/" target='_blank' rel="noopener noreferrer" className={classes.link}>
            <Typography variant="body2" color="textSecondary">- Blockchain.com</Typography>
            <OpenInNewRounded />
          </Link>
        </Box>
      </Box>
      <Typography variant="caption" color="textSecondary">
        <WarningRounded className={classes.warningIcon} />
        DANGER: Do not use this dashboard for trading or other financial activity that requires data with real-time
        latency! This dashboard can be slow to update due to API rate limitations, and Cryptoscapes will not be liable
        for any losses incurred.
      </Typography>
      <Box display="flex" justifyContent="space-between" paddingTop={3} paddingBottom={2}>
        <Button
          className={classes.linkButton}
          variant="contained"
          href='https://github.com/leonardtng/cryptoscapes'
          target='_blank'
          rel="noopener noreferrer"
          color="primary"
          aria-label='View project on GitHub'
          startIcon={<GitHub />}
        >
          View on GitHub
        </Button>
        <Button
          className={classes.linkButton}
          variant="contained"
          href='https://github.com/leonardtng/cryptoscapes/projects/1'
          target='_blank'
          rel="noopener noreferrer"
          color="secondary"
          aria-label='View project board'
          startIcon={<DashboardRounded />}
        >
          Project Board
        </Button>
      </Box>
    </DialogLayout>
  )
}

export default AboutDialog;
