
import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";

import { Paper, Typography } from "@material-ui/core";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import RadioGroup from "@material-ui/core/RadioGroup";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import config from "../../../config";
import SurveyContract from "../../../abis/survey.json";
import { Link, useHistory } from "react-router-dom";
import { SnackbarContext } from "../../../context/SnackbarContext";
import Spinner from "../../Spinner";
const useStyles = makeStyles((theme) => ({}));


function UserView(props) {
  const classes = useStyles();

  const [userId, setUserId] = React.useState("");
  const [formData, setFormData] = React.useState({});
  const [responseData, setResponseData] = React.useState([]);
  //console.log(responseData);
  const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
  const [optionValue, setOptionValue] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  // const [questions, setQuestions] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = useState(false);
  //console.log(value);
  const history = useHistory();
  const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

  const uploadResponse = async (response) => {
    try {
      let buffer = Buffer.from(JSON.stringify(response));
      const added = await client.add(buffer);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      //setFileUrl(url);
      console.log(url);
      return url;
    } catch (error) {
      console.error("IPFS error ", error);
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      console.log("Here===================");
      //console.log("Form data", values);
      console.log(responseData);
      console.log("Saved data", JSON.parse(JSON.stringify(responseData)));
      const admin = await config();
      console.log(admin);
      const useraddress = "0x9dC36499A0aB380eeaC69De651811B68beb0a783";
      let adminSurveyContract = new ethers.Contract(
        "0x384985bCB6D83835531E2859518CF3147ac7fc67",
        SurveyContract.abi,
        admin
      );

      //   let k = await adminSurveyContract.verifyParticipant(useraddress);
      // console.log(k);

      let cid = await uploadResponse(responseData);
      console.log(cid);
      console.log("Done");

      let f = await adminSurveyContract.storeResponse(cid);
      console.log(f);
      console.log(admin);
      setOpen(true)
      setLoading(false);
      history.push(`/student/applications`);
      setSeverity("success");
      setMessage("Thanks for filling the survey. Your rewards tokens have been disbursed to your connected wallet");
      // const k = await adminSurveyContract.surveyResponses(1);
      // await adminSurveyContract.disburseReward(useraddress);

    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    console.log("==================================");
    setQuestions(
      [
        { _id: 12, questionText: "What aspect of Web3 are you most excited about?", options: [{ _id: 5, optionText: "DAO", checked: "unchecked" }, { _id: 6, optionText: "NFT", checked: "checked" }, { _id: 5, optionText: "DeFi", checked: "unchecked" }] },
        { _id: 13, questionText: "What is your preferred mode of learning concepts?", options: [{ _id: 7, optionText: "Documentation", checked: "checked" }, { _id: 8, optionText: "Video", checked: "unchecked" }] },
        { _id: 12, questionText: "Which token you prefer to buy in the bear market", options: [{ _id: 5, optionText: "Bitcoin", checked: "unchecked" }, { _id: 6, optionText: "Ethereum", checked: "unchecked" }, { _id: 6, optionText: "MATIC", checked: "unchecked" }, { _id: 6, optionText: "Luna", checked: "unchecked" }] },

      ]);
    // console.log(typeof questions);
    // Object.keys(questions).forEach((key) => {
    //   console.log(questions[key]);
    // })
    var anonymousUserId =
      "anonymous" +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    console.log(anonymousUserId);
    setUserId(anonymousUserId);
  }, []);

  const handleRadioChange = (j, i) => {
    var questionId = questions[i]._id;
    var optionId = questions[i].options[j]._id;

    console.log(typeof questions);

    var fakeData = {
      question: i,
      option: j
    };
    var data = {
      questionId,
      optionId
    };

    setValue(j);

    var fakeRData = [...responseData];

    var indexOfResponse = fakeRData.findIndex(
      (x) => x.questionId === questionId
    );
    if (indexOfResponse === -1) {
      setResponseData((responseData) => [...responseData, data]);
    } else {
      fakeRData[indexOfResponse].questionId = questionId;
      setResponseData(fakeRData);
    }

    setOptionValue(fakeData);
  };
  const [checked, setChecked] = React.useState("true");

  function submitResponse() {
    var submissionData = {
      formId: formData._id,
      userId: userId,
      response: responseData
    };
    console.log(submissionData);


  }

  const handleChange = (event) => {
    setChecked(event.target.value)
  }

  function reloadForAnotherResponse() {
    window.location.reload(true);
  }

  return loading == true ? <Spinner></Spinner> : (
    <div style={{ minHeight: '100vh' }}>
      <div>

        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={5} style={{ width: '100%' }}>



            <div>
              <Grid>


                <div key={"val"}>
                  <br></br>
                  <Paper>
                    <div>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        marginLeft: '6px',
                        paddingTop: '15px',
                        paddingBottom: '15px'
                      }}>
                        <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>{"1"}. {"What aspect of Web3 are you most excited about?"}</Typography>


                        <div>
                          <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={(e) => { handleRadioChange(e.target.value, "val") }} >



                            <div>
                              <div style={{ display: 'flex', marginLeft: '7px' }}>
                                <FormControlLabel className="t" value={"palak"} control={<Radio />} label={"DAO"} checked={"checked"} />

                                <FormControlLabel className="t" value={"palak"} control={<Radio />} label={"NFT"} />

                                <FormControlLabel className="t" value={"palak"} control={<Radio />} label={"DeFi"} />


                              </div>


                            </div>

                          </RadioGroup>

                        </div>
                        <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>{"2"}. {"What is your preferred mode of learning concepts?"}</Typography>


                        <div>
                          <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={(e) => { handleRadioChange(e.target.value, "val") }} >



                            <div>
                              <div style={{ display: 'flex', marginLeft: '7px' }}>
                                <FormControlLabel className="t" value={"palak"} control={<Radio />} label={"Documentation"} />


                                <FormControlLabel className="t" value={"palak"} control={<Radio />} label={"Videos"} checked={"checked"} />


                              </div>


                            </div>

                          </RadioGroup>

                        </div>
                        <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>{"1"}. {"Which token you prefer to buy in the bear market"}</Typography>


                        <div>
                          <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={(e) => { handleRadioChange(e.target.value, "val") }} >



                            <div>
                              <div style={{ display: 'flex', marginLeft: '7px' }}>
                                <FormControlLabel className="t" value={"palak"} control={<Radio />} label={"MATIC"} checked={"checked"} />

                                <FormControlLabel className="t" value={"palak"} control={<Radio />} label={"Bitcoin"} />

                                <FormControlLabel className="t" value={"palak"} control={<Radio />} label={"ETH"} />

                              </div>


                            </div>

                          </RadioGroup>

                        </div>
                      </div>
                    </div>
                  </Paper>
                </div>

              </Grid>
              <Grid>
                <br></br>
                <div style={{ display: 'flex' }}>
                  <Button variant="contained" color="primary" onClick={onSubmit}>
                    Submit
                  </Button>
                </div>
                <br></br>

                <br></br>

              </Grid>
            </div>






          </Grid>


        </Grid>


      </div>
    </div>
  )
}

export default UserView;

const FormControlLabelWrapper = props => {
  const { radioButton, ...labelProps } = props;
  return (
    <FormControlLabel
      control={<Radio />}
      label={"Radio " + props.value + props.jIndex}
      {...labelProps}
    />
  );
};
