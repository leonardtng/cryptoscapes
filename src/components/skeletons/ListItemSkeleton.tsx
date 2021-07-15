import React, { Fragment } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Divider, ListItem } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  listItemSkeleton: {
    height: (styleProps: StyleProps) => styleProps.height,
    '& .MuiSkeleton-circle': {
      margin: '0 20px'
    }
  },
  listTextSkeleton: {
    width: (styleProps: StyleProps) => `calc(100% - 40px - ${styleProps.iconDimensions}px)`,
    '& .MuiSkeleton-text:first-child': {
      marginBottom: 6
    }
  }
}));

interface StyleProps {
  height: number;
  iconDimensions: number;
}

interface Props extends StyleProps {
  count: number;
}

const ListItemSkeleton: React.FC<Props> = ({ count, height, iconDimensions }) => {
  const classes = useStyles({ height, iconDimensions });

  return (
    <>
      {Array.from(Array(count).keys()).map((index: number) =>
        <Fragment key={index}>
          <ListItem className={classes.listItemSkeleton} disableGutters>
            <Skeleton variant="circle" height={iconDimensions} width={iconDimensions} />
            <div className={classes.listTextSkeleton}>
              <Skeleton height={12} width="80%" />
              <Skeleton height={12} width="40%" />
            </div>
          </ListItem>
          {index < (count - 1) && <Divider />}
        </Fragment>
      )}
    </>

  )
}

export default ListItemSkeleton
