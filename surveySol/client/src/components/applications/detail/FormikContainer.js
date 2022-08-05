import React from "react";
import { Formik, Form } from "formik";
import CheckboxGroup from "./CheckboxGroup";
//import React, { useEffect, useState, useContext } from "react";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
// import PortalContract from "../../abis/portal.json";
import SurveyContract from "../../../abis/survey.json";
// import { adminSigner } from "../../../../config.js";
import config from "../../../config";

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

  const onSubmit = async (values) => {
    try {
      console.log("Form data", values);
      console.log("Saved data", JSON.parse(JSON.stringify(values)));
      const admin = await config();
      const useraddress = "0x5070c3CC7D9605422B1daa37216FCBa9fE527fF2";
      let adminSurveyContract = new ethers.Contract(
        "0x55c21Caa0f77f39C1Efe9e396a7cA18A0CD1bCF3",
        SurveyContract.abi,
        admin
      );
      // console.log("jojo");
      // console.log(adminSurveyContract);
      await contract.verifyParticipant(useraddress);
      await uploadResponse(values);
      let f = await adminSurveyContract.storeResponse(cid);
      // console.log(admin);
      // const k = await adminSurveyContract.surveyResponses(1);

      await adminSurveyContract.disburseReward(useraddress);
    } catch (err) {
      console.log(err);
    }
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
