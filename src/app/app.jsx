import FormikMUIForm from "components/FormikMUIForm/FormikMUIForm";
import React from "react";
// import AutoAddedForm from "../components/AutoAddedForm/AutoAddedForm";
// import AutoAddedForm from "../components/AutoAddedForm/AutoAddedForm";
// import CustomFormikInput from "../components/CustomFormikInput/CustomFormikInput";
import LoginForm from "../components/LoginForm/LoginForm";

import "./styles.css";

const App = (props) => {
  return (
    <div className="app">
      {/* <FormikMUIForm /> */}
      <LoginForm />
    </div>
  );
};

export default App;
