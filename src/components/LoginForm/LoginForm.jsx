import React from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { string, object, number, array } from "yup";

import Input from "components/Input/Input";
import Button from "components/Button/Button";

import "bootstrap/dist/css/bootstrap.css";
import "./styles.scss";

const emptyShopping = { name: "", price: 0 };

const handleAddChange = (values, push) => {
  if (
    values.shoppings[values.shoppings.length - 1].name !== "" ||
    values.shoppings[values.shoppings.length - 1].price !== 0
  ) {
    push(emptyShopping);
  }
};

const LoginForm = () => {
  return (
    <div className="popup">
      <Formik
        initialValues={{
          name: "",
          price: 0,
          shoppings: [emptyShopping],
        }}
        validationSchema={object({
          name: string().required().min(3),
          price: number().required().min(1),
          shoppings: array(
            object({
              name: string().required().min(3),
              price: string().required().min(3),
            })
          ),
        })}
        onSubmit={(values) => console.log(values)}>
        {({ values, errors }) => (
          <Form>
            <div className="row ">
              <Field
                name="name"
                component={Input}
                label="Name:"
                warning={errors.name}
                classes="col-6"
              />
              <Field
                name="price"
                component={Input}
                label="Price:"
                warning={errors.price}
                classes="col-6"
              />
            </div>
            <FieldArray name="shoppings">
              {({ push, remove }) => (
                <>
                  <h4>Shopping list</h4>
                  {values.shoppings.map((_, index) => (
                    <div className="row" key={index}>
                      <Field
                        name={`shoppings[${index}].name`}
                        component={Input}
                        placeholder="Name"
                        classes="col-6"
                        value={values.shoppings[index].name}
                        onchange={() => handleAddChange(values, push)}
                      />
                      <Field
                        name={`shoppings[${index}].price`}
                        component={Input}
                        placeholder="Price"
                        value={values.shoppings[index].price}
                        type="number"
                        classes="col"
                        onchange={() => handleAddChange(values, push)}
                      />
                      <Button
                        type="button"
                        value="Delete"
                        color="warning"
                        onclick={() => {
                          remove(index);
                        }}
                        classes="col-2"
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    value="Add"
                    color="primary"
                    onclick={() => push(emptyShopping)}
                    classes="col-12 mt-3 mb-5"
                  />
                </>
              )}
            </FieldArray>
            <Button type="submit" value="Submit" color="secondary" outline />
            <pre style={{ marginTop: "32px" }}>
              {JSON.stringify({ values, errors }, null, 2)}
            </pre>
          </Form>
        )}
      </Formik>
      <Input />
    </div>
  );
};

export default LoginForm;
