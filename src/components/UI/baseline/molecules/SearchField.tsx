import React, { useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchSupportedCoins, selectSupportedCoins } from '../../../../features/supportedCoinsSlice';
import { Coin, SupportedCoin } from '../../../../models';
import { CloseRounded, SearchRounded, TuneRounded } from '@material-ui/icons';
import { selectCoins } from '../../../../features/coinsSlice';
import SearchOptionsDialog from '../atoms/SearchOptionsDialog';

const useStyles = makeStyles((theme: Theme) => ({
  searchField: {
    paddingLeft: 32,
    '& .MuiTextField-root': {
      height: 46,
      margin: '8px 0',
      '& .MuiOutlinedInput-root': {
        height: '100%',
        borderRadius: 12,
        padding: '6px 16px',
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: 2
        }
      }
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0
    }
  },
  inputButton: {
    height: 38,
    width: 38,
    marginLeft: theme.spacing(3),
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down('sm')]: {
      height: 32,
      width: 32,
      marginLeft: theme.spacing(2),
    }
  },
  hoverPrimary: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    },
  },
  hoverSecondary: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    },
  }
}));

interface Props {
  mobile?: boolean;
  toggleMobileFunction?: () => void;
}

const SearchField: React.FC<Props> = ({ mobile = false, toggleMobileFunction }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const supportedCoins = useAppSelector(selectSupportedCoins);

  const [value, setValue] = useState<Coin | SupportedCoin | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [onlySearchTop, setOnlySearchTop] = useState<boolean>(true);

  const handleOnChange = (event: React.ChangeEvent<{}>, coinItem: any) => {
    if (mobile && toggleMobileFunction) toggleMobileFunction();
    if (coinItem) history.push(coinItem.id && `/coins/${coinItem.id}`);
    setValue(null); // This makes it possible to reselect the same value again if the input field is not cleared
  };

  useEffect(() => {
    if (supportedCoins.value.length === 0 && supportedCoins.status === 'IDLE' && !onlySearchTop) {
      dispatch(fetchSupportedCoins());
    }
  }, [dispatch, onlySearchTop, supportedCoins.status, supportedCoins.value.length]);

  return (
    <Box display="flex" alignItems="center">
      <Box width="400px">
        <Autocomplete
          freeSolo
          clearOnBlur
          clearOnEscape
          value={value}
          className={classes.searchField}
          options={onlySearchTop ? coins.value : supportedCoins.value}
          getOptionLabel={(coinItem: SupportedCoin | Coin) => coinItem.name || ''}
          onChange={handleOnChange}
          filterOptions={(coinList: SupportedCoin[] | Coin[], state) => coinList.filter(
            (coinItem: SupportedCoin | Coin) =>
              coinItem.symbol.includes(state.inputValue.toLowerCase()) ||
              coinItem.name.toLowerCase().includes(state.inputValue.toLowerCase()) ||
              coinItem.id.includes(state.inputValue.toLowerCase())
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder="Search"
              margin="normal"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                startAdornment:
                  <InputAdornment position="start">
                    <SearchRounded />
                  </InputAdornment>,
                ...(mobile && {
                  endAdornment:
                    <Box>
                      <IconButton
                        className={`${classes.inputButton} ${classes.hoverPrimary}`}
                        color="primary"
                        onClick={() => setOpen(true)}
                      >
                        <TuneRounded fontSize="small" />
                      </IconButton>
                      <IconButton
                        className={`${classes.inputButton} ${classes.hoverSecondary}`}
                        color="secondary"
                        onClick={toggleMobileFunction}
                      >
                        <CloseRounded fontSize="small" />
                      </IconButton>
                    </Box>
                })
              }}
            />
          )}
        />
      </Box>
      {!mobile &&
        <IconButton
          className={`${classes.inputButton} ${classes.hoverPrimary}`}
          color="primary"
          onClick={() => setOpen(true)}
        >
          <TuneRounded />
        </IconButton>
      }
      <SearchOptionsDialog
        open={open}
        toggleClose={() => setOpen(false)}
        checked={onlySearchTop}
        toggleChange={() => setOnlySearchTop(!onlySearchTop)}
      />
    </Box>
  )
}

export default SearchField;
