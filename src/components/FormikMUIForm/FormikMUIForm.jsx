import React from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { object, array, number, string, boolean, ValidationError } from "yup";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const emptyDonation = { institution: "", percentage: 0 };

const FormikMUIForm = () => {
  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={{
            fullName: "",
            donationAmount: 0,
            termsAndConditions: false,
            donations: [emptyDonation],
          }}
          onSubmit={async (values) => {
            console.log("Values:", values);
            return new Promise((res) => setTimeout(res, 2500));
          }}
          validationSchema={object({
            fullName: string().required().min(2).max(20),
            donationAmount: number().required().min(10),
            termsAndConditions: boolean().required().isTrue(),
            donations: array(
              object({
                institution: string()
                  .required("You need to enter the name of the institution")
                  .min(3, "The name should be longer than 3 letter")
                  .max(20, "The name should not be longer than 20 letters"),
                percentage: number()
                  .required("Percentage is needed")
                  .min(1, "Minimum percentage is 1")
                  .max(100, "Maximum percentage is 100"),
              })
            )
              .min(1)
              .max(3)
              .test((donations) => {
                const sum = donations.reduce(
                  (acc, curr) => acc + curr.percentage,
                  0
                );

                if (sum !== 100) {
                  return new ValidationError(
                    `Percentage should be 100%, but you have ${sum}%`,
                    undefined,
                    "donations"
                  );
                }

                return true;
              }),
          })}>
          {({ values, errors, isSubmitting, isValid }) => (
            <Form autoComplete="off">
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Field
                    fullWidth
                    name="fullName"
                    component={TextField}
                    label="Full Name"
                  />
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    name="donationAmount"
                    type="number"
                    component={TextField}
                    label="Donation ($)"
                  />
                </Grid>

                <FieldArray name="donations">
                  {({ push, remove }) => (
                    <React.Fragment>
                      <Grid item>
                        <Typography variant="body2">All donations</Typography>
                      </Grid>

                      {values.donations.map((_, index) => (
                        <Grid container item spacing={2} key={index}>
                          <Grid item xs={12} sm="auto" style={{ flex: 1 }}>
                            <Field
                              fullWidth
                              name={`donations[${index}].institution`}
                              component={TextField}
                              label="Institution"></Field>
                          </Grid>
                          <Grid item xs={12} sm="auto" style={{ flex: 1 }}>
                            <Field
                              fullWidth
                              name={`donations[${index}].percentage`}
                              component={TextField}
                              label="Percentage"
                              type="number"></Field>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm="auto"
                            style={{ alignSelf: "center" }}>
                            <Button
                              color="error"
                              variant="contained"
                              size="large"
                              onClick={() => remove(index)}
                              disabled={isSubmitting}>
                              <DeleteOutlineIcon />
                            </Button>
                          </Grid>
                        </Grid>
                      ))}

                      <Grid item>
                        {typeof errors.donations === "string" ? (
                          <Typography color="error">
                            {errors.donations}
                          </Typography>
                        ) : null}
                      </Grid>

                      <Grid item>
                        <Button
                          onClick={() => push(emptyDonation)}
                          variant="outlined"
                          disabled={isSubmitting}>
                          Add donation
                        </Button>
                      </Grid>
                    </React.Fragment>
                  )}
                </FieldArray>

                <Grid item>
                  <Field
                    name="termsAndConditions"
                    type="checkbox"
                    component={CheckboxWithLabel}
                    Label={{
                      label: "I accept the term and conditions",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    disabled={isSubmitting || !isValid}
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={
                      isSubmitting ? <CircularProgress size={20} /> : undefined
                    }>
                    {isSubmitting ? "Submitting" : "Submit"}
                  </Button>
                </Grid>
              </Grid>

              <pre style={{ marginTop: "32px" }}>
                {JSON.stringify({ values, errors }, null, 2)}
              </pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default FormikMUIForm;
