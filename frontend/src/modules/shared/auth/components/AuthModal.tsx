import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import Modal from '../../../../components/ui/Modal.tsx';
import { useShowElement } from '../../../../hooks/useShowElement.ts';
import AppForm from '../../../../components/ui/AppForm.tsx';
import { GraphQLErrorExtensions } from 'graphql/error';
import { useLoginUserMutation, useRegisterUserMutation } from '../../../../gql/graphql.tsx';
import { useUserStore } from '../stores/userStore.ts';
import AppInput from '../../../../components/ui/inputs/AppInput.tsx';
import AppButton from '../../../../components/ui/AppButton.tsx';
import AppTextarea from '../../../../components/ui/inputs/AppTextarea.tsx';
import AvatarUploader from '../../components/AvatarUploader.tsx';
import { setAccessToken } from '../helpers.ts';

const AuthModal = () => {
  const setUser = useUserStore((state) => state.setUser);

  const authModalShowElement = useShowElement(true);

  const [errors, setErrors] = useState<GraphQLErrorExtensions>({});
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    fullname: '',
    confirmPassword: '',
    bio: ''
  });
  const [avatar, setAvatar] = useState<File | null>(null);

  const [registerFn, { loading }] = useRegisterUserMutation({
    variables: {
      ...authData,
      image: avatar
    }
  });

  const [loginFn] = useLoginUserMutation({
    variables: {
      email: authData.email,
      password: authData.password
    }
  });

  const modeOptions = useMemo(() => {
    return {
      title: isRegisterMode ? 'Sign up' : 'Sign in',
      changeModeText: isRegisterMode ? 'Already have an account?' : "Don't have an account?",
      changeModeButtonText: isRegisterMode ? 'Sign in' : 'Sign up',
      submitButtonText: isRegisterMode ? 'Sign up' : 'Sign in'
    };
  }, [isRegisterMode]);

  const isSubmitDisabled = useMemo(() => {
    const baseFieldsNotFilled = !authData.email || !authData.password;
    const registerDataNotFilled = !authData.fullname || !authData.confirmPassword;
    return baseFieldsNotFilled || (isRegisterMode && registerDataNotFilled);
  }, [authData.confirmPassword, authData.email, authData.fullname, authData.password, isRegisterMode]);

  const onChangeMode = useCallback(() => {
    setIsRegisterMode((prev) => !prev);
    setErrors({});
    setAuthData({
      email: '',
      password: '',
      fullname: '',
      confirmPassword: '',
      bio: ''
    });
  }, []);

  const handleRegister = useCallback(async () => {
    setErrors({});

    try {
      const { data } = await registerFn();

      if (data?.register.user) {
        setAccessToken(data.register.accessToken);
        setUser(data.register.user);
      }
    } catch (err: any) {
      setErrors(err.graphQLErrors?.[0]?.extensions);
    }
  }, [registerFn, setUser]);

  const handleLogin = useCallback(async () => {
    setErrors({});

    try {
      const { data } = await loginFn();

      if (data?.login.user) {
        setAccessToken(data.login.accessToken);
        setUser(data.login.user);
      }
    } catch (err: any) {
      setErrors(err.graphQLErrors?.[0]?.extensions);
    }
  }, [loginFn, setUser]);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAuthData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const submitHandler = useCallback(() => {
    if (isRegisterMode) {
      handleRegister();
    } else {
      handleLogin();
    }
  }, [handleLogin, handleRegister, isRegisterMode]);

  return (
    <Modal
      showElement={authModalShowElement}
      preventClose={true}
    >
      <div
        className="mb-4 text-center text-3xl font-bold"
        data-testid="auth-title"
      >
        {modeOptions.title}
      </div>

      <AppForm className="mb-3">
        <div className="mb-3">
          <AppInput
            id="email"
            error={(errors?.email as string) || ''}
            max={64}
            placeholder="Email"
            data-testid="email"
            value={authData.email}
            name="email"
            label="Email:"
            onChange={inputChangeHandler}
          />
        </div>

        <div className="mb-3">
          <AppInput
            id="password"
            data-testid="password"
            error={(errors?.password as string) || ''}
            max={64}
            placeholder="Password"
            label="Password:"
            value={authData.password}
            name="password"
            type="password"
            onChange={inputChangeHandler}
          />
        </div>

        {isRegisterMode && (
          <>
            <div className="mb-3">
              <AppInput
                id="confirmPassword"
                data-testid="confirmPassword"
                error={(errors?.confirmPassword as string) || ''}
                max={64}
                placeholder="Confirm Password"
                label="Confirm Password"
                value={authData.confirmPassword}
                name="confirmPassword"
                type="password"
                onChange={inputChangeHandler}
              />
            </div>

            <div className="mb-3">
              <AppInput
                id="fullname"
                data-testid="fullname"
                error={(errors?.fullname as string) || ''}
                max={64}
                placeholder="Full name"
                label="Full name:"
                value={authData.fullname}
                name="fullname"
                onChange={inputChangeHandler}
              />
            </div>

            <div className="mb-3">
              <AppTextarea
                id="bio"
                data-testid="bio"
                label="Bio"
                placeholder="Bio..."
                name="bio"
                cols={30}
                rows={2}
                maxLength={80}
                value={authData.bio}
                error={(errors?.bio as string) || ''}
                onChange={inputChangeHandler}
              ></AppTextarea>
            </div>

            <AvatarUploader
              initialImageSrc=""
              loading={loading}
              setAvatarFile={setAvatar}
            />
          </>
        )}

        <div className="ml-auto mt-2 w-fit">
          <AppButton
            disabled={isSubmitDisabled}
            appearance="danger"
            data-testid="submit-btn"
            onClick={submitHandler}
          >
            {modeOptions.submitButtonText}
          </AppButton>
        </div>
      </AppForm>

      <div className="flex w-full items-center justify-center border-t py-5">
        <span
          className="text-sm text-gray-600"
          data-testid="change-mode-text"
        >
          {modeOptions.changeModeText}
        </span>

        <button
          className="ml-2 rounded p-1 text-sm common-transition hover:bg-gray-100"
          data-testid="change-mode-btn"
          onClick={onChangeMode}
        >
          {modeOptions.changeModeButtonText}
        </button>
      </div>
    </Modal>
  );
};

export default AuthModal;
