import { ButtonHTMLAttributes, ReactNode, useMemo } from 'react';
import { Link, To } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  children?: ReactNode;
  to?: To;
  appearance?: 'default' | 'danger';
  size?: 'md' | 'sm';
  isLoading?: boolean;
}

const AppButton = ({
  text = '',
  children,
  type,
  appearance = 'default',
  size = 'md',
  isLoading = false,
  to,
  ...restProps
}: AppButtonProps) => {
  const className = useMemo(() => {
    const appearanceClasses = {
      default: 'bg-transparent hover:bg-gray-100',
      danger: 'border-red-600 hover:bg-red-50 text-red-600'
    };

    const sizeClasses = {
      md: 'py-1.5',
      sm: 'py-0.5'
    };

    return `rounded-md border px-3 common-transition shadow-md active:shadow-sm ${appearanceClasses[appearance]} ${sizeClasses[size]}`;
  }, [appearance, size]);

  if (isLoading) {
    return (
      <div className={className}>
        <FaSpinner
          size="18"
          className="animate-spin"
        />
      </div>
    );
  }

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
