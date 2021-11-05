import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Input from "../Input/Input";

import "./styles.scss";
import Button from "../Button/Button";

const FormikForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .typeError("Must be a string")
      .required("Field is required"),
    secondName: Yup.string()
      .typeError("Must be a string")
      .required("Field is required"),
    email: Yup.string()
      .email("Enter the correct email form")
      .required("Field is required"),
    confirmEmail: Yup.string()
      .email("Enter the correct email form")
      .oneOf([Yup.ref("email")], "Emails do not match")
      .required("Field is required"),
    password: Yup.string()
      .typeError("Must be a string")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .required("Field is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .required("Field is required"),
  });
  return (
    <Formik
      initialValues={{
        name: "",
        secondName: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
      }}
      validateOnBlur
      onSubmit={(value) => console.log(value)}
      validationSchema={validationSchema}>
      {({
        values,
        errors,
        touched,
        dirty,
        isValid,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <Form>
          <Input
            label="Name"
            type="text"
            name="name"
            value={values.name}
            onblur={handleBlur}
            onchange={handleChange}
            warning={touched.name && errors.name && errors.name}
          />
          <Input
            label="Second name"
            type="text"
            name="secondName"
            value={values.secondName}
            onblur={handleBlur}
            onchange={handleChange}
            warning={
              touched.secondName && errors.secondName && errors.secondName
            }
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={values.email}
            onblur={handleBlur}
            onchange={handleChange}
            warning={touched.email && errors.email && errors.email}
          />
          <Input
            label="Confirm email"
            type="email"
            name="confirmEmail"
            value={values.confirmEmail}
            onblur={handleBlur}
            onchange={handleChange}
            warning={
              touched.confirmEmail && errors.confirmEmail && errors.confirmEmail
            }
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onblur={handleBlur}
            onchange={handleChange}
            warning={touched.password && errors.password && errors.password}
          />
          <Input
            label="Confirm password"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onblur={handleBlur}
            onchange={handleChange}
            warning={
              touched.confirmPassword &&
              errors.confirmPassword &&
              errors.confirmPassword
            }
          />
          <Button
            color="primary"
            value="Submit"
            disabled={!isValid && !dirty}
            onclick={handleSubmit}
            type="submit"
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
