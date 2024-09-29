import { HTMLProps, ReactNode, useMemo } from 'react';
import { Link, To } from 'react-router-dom';

interface AppButtonProps extends HTMLProps<HTMLButtonElement> {
  text?: string;
  children?: ReactNode;
  to?: To;
  appearance?: 'default' | 'danger';
}

const AppButton = ({ text = '', children, type, appearance = 'default', to, ...restProps }: AppButtonProps) => {
  const className = useMemo(() => {
    const classes = {
      default: 'bg-transparent hover:bg-gray-100',
      danger: 'border-red-600 hover:bg-red-100 text-red-600'
    };
    return `rounded-md border px-3 py-1.5 common-transition ${classes[appearance]}`;
  }, [appearance]);

  if (to) {
    return (
      <Link
        to={to}
        className={className}
      >
        {children ? children : text}
      </Link>
    );
  }

  return (
    <button
      className={className}
      {...restProps}
    >
      {children ? children : text}
    </button>
  );
};

export default AppButton;
