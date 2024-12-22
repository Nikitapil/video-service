import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../components/NotFoundPage.tsx';
import { MemoryRouter } from 'react-router-dom';

describe('NotFoundPage tests', () => {
  it('should render NotFoundPage with correct text', () => {
    const text = 'Not found.';
    render(
      <MemoryRouter>
        <NotFoundPage text={text} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found-text')).toHaveTextContent(text);
  });
});
