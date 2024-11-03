import { Link } from 'react-router-dom';
import { RoutesEnum } from '../router/routes.ts';

const NotFoundPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-black">
      <h2 className="text-3xl text-white">Post not found</h2>
      <Link
        className="block text-white common-transition hover:text-gray-400"
        to={RoutesEnum.HOME}
      >
        Go back to home page
      </Link>
    </div>
  );
};

export default NotFoundPage;