'use client';
import { useState } from 'react';
import { useLoginMutation } from '@/services/auth-and-user-services';
import useRouterPush from '@/hooks/useRouter';
import { customError } from '@/utils/types/customError';
import { FormValuesSignIn } from '@/components/Auth/Login/FormValuesSignIn';

const useSignInFormik = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const { pushRouter } = useRouterPush();

  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);

  const handleSubmit = async (
    values: FormValuesSignIn,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const { email, password } = values;

      const res = await login({ user: { email, password } }).unwrap();
      if (res) {
        resetForm();

        pushRouter('/');
      }
    } catch (error) {
      const status = (error as customError)?.status;
      let errorMessage = 'Неправильна електронна пошта або пароль';

      if (status === 401) {
        sessionStorage.setItem(
          'loginFormData',
          JSON.stringify({ email: values.email })
        );

        errorMessage =
          'Для завершення реєстрації підтвердіть свою електронну пошту';
        pushRouter('/confirm');
      } else if (status === 422) {
        errorMessage = 'Неправильна електронна пошта або пароль';
      }

      setBackendError(errorMessage);
    }
  };
  const handleChange = () => {
    setBackendError(null);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    handleSubmit,
    togglePasswordVisibility,
    isLoading,
    showPassword,
    backendError,
    handleChange,
    isError,
    error,
  };
};

export default useSignInFormik;
