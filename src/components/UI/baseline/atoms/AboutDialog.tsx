import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Link, Typography } from '@material-ui/core';
import { DashboardRounded, GitHub, OpenInNewRounded } from '@material-ui/icons';
import DialogLayout from '../../../templates/DialogLayout';
import { version } from '../../../../../package.json';

const useStyles = makeStyles((theme: Theme) => ({
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
        A Cryptocurrency Information Dashboard for the Casual Crypto Enthusiast
      </Typography>
      <Box paddingTop="22px" paddingBottom="22px">
        <Typography variant="body2" color="textSecondary" gutterBottom>Powered by the following sources:</Typography>
        <Box paddingLeft="8px">
          <Link href="https://www.coingecko.com/en" target='_blank' rel="noopener noreferrer" className={classes.link}>
            <Typography variant="body2" color="textSecondary">- CoinGecko</Typography>
            <OpenInNewRounded />
          </Link>
          <Link href="https://www.gasnow.org/" target='_blank' rel="noopener noreferrer" className={classes.link}>
            <Typography variant="body2" color="textSecondary">- GasNow</Typography>
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
      <Box display="flex" justifyContent="space-between" paddingBottom={2}>
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
