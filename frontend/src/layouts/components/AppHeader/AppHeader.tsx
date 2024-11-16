import { useUserStore } from '../../../modules/shared/auth/stores/userStore.ts';
import { Link } from 'react-router-dom';
import { AiOutlineUpload } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { GrLogout } from 'react-icons/gr';
import UserAvatar from '../../../modules/shared/components/UserAvatar.tsx';
import Logo from '../../../components/Logo.tsx';
import AppButton from '../../../components/ui/AppButton.tsx';
import { getProfileLink, RoutesEnum } from '../../../router/routes.ts';
import { useClickOutside } from '../../../hooks/useClickOutside.ts';
import styles from './styles.module.scss';
import SearchUsersForm from './SearchUsersForm.tsx';
import { useShowElement } from '../../../hooks/useShowElement.ts';
import ConfirmModal from '../../../components/ux/ConfirmModal.tsx';
import { useLogoutUserMutation } from '../../../gql/graphql.tsx';

const AppHeader = () => {
  const menu = useShowElement();
  const logoutModal = useShowElement();

  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const setIsAuthLoading = useUserStore((state) => state.setIsAuthLoading);

  const { ref: menuRef } = useClickOutside<HTMLDivElement>(() => menu.close());

  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    setIsAuthLoading(true);
    await logoutUser();
    logout();
    setIsAuthLoading(false);
  };

  if (!user) {
    return null;
  }

  return (
    <header className="fixed z-30 flex h-16 w-full items-center border-b bg-white">
      <div className="container mx-auto flex w-full items-center justify-between gap-4 px-6">
        <Link to={RoutesEnum.HOME}>
          <Logo textClassName="hidden md:block" />
        </Link>

        <div className="mx-auto">
          <SearchUsersForm />
        </div>

        <div className="flex items-center justify-end gap-3">
          <AppButton to={RoutesEnum.UPLOAD}>
            <div className="flex items-center">
              <AiOutlineUpload className={styles['menu-icon']} />
              <span className="hidden px-2 font-medium sm:block">Upload</span>
            </div>
          </AppButton>

          <div
            ref={menuRef}
            className="relative"
          >
            <button
              className="mt-1"
              onClick={() => menu.open()}
            >
              <UserAvatar image={user.image} />
            </button>

            {menu.isShowed && (
              <div className="absolute right-0 top-11 w-52 rounded-lg border bg-white shadow-xl">
                <Link
                  to={getProfileLink(user.id)}
                  className={styles['menu-item']}
                >
                  <BsFillPersonFill className={styles['menu-icon']} />
                  <span>Profile</span>
                </Link>

                <button
                  className={styles['menu-item']}
                  onClick={logoutModal.open}
                >
                  <GrLogout className={styles['menu-icon']} />
                  <span>Log out</span>
                </button>
              </div>
            )}

            <ConfirmModal
              showElement={logoutModal}
              title="Confirm leave your account"
              onConfirm={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
