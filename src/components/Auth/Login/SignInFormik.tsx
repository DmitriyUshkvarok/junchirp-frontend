import { Form, Formik } from 'formik';
import { FormField } from '@/components/UI/CustomInput/CustomInput';
import { validationSchemaSignIn } from '../../../validation/validationSignIn';
import s from './signIn.module.scss';
import Button from '@/components/UI/Button/Button';
import Loader from '@/components/UI/Loader/Loader';
import useSignInFormik from '@/hooks/useSignInFormik';
import { CustomError } from '@/utils/types/customError';
import Error from '@/app/error';

const SignInFormik = () => {
  const {
    handleSubmit,
    togglePasswordVisibility,
    isLoading,
    showPassword,
    backendError,
    handleChange,
    error,
    isError,
  } = useSignInFormik();

  return (
    <>
      {isError && error && (
        <Error
          error={{
            status: (error as CustomError).status,
            data: (error as CustomError).data,
          }}
          reset={() => window.location.reload()}
        />
      )}
      <Formik
        initialValues={{ email: '', password: '', rememberMe: false }}
        onSubmit={handleSubmit}
        validationSchema={validationSchemaSignIn}
      >
        {({
          errors,
          touched,
          dirty,
          handleChange: formikHandleChange,
          isValid,
        }) => (
          <Form className={s.form}>
            <FormField
              name={'email'}
              label={'Email'}
              type={'email'}
              touched={touched}
              errors={errors}
              backendError={backendError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formikHandleChange(e);
                handleChange();
              }}
            />
            <FormField
              name={'password'}
              label={'Пароль'}
              type={'password'}
              touched={touched}
              errors={errors}
              backendError={backendError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formikHandleChange(e);
                handleChange();
              }}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              isThisPassword={true}
            />

            {backendError && (
              <div className={s.error__backend}>{backendError}</div>
            )}

            <Button
              className={`${s.styledBtn} ${
                isLoading || isValid
                  ? s.valid
                  : !touched.email ||
                      errors.email ||
                      !touched.password ||
                      errors.password
                    ? ''
                    : !touched.email ||
                        errors.email ||
                        !touched.password ||
                        errors.password ||
                        backendError
                      ? s.invalid
                      : s.valid
              }
                `}
              type="submit"
              isDisabled={!dirty || isLoading}
            >
              {isLoading ? (
                <>
                  Увійти
                  <Loader />
                </>
              ) : (
                'Увійти'
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default SignInFormik;
