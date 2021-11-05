import React from "react";
import { Field, Form, Formik } from "formik";
import { object, string, number } from "yup";

import Input from "../Input/Input";
import Button from "../Button/Button";

import "bootstrap/dist/css/bootstrap.css";

const onSubmitHandler = async (values) => {
  console.log("Values:", values);
  return new Promise((res) => setTimeout(res, 2500));
};

const myCustomComponent = ({
  field, // { name, value, onChange, onBlur}
  form: { touched, errors },
  ...props
}) => (
  <>
    <label htmlFor={field.name}>{props.lebelName}</label>
    <input
      type="text"
      className="form-control"
      placeholder={props.placeholder}
      {...field}
    />
    {errors[field.name] && touched[field.name] ? (
      <span>{errors[field.name]}</span>
    ) : null}
  </>
);

const AutoAddedForm = () => {
  return (
    <div className="card m-3">
      <div className="card-header">
        <h2>Fill Act Of Acceptance</h2>
      </div>
      <div className="card-body">
        <Formik
          initialValues={{
            name: "",
            price: 0,
          }}
          onSubmit={(values) => onSubmitHandler(values)}
          const
          validationSchema={object({
            name: string()
              .required("Required field")
              .min(3, "The name should be more descriptive"),
            price: number().required("Required field").min(1, "Min price is 1"),
          })}>
          {({ values, errors }) => (
            <Form>
              <div className="fieldset d-flex gap-2 align-items-start">
                <Field
                  name="name"
                  placeholder="Name"
                  warning={errors.name}
                  classes="col-7"
                  as={Input}
                />
                <Input
                  name="price"
                  warning={errors.price}
                  classes="col-2"
                  placeholder="Price"
                />
                <Button
                  type="submit"
                  classes="col"
                  value="Delete"
                  color="warning"
                />
              </div>
              <Field
                name="lastname"
                placeholder="Add a Lastname"
                component={myCustomComponent}
                lebelName="Enter you lastname"
                label="Something smart"
              />
              <fieldset>
                <Button
                  value="Submit"
                  type="submit"
                  color="secondary"
                  classes="mt-3"
                />
              </fieldset>
              <pre style={{ marginTop: "32px" }}>
                {JSON.stringify({ values, errors }, null, 2)}
              </pre>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AutoAddedForm;
