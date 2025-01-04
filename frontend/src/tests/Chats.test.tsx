import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import Chats from '../modules/messages/pages/Chats.tsx';

describe('Chats tests', () => {
  it('renders correctly chatlist with default state', () => {
    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <Chats />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByTestId('chats-page')).toBeInTheDocument();
  });
});
