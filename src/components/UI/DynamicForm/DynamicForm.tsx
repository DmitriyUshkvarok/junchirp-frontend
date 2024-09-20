'use client';
import { Formik, Form } from 'formik';
import { DynamicFormProps } from './types';

const DynamicForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  enableReinitialize = false,
}: DynamicFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={enableReinitialize}
    >
      {(formikProps) => (
        <Form>
          {typeof children === 'function' ? children(formikProps) : children}
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
