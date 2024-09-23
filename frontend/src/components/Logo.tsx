import logo from '../assets/images/logo.png';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={logo}
        alt="logo"
        className="w-7"
      />

      <span className="text-lg text-black">Video Service</span>
    </div>
  );
};

export default Logo;
