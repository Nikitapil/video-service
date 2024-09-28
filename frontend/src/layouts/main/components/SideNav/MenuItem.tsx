import { IconType } from 'react-icons';

interface MenuItemProps {
  Icon: IconType;
  color: string;
  size: string;
  text: string;
}

const MenuItem = ({ Icon, color, size, text }: MenuItemProps) => {
  return (
    <div className="flex w-full items-center rounded-md p-2.5 hover:bg-gray-100">
      <div className="item-center mx-auto flex lg:mx-0">
        <Icon
          color={color}
          size={size}
        />
        <span className={`mt-0.5 hidden pl-[9px] text-[17px] font-semibold lg:block text-[${color}]`}>{text}</span>
      </div>
    </div>
  );
};

export default MenuItem;
