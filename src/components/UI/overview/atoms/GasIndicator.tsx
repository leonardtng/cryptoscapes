import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  button: {
    display: 'block',
    height: 88,
    width: '100%',
    textAlign: 'center',
    backgroundColor: theme.palette.card.paper,
    padding: 12,
    borderRadius: 12,
    '& .MuiSkeleton-root': {
      margin: 'auto'
    },
    [theme.breakpoints.down('sm')]: {
      padding: 12,
      '& .MuiTypography-subtitle2': {
        fontSize: '0.75rem'
      },
      '& .MuiTypography-caption': {
        fontSize: '0.65rem'
      },
      '& .MuiTypography-body1': {
        fontSize: '0.8rem'
      }
    }
  },
  flexbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 12,
    '& .MuiSvgIcon-root': {
      height: 20,
      width: 20,
      color: (styleProps: StyleProps) => styleProps.color,
    },
  },
  headerContainer: {
    height: 30,
    margin: '0 2% 0 8%',
    textAlign: 'left',
    color: (styleProps: StyleProps) => styleProps.color,
    '& .MuiTypography-root': {
      lineHeight: 1.0
    }
  }
}));

interface StyleProps {
  color: string;
}

interface Props extends StyleProps {
  header: string;
  price: number;
  time: string;
  icon: JSX.Element;
  selected: boolean;
  onClick: () => void;
}

const GasIndicator: React.FC<Props> = ({ header, price, time, icon, color, selected, onClick }) => {
  const classes = useStyles({ color });

  return (
    <Button className={classes.button} onClick={onClick} variant={selected ? "outlined" : 'text'}>
      <Box className={classes.flexbox}>
        {icon}
        <Box className={classes.headerContainer}>
          <Typography variant="subtitle2" noWrap>{header}</Typography>
          <Typography variant="caption" noWrap>{time}</Typography>
        </Box>
      </Box>
      {price ? (
        <Typography variant="body1" noWrap>{price} Gwei</Typography>
      ) : (
        <Skeleton height={24} width="50%" />
      )}
    </Button>
  )
}

export default GasIndicator
