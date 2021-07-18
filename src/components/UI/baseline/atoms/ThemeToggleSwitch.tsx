import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, IconButton, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectAppState, setDarkMode } from '../../../../features/appStateSlice';
import { NightsStayOutlined, WbSunnyOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  themeButton: {
    padding: 8
  }
}));

const ThemeToggleSwitch: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const appState = useAppSelector(selectAppState);

  return (
    <Box width="50%" display="flex" alignItems="center"  justifyContent="center">
      <IconButton
        onClick={() => dispatch(setDarkMode(false))}
        className={classes.themeButton}
        style={{ color: appState.darkMode ? `${theme.palette.text.secondary}80` : theme.palette.text.primary }}
      >
        <WbSunnyOutlined />
      </IconButton>
      <Typography variant="h6" component="span"><b>/</b></Typography>
      <IconButton
        onClick={() => dispatch(setDarkMode(true))}
        className={classes.themeButton}
        style={{ color: appState.darkMode ? theme.palette.text.primary : `${theme.palette.text.secondary}80` }}
      >
        <NightsStayOutlined />
      </IconButton>
    </Box>
  )
}

export default ThemeToggleSwitch
