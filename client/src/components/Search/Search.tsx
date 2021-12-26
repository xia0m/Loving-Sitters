import { ChangeEvent, useState, useEffect, SyntheticEvent } from 'react';
import useStyles from './useStyles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Autocomplete from '@mui/material/Autocomplete';
import { User } from '../../interface/User';
import { useDebounce } from 'use-debounce';
import { searchUsers } from '../../helpers/APICalls/searchUsers';

interface Props {
  search: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>, newInputValue: string) => void;
}
const Search = ({ search, handleChange }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  // limit our call to the api with a debounced value at max of 1 per 0.5 seconds
  const [debouncedSearch] = useDebounce(search, 500);

  const classes = useStyles();

  const saveOptions = (users: User[]) => {
    setOptions(users);
  };

  useEffect(() => {
    let active = true;

    // eslint-disable-next-line
    async function searchAndSaveUsers() {
      // send request to backend API to get users limited to 20.
      setLoading(true);
      const response = await searchUsers({
        search: debouncedSearch,
      });

      if (active && response && response.users) {
        saveOptions(response.users);
      }
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [debouncedSearch]);

  // creates a combobox search which is dynamically updated with call's to the API
  return (
    <form
      onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
      }}
    >
      <Autocomplete
        id="asynchronous-search"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.email === value.email}
        getOptionLabel={(option) => option.email}
        options={options}
        loading={loading}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onInputChange={handleChange}
        inputValue={search}
        noOptionsText="No Users Found"
        freeSolo
        renderInput={(params) => (
          <div className={classes.search}>
            <InputBase />
          </div>
        )}
      />
    </form>
  );
};

export default Search;
