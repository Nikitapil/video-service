import { IconType } from 'react-icons';
import { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: IconType;
  iconColor?: string;
}

const IconButton = ({ Icon, iconColor = 'black', ...restProps }: IconButtonProps) => {
  return (
    <button
      className="cursor-pointer rounded-full bg-gray-200 p-2 shadow-md common-transition hover:bg-gray-300 active:shadow-sm"
      {...restProps}
    >
      <Icon
        size="25"
        color={iconColor}
      />
    </button>
  );
};

export default IconButton;
