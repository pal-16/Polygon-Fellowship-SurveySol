import React from "react";
import { Formik, Form } from "formik";
import CheckboxGroup from "./CheckboxGroup";
//import React, { useEffect, useState, useContext } from "react";
import { create } from "ipfs-http-client";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "checkbox":
      return <CheckboxGroup {...rest} />;
    default:
      return null;
  }
}
function FormikContainer() {
  const checkboxOptions = [
    { key: "Option 1", value: "cOption1" },
    { key: "Option 2", value: "cOption2" },
    { key: "Option 3", value: "cOption3" }
  ];
  const initialValues = {
    selectOption: "",
    radioOption: "",
    checkboxOption: [],
    birthDate: null
  };

  const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

  const uploadResponse = async (response) => {
    try {
      let buffer = Buffer.from(JSON.stringify(response));
      const added = await client.add(buffer);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      //setFileUrl(url);
      console.log(url);
    } catch (error) {
      console.error("IPFS error ", error);
    }
  };
  const onSubmit = (values) => {
    console.log("Form data", values);
    console.log("Saved data", JSON.parse(JSON.stringify(values)));
    uploadResponse(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <FormikControl
          control="checkbox"
          label="Checkbox topics"
          name="checkboxOption"
          options={checkboxOptions}
        />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default FormikContainer;
