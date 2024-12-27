import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import MenuItem from '../layouts/main/components/SideNav/MenuItem.tsx';
import { IoMdMenu } from 'react-icons/io';
import { MemoryRouter } from 'react-router-dom';

describe('MenuItem tests', () => {
  it('renders correctly Menu item without menu count', () => {
    render(
      <MemoryRouter>
        <MenuItem
          Icon={IoMdMenu}
          text="text"
          to="/"
        />
      </MemoryRouter>
    );

    waitFor(() => expect(screen.queryByTestId('menu-count')).resolves.not.toBeInTheDocument());
  });

  it('renders correctly Menu item with menu count', () => {
    render(
      <MemoryRouter>
        <MenuItem
          Icon={IoMdMenu}
          text="text"
          to="/"
          count={1}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('menu-count')).toBeInTheDocument();
  });
});
