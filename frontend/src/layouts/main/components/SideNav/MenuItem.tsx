import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  Icon: IconType;
  text: string;
  to: string;
  iconColor?: string;
}

const MenuItem = ({ Icon, text, iconColor, to }: MenuItemProps) => {
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
      </div>
    </Link>
  );
};

export default MenuItem;
