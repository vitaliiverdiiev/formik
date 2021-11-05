import React from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { string, object, number, array } from "yup";

import Input from "components/Input/Input";
import Button from "components/Button/Button";
import CustomInput from "components/CustomInput/CustomInput";

import "bootstrap/dist/css/bootstrap.css";
import "./styles.scss";

const emptyShopping = { name: "", price: 0, book: "" };

const handleAddChange = (push, lastFiled) => {
  console.log("SHOULD ADD NEW LINE NOW");
  // if (
  //   lastFiled[lastFiled.length - 1].name !== "" ||
  //   lastFiled[lastFiled.length - 1].price !== "" ||
  //   lastFiled[lastFiled.length - 1].book !== ""
  // ) {
  //   push(emptyShopping);
  // }
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
              book: string().required().min(3),
            })
          ),
        })}
        onSubmit={(values) => console.log(values)}>
        {({ values, errors, handleChange, setFieldValue, field }) => (
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
                        // warning={errors.shoppings[index].name}
                        classes="col-6"
                        onchange={(e) => {
                          handleChange(e);
                          handleAddChange(push, values.shoppings);
                        }}
                      />
                      <Field
                        name={`shoppings[${index}].price`}
                        component={Input}
                        placeholder="Price"
                        // warning={errors.shoppings[index].price}
                        // type="number"
                        classes="col"
                        onchange={(e) => {
                          handleAddChange(push, values.shoppings);
                          handleChange(e);
                        }}
                      />
                      <Field
                        name={`shoppings[${index}].book`}
                        component={CustomInput}
                        onchange={(e) => {
                          console.log(e);
                          handleAddChange(push, values.shoppings);
                          handleChange(e);
                        }}
                      />
                      <Button
                        type="button"
                        value="Delete"
                        color="warning"
                        onclick={() => remove(index)}
                        // disabled={isSubmitting}
                        classes="col-2"
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    value="Add"
                    color="primary"
                    onclick={() => push(emptyShopping)}
                    // disabled={isSubmitting}
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
    </div>
  );
};

export default LoginForm;
