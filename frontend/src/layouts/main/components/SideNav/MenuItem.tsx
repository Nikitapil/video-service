import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  Icon: IconType;
  text: string;
  to: string;
  iconColor?: string;
  count?: number;
}

const MenuItem = ({ Icon, text, iconColor, to, count }: MenuItemProps) => {
  return (
    <Link
      to={to}
      className="flex w-full items-center rounded-md p-2.5 hover:bg-gray-100"
    >
      <div className="mx-auto flex items-center lg:mx-0">
        <Icon
          size="27"
          color={iconColor}
        />

        <span className="mt-0.5 hidden pl-2 text-lg font-semibold lg:block">{text}</span>

        {count !== undefined && (
          <span
            className="ml-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2.5 text-white"
            data-testid="menu-count"
          >
            {count}
          </span>
        )}
      </div>
    </Link>
  );
};

export default MenuItem;
