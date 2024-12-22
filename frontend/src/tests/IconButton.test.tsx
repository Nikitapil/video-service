import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import IconButton from '../components/ui/IconButton';
import { MdImage } from 'react-icons/md';

describe('IconButton tests', () => {
  it('renders the button with the provided Icon', () => {
    render(<IconButton Icon={MdImage} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.querySelector('svg')).toBeInTheDocument();
  });

  it('applies the default iconColor when not provided', () => {
    render(<IconButton Icon={MdImage} />);
    const iconElement = screen.getByRole('button').querySelector('svg');
    expect(iconElement).toHaveAttribute('color', 'black');
  });

  it('applies the provided iconColor', () => {
    render(
      <IconButton
        Icon={MdImage}
        iconColor="red"
      />
    );
    const iconElement = screen.getByRole('button').querySelector('svg');
    expect(iconElement).toHaveAttribute('color', 'red');
  });

  it('passes the restProps to the button element', () => {
    render(
      <IconButton
        Icon={MdImage}
        title="Click me"
      />
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('title', 'Click me');
  });

  it('triggers the onClick event when clicked', () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        Icon={MdImage}
        onClick={handleClick}
      />
    );
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
