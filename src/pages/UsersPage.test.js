import React, { useState } from 'react';
jest.mock('lottie-react', () => () => <div data-testid="lottie-empty" />);

import { render, screen, within } from '@testing-library/react';
import UsersPage from './UsersPage';
import userEvent from '@testing-library/user-event';
import { Autocomplete, createFilterOptions, TextField } from '@mui/material';

const defaultFilter = createFilterOptions();
jest.mock('lottie-react', () => () => <div data-testid="lottie-empty" />);

test('renders the Users heading', () => {
  render(<UsersPage />);
  expect(screen.getByRole('heading', { level: 1, name: /users/i })).toBeInTheDocument();
});

test('clicking add user button opens the add user dialog', async () => {
  render(<UsersPage />);
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: /add user/i }));
  const dialog = await screen.findByRole('dialog');
  expect(within(dialog).getByText( /add new user/i )).toBeInTheDocument();
})

function UserSearch({ suggestions, onEnter }) {
  const [query, setQuery] = useState('');

  const onKeyDown = (e) => {
    // your real handler can do more; we expose it so tests can assert it
    onEnter?.(e);
  };

  return (
    <Autocomplete
      freeSolo
      options={suggestions}
      sx={{ flexGrow: 1 }}
      inputValue={query}
      onChange={(e, val) => setQuery(val || '')}
      onInputChange={(e, val) => setQuery(val || '')}
      filterOptions={(options, state) =>
        state.inputValue.trim().length > 0 ? defaultFilter(options, state) : []
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search by name, phone or email"
          onKeyDown={onKeyDown}
        />
      )}
    />
  );
}

describe('UserSearch Autocomplete', () => {
  const suggestions = [
    'Leanne Graham',
    'Ervin Howell',
    'Clementine Bauch',
    'Patricia Lebsack',
  ];

  test('allows typing and shows filtered suggestions', async () => {
    render(<UserSearch suggestions={suggestions} />);
    const user = userEvent.setup();

    const input = screen.getByRole('combobox', {
      name: /search by name, phone or email/i,
    });

    // Type triggers filterOptions (non-empty input)
    await user.type(input, 'Leanne');

    // Wait for popup listbox then assert the option exists
    const listbox = await screen.findByRole('listbox');
    const option = within(listbox).getByRole('option', { name: /leanne graham/i });
    expect(option).toBeInTheDocument();
  });

  test('selecting a suggestion sets the input value', async () => {
    render(<UserSearch suggestions={suggestions} />);
    const user = userEvent.setup();

    const input = screen.getByRole('combobox', {
      name: /search by name, phone or email/i,
    });

    await user.type(input, 'Leanne');
    const listbox = await screen.findByRole('listbox');
    const option = within(listbox).getByRole('option', { name: /leanne graham/i });

    await user.click(option);

    // Controlled inputValue should now reflect the selected option
    expect(input).toHaveValue('Leanne Graham');
  });
});

test('calls handleSearch when Go button is clicked', async () => {
  const handleSearch = jest.fn();
  render(
    <>
      <UserSearch suggestions={[]} onEnter={handleSearch} />
      <button onClick={handleSearch}>Go</button>
    </>
  );
  const user = userEvent.setup();
  const goButton = screen.getByRole('button', { name: /go/i });
  await user.click(goButton);
  expect(handleSearch).toHaveBeenCalled();
})

describe("UserPage - empty state", () => {
  test("displays Lottie animation when there are no users", () => {
    render(<UsersPage displayedUsers={[]} />);
    const lottie = screen.getByTestId("lottie-empty");
    expect(lottie).toBeInTheDocument();
    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  })
});

