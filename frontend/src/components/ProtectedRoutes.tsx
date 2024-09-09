import {ReactNode, useEffect} from "react";
import {useUserStore} from "../stores/userStore.ts";
import {useNavigate} from "react-router-dom";
import {useGeneralStore} from "../stores/generalStore.ts";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const user = useUserStore(state => state)
  const navigate = useNavigate();
  const setLoginIsOpen = useGeneralStore(state => state.setIsLoginOpen)

  useEffect(() => {
    console.log(user)
    if (!user.id) {
      navigate("/");
      setLoginIsOpen(true)
    }
  }, [user.id, navigate, setLoginIsOpen]);

  if (!user.id) {
    return (
      <div>No Access</div>
    )
  }

  return (
    <>
      { children }
    </>
  );
};

export default ProtectedRoutes;