import logo from '../assets/images/logo.png';

interface LogoProps {
  textClassName?: string;
}

const Logo = ({ textClassName = '' }: LogoProps) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={logo}
        alt="logo"
        className="w-7"
      />

      <span
        className={`text-lg text-black ${textClassName}`}
        data-testid="logo-text"
      >
        Video Service
      </span>
    </div>
  );
};

export default Logo;
