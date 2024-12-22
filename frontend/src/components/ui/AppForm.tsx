import { FormHTMLAttributes } from 'react';

type AppFormProps = FormHTMLAttributes<HTMLFormElement>;

const AppForm = ({ onSubmit, children, ...restProps }: AppFormProps) => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form
      {...restProps}
      onSubmit={submitHandler}
      data-testid="app-form"
    >
      {children}
    </form>
  );
};

export default AppForm;
