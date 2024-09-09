import {useMutation} from "@apollo/client";
import {RegisterUserMutation, RegisterUserMutationVariables} from "../gql/graphql.ts";
import {REGISTER_USER} from "../graphql/mutations/Register.ts";
import {useUserStore} from "../stores/userStore.ts";
import {useGeneralStore} from "../stores/generalStore.ts";
import {ChangeEvent, useMemo, useState} from "react";
import {GraphQLErrorExtensions} from "graphql/error";
import AppInput from "./AppInput.tsx";

const Register = () => {
  const [errors, setErrors] = useState<GraphQLErrorExtensions>();
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    fullname: '',
    confirmPassword: ''
  });

  // TODO use loading and watch what is in the error
  const [registerFn] = useMutation<RegisterUserMutation, RegisterUserMutationVariables>(REGISTER_USER)

  const setUser = useUserStore(state => state.setUser)
  const setIsLoginOpen = useGeneralStore(state => state.setIsLoginOpen)

  const handleRegister = async () => {
    setErrors({})

    try {
      const {data} = await registerFn({
        variables: {
          ...registerData
        }
      })

      if (data?.register.user) {
        setUser({
          id: data?.register.user.id,
          email: data?.register.user.email,
          fullname: data?.register.user.fullname,
        })

        setIsLoginOpen(false)
      }
    } catch (err: any) {
     setErrors(err.graphQLErrors?.[0]?.extensions)
    }
  }

  const isSubmitDisabled = useMemo(() => {
    return !registerData.email || !registerData.fullname || !registerData.password || !registerData.confirmPassword
  }, [registerData])

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterData(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <>
      <div className="text-center text-[28px] mb-4 font-bold">
        Sign up
      </div>

      <div className="px-6 pb-2">
        <AppInput
          error={errors?.fullname as string || ''}
          max={64}
          placeholder="Full name"
          value={registerData.fullname}
          name="fullname"
          onChange={inputChangeHandler}
        />
      </div>

      <div className="px-6 pb-2">
        <AppInput
          error={errors?.email as string || ''}
          max={64}
          placeholder="Email"
          value={registerData.email}
          name="email"
          onChange={inputChangeHandler}
        />
      </div>

      <div className="px-6 pb-2">
        <AppInput
          error={errors?.password as string || ''}
          max={64}
          placeholder="Password"
          value={registerData.password}
          name="password"
          type="password"
          onChange={inputChangeHandler}
        />
      </div>

      <div className="px-6 pb-2">
        <AppInput
          error={errors?.confirmPassword as string || ''}
          max={64}
          placeholder="Confirm Password"
          value={registerData.confirmPassword}
          name="confirmPassword"
          type="password"
          onChange={inputChangeHandler}
        />
      </div>

      <div className="px-6 mt-6">
        <button
          className="w-full text-[17px] font-semibold text-white py-3 bg-black rounded-md hover:opacity-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isSubmitDisabled}
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </>
  );
};

export default Register;