import { Field, Form, Formik } from "formik";
import React from "react";
import { object, string } from "yup";
import CustomInput from "../CustomInput/CustomInput";
import Input from "../Input/Input";

const CustomFormikInput = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        password: "",
        email: "",
        address: "",
      }}
      validationSchema={object({
        name: string().required().min(2),
        password: string().required().min(2),
        email: string().email().required().min(2),
        address: string().required().min(5),
      })}
      onSubmit={(values) => console.log(values)}>
      {({ values, errors }) => (
        <Form>
          <Field name="name" />
          <Field component={CustomInput} label="Password" name="password" />
          <Field
            component={CustomInput}
            label="Email"
            name="email"
            placeholder="Enter your email..."
          />
          <Field
            component={Input}
            label="Address"
            name="address"
            placeholder="Enter your address..."
          />

          <button type="submit">Submit</button>
          <pre style={{ marginTop: "32px" }}>
            {JSON.stringify({ values, errors }, null, 2)}
          </pre>
        </Form>
      )}
    </Formik>
  );
};

export default CustomFormikInput;
