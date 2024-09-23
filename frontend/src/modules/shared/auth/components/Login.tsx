import { useMutation } from '@apollo/client';
import { LoginUserMutation, LoginUserMutationVariables } from '../../../../gql/graphql.ts';
import { useUserStore } from '../stores/userStore.ts';
import { useGeneralStore } from '../../stores/generalStore.ts';
import { ChangeEvent, useMemo, useState } from 'react';
import { GraphQLErrorExtensions } from 'graphql/error';
import AppInput from '../../../../components/ui/AppInput.tsx';
import { LOGIN_USER } from '../mutations/Login.ts';

const Login = () => {
  const [errors, setErrors] = useState<GraphQLErrorExtensions>();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // TODO use loading and watch what is in the error
  const [loginFn] = useMutation<LoginUserMutation, LoginUserMutationVariables>(LOGIN_USER);

  const setUser = useUserStore((state) => state.setUser);
  const setIsLoginOpen = useGeneralStore((state) => state.setIsLoginOpen);

  const handleLogin = async () => {
    setErrors({});

    try {
      const { data } = await loginFn({
        variables: {
          ...loginData
        }
      });

      if (data?.login.user) {
        setUser(data.login.user);

        setIsLoginOpen(false);
      }
    } catch (err: any) {
      setErrors(err.graphQLErrors?.[0]?.extensions);
    }
  };

  const isSubmitDisabled = useMemo(() => {
    return !loginData.email || !loginData.password;
  }, [loginData]);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <>
      <div className="text-center text-[28px] mb-4 font-bold">Sign in</div>

      <div className="px-6 pb-2">
        <AppInput
          error={(errors?.email as string) || ''}
          max={64}
          placeholder="Email"
          value={loginData.email}
          name="email"
          onChange={inputChangeHandler}
        />
      </div>

      <div className="px-6 pb-2">
        <AppInput
          error={(errors?.password as string) || ''}
          max={64}
          placeholder="Password"
          value={loginData.password}
          name="password"
          type="password"
          onChange={inputChangeHandler}
        />
      </div>

      {errors?.invalidCredentials && (
        <div className="text-red-600 text-center text-xl ">{errors.invalidCredentials as string}</div>
      )}

      <div className="px-6 mt-6">
        <button
          className="w-full text-[17px] font-semibold text-white py-3 bg-black rounded-md hover:opacity-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isSubmitDisabled}
          onClick={handleLogin}
        >
          Log in
        </button>
      </div>
    </>
  );
};

export default Login;
