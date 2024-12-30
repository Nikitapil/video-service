import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import UploadLayout from '../layouts/UploadLayout.tsx';

describe('Upload tests', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider
        mocks={[]}
        addTypename={false}
      >
        <MemoryRouter>
          <UploadLayout>
            <div data-testid="children"></div>
          </UploadLayout>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByTestId('children')).toBeInTheDocument();
  });
});
