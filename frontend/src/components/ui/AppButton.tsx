import { HTMLProps, ReactNode, useMemo } from 'react';
import { Link, To } from 'react-router-dom';

interface AppButtonProps extends HTMLProps<HTMLButtonElement> {
  text?: string;
  children?: ReactNode;
  to?: To;
}

const AppButton = ({ text = '', children, type, to, ...restProps }: AppButtonProps) => {
  const className = useMemo(() => {
    return 'rounded-md border px-3 py-1.5 hover:bg-gray-100 common-transition';
  }, []);

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
