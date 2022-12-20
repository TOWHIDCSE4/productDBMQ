import { ErrorMessage } from "@hookform/error-message";
import { FormProvider, useForm } from "react-hook-form";
import { DynamicFieldData } from "./dynamic-control-types";
import { DynamicControl } from "./DynamicControl";
import { Button, Input, Select } from 'antd';

interface FormProps {
  fields: DynamicFieldData[];
}

export const Form = ({ fields }: FormProps) => {
  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting, errors }
  } = formMethods;

  function onSubmit(data, error) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...formMethods}>
        {fields.map((d, i) => (
          <div key={i} style={{marginBottom: '10px'}}>
            <label style={{marginLeft: "2px", fontSize: "15px", color: 'GrayText'}} htmlFor={d.fieldName}>{d.label}</label>
            <br />
            <DynamicControl {...d} />

            <ErrorMessage errors={errors} name={d.fieldName} />
          </div>
        ))}
      </FormProvider>

      <button type="submit" style={{marginTop: 13}} disabled={isSubmitting}>
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
    </form>
  );
};
