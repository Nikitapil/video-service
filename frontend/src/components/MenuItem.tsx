import {IconType} from "react-icons";

interface MenuItemProps {
  Icon: IconType;
  color: string;
  size: string;
  text: string;
}

const MenuItem = ({Icon, color, size, text}: MenuItemProps) => {
  return (
    <div className="w-full flex items-center hover:bg-gray-100 p-2.5 rounded-md">
      <div className="flex item-center lg:mx-0 mx-auto">
        <Icon color={color} size={size} />
        <span className={`lg:block hidden pl-[9px] mt-0.5 font-semibold text-[17px] text-[${color}]`}>{text}</span>
      </div>
    </div>
  );
};

export default MenuItem;