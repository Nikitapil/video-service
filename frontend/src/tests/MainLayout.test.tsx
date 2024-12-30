import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainLayout from '../layouts/main/MainLayout.tsx';
import { MockedProvider } from '@apollo/client/testing';

describe('MainLayout tests', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider
        mocks={[]}
        addTypename={false}
      >
        <MemoryRouter>
          <MainLayout />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
  });
});
