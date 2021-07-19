import React, { useRef } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Fab, useScrollTrigger, Zoom } from '@material-ui/core';
import { KeyboardArrowUpRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  }
}));

interface Props {
  target: React.MutableRefObject<any | null>;
  top: React.MutableRefObject<any | null>;
  threshold: number;
}

const ScrollToTopButton: React.FC<Props> = ({ target, top, threshold, ...others }) => {
  const classes = useStyles();

  const trigger = useScrollTrigger({
    target: target.current ? target.current : undefined,
    threshold: threshold,
  });

  const scrollToTop = (event: React.MouseEvent<HTMLDivElement>) => {
    if (top.current) {
      top.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger} style={{ transitionDelay: trigger ? '500ms' : '0ms' }}>
      <div onClick={scrollToTop} className={classes.container}>
        <Fab {...others}>
          <KeyboardArrowUpRounded />
        </Fab>
      </div>
    </Zoom>
  )
}

interface ButtonProps {
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

interface UseScrollToTopResults {
  FloatingButton: React.FC<ButtonProps>;
  target: React.MutableRefObject<any | null>;
  top: React.MutableRefObject<any | null>;
}

export const useScrollToTop: (threshold?: number) => UseScrollToTopResults = (threshold: number = 30) => {
  const target = useRef<any | null>(null);
  const top = useRef<any | null>(null);

  return {
    FloatingButton: (props: ButtonProps) =>
      <ScrollToTopButton target={target} top={top} threshold={threshold} {...props} />,
    target: target,
    top: top
  }
}