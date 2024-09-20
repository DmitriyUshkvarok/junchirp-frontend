import { FormikProps } from 'formik';

export interface DynamicFormProps {
  initialValues: any;
  validationSchema?: any;
  onSubmit: (values: any) => void;
  children:
    | React.ReactNode
    | ((formikProps: FormikProps<any>) => React.ReactNode);
  enableReinitialize?: boolean;
}
