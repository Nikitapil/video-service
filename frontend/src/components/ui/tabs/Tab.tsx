import { useMemo } from 'react';

export interface TabProps {
  text: string;
  isActive: boolean;
  clickHandler: () => void;
}

const Tab = ({ text, isActive, clickHandler }: TabProps) => {
  const className = useMemo(() => {
    const baseClasses = 'flex-1 pb-2 text-center text-lg font-semibold common-transition';
    const additionalClasses = isActive ? 'border-b border-b-black' : 'border-b text-gray-500';

    return `${baseClasses} ${additionalClasses}`;
  }, [isActive]);

  return (
    <button
      data-testid="tab"
      className={className}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

export default Tab;
