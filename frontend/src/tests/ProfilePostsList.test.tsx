import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProfilePostsList from '../modules/profile/components/ProfilePostsList.tsx';
import { MemoryRouter } from 'react-router-dom';
import { mockedPost } from './__mocks__/mocks.ts';

describe('ProfilePostsList test', () => {
  it('renders loading', () => {
    render(
      <ProfilePostsList
        posts={[]}
        loading={true}
      />
    );

    expect(screen.getByTestId('posts-loading')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(
      <ProfilePostsList
        posts={[]}
        loading={false}
      />
    );

    expect(screen.getByTestId('empty-text')).toBeInTheDocument();
  });

  it('renders posts', () => {
    render(
      <MemoryRouter>
        <ProfilePostsList
          posts={[mockedPost, mockedPost]}
          loading={false}
        />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('post-profile')).toHaveLength(2);
  });
});
