import React, { useEffect, useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Button,
  Paper,
  useMediaQuery
} from "@material-ui/core";


import FormField from "../FormField";
import constants from "../../constants";

import { Link, useHistory } from "react-router-dom";
import { SnackbarContext } from "../../context/SnackbarContext";
import { useAuthDispatch } from "../../context/AuthContext";
import { REQUEST_AUTH } from "../../reducers/types";
import { createSurvey } from "../../actions/apiActions";
import NewSurveyCrtieria from "./NewSurveyCriteria";

import PortalContract from "../../abis/portal.json";
import SurveyContract from "../../abis/survey.json";
import QuestionsTab from "../form/Form/QuestionsTab"
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50%"
    },
    [theme.breakpoints.up("md")]: {
      width: "40%"
    }
  },
  form: {
    width: "100%",
    justifyContent: "center"
  },
  formInner: {
    padding: "20px 30px"
  },
  formControl: {
    marginBottom: "20px",
    width: "100%"
  },
  key: {
    backgroundColor: "#D6D6D6",
    padding: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
}));

const NewSurvey = () => {
  const classes = useStyles();
  const dispatch = useAuthDispatch();
  const theme = useTheme();
  const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [pg, setPg] = useState("1");
  useEffect(() => {
    console.log("Hello")
    setPg("1")
    console.log(pg);
    setLoading(true);
  }, []);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState(null);
  const [survey, setsurvey] = useState({
    userID: "12ss3",
    title: "",
    description: "",
    reward: "",
    rewardtokenaddres: "",
    nfttokenaddress: "",
    amountnft: "",
    skills: "",
    gender: "",
    empstatus: "",
    maritalstatus: "",
    nationality: "",
    field: [{ question: "what is your name", options: ["palak", "jayati"] }]
  });

  const [errors, updateErrors] = useState({
    userID: "",
    title: "",
    description: "",
    reward: "",
    rewardtokenaddres: "",
    nfttokenaddress: "",
    amountnft: "",
    skills: "",
    gender: "",
    empstatus: "",
    maritalstatus: "",
    nationality: "",
  });

  const [isRegistered, setIsRegistered] = useState(true);
  const handlesurvey = (e) => {
    setsurvey((prevsurvey) => ({
      ...prevsurvey,
      [e.target.name]: e.target.value
    }));
  };

  const isFormValid = () => {
    let formIsValid = true;
    updateErrors({
      userID: "",
      title: "",
      description: "",
      reward: "",
      rewardtokenaddres: "",
      nfttokenaddress: "",
      amountnft: "",
      skills: "",
      gender: "",
      empstatus: "",
      maritalstatus: "",
      nationality: "",
    });

    return formIsValid;
  };


  return (
    <>
      {(pg == "1") &&
        <>
          <React.Fragment>
            <Box
              className={classes.root}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Paper elevation={isSmallScreen ? 0 : 3} className={classes.paper}>
                <div style={{ marginTop: "24px" }}>
                  <Typography variant="h5">Create Survey</Typography>
                </div>

                <form className={classes.form} noValidate>
                  <div className={classes.formInner}>
                    <FormField
                      label="Title"
                      name="title"
                      required={true}
                      onChange={handlesurvey}
                      error={errors.title}
                    />
                    <FormField
                      label="Description"
                      name="description"
                      required={true}
                      onChange={handlesurvey}
                      error={errors.description}
                    />
                    <FormField
                      label="Reward"
                      name="reward"
                      required={true}
                      onChange={handlesurvey}
                      error={errors.reward}
                    />
                    <FormField
                      label="Token Address"
                      name="tokenAddress"
                      required={true}
                      onChange={handlesurvey}
                      error={errors.tokenAddress}
                    />

                    <Button
                      onClick={() => setPg("2")}
                      size="large"
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Next
                    </Button>
                  </div>
                </form>
              </Paper>
            </Box>
          </React.Fragment>
        </>
      }
      {(pg == "2") &&
        <>
          <React.Fragment>
            <Box
              className={classes.root}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Paper elevation={isSmallScreen ? 0 : 3} className={classes.paper}>
                <div style={{ marginTop: "24px" }}>
                  <Typography variant="h5">Create Survey</Typography>
                </div>

                <form className={classes.form} noValidate>
                  <div className={classes.formInner}>
                    <FormField
                      label="NFT Token address"
                      name="nfttokenaddress"

                      onChange={handlesurvey}
                      error={errors.description}
                    />
                    <FormField
                      label="Amount of NFT tokens"
                      name="rewardtokenaddress"

                      onChange={handlesurvey}
                      error={errors.description}
                    />
                    <Button
                      onClick={() => setPg("3")}
                      size="large"
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Next
                    </Button>
                  </div>
                </form>
              </Paper>
            </Box>
          </React.Fragment>
        </>
      }
      {(pg == "3") &&
        <>
          <React.Fragment>
            <Box
              className={classes.root}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Paper elevation={isSmallScreen ? 0 : 3} className={classes.paper}>
                <div style={{ marginTop: "24px" }}>
                  <Typography variant="h5">Create Survey</Typography>
                </div>

                <form className={classes.form} noValidate>
                  <div className={classes.formInner}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          error={errors.skills.length !== 0}
                        >
                          <InputLabel id="skills-label">Skills</InputLabel>
                          <Select
                            labelId="skills-label"
                            id="skills"
                            name="skills"
                            value={survey.skills}
                            onChange={handlesurvey}
                            label="Skills"
                          >
                            {constants.SKILLS.map((degree) => (
                              <MenuItem key={degree} value={degree}>
                                {degree}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{errors.degree}</FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          error={errors.gender.length !== 0}
                        >
                          <InputLabel id="gender-label">Gender</InputLabel>
                          <Select
                            labelId="gender-label"
                            id="gender"
                            name="gender"
                            value={survey.gender}
                            onChange={handlesurvey}
                            label="Gender"
                          >
                            {constants.GENDER.map((user) => (
                              <MenuItem key={user} value={user}>
                                {user}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{errors.gender}</FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          error={errors.empstatus.length !== 0}
                        >
                          <InputLabel id="empstatus-label">Employment Status</InputLabel>
                          <Select
                            labelId="empstatus-label"
                            id="empstatus"
                            name="empstatus"
                            value={survey.empstatus}
                            onChange={handlesurvey}
                            label="Employnment Status"
                          >
                            {constants.EMPSTATUS.map((degree) => (
                              <MenuItem key={degree} value={degree}>
                                {degree}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{errors.degree}</FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          error={errors.maritalstatus.length !== 0}
                        >
                          <InputLabel id="maritalstatus-label">Marital Status</InputLabel>
                          <Select
                            labelId="maritalstatus-label"
                            id="maritalstatus"
                            name="maritalstatus"
                            value={survey.maritalstatus}
                            onChange={handlesurvey}
                            label="Marital Status"
                          >
                            {constants.MARITALSTATUS.map((user) => (
                              <MenuItem key={user} value={user}>
                                {user}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{errors.gender}</FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Button
                      onClick={() => setPg("4")}
                      size="large"
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Next
                    </Button>
                  </div>
                </form>
              </Paper>
            </Box>
          </React.Fragment>
        </>
      }
      {(pg == "4") &&
        <QuestionsTab survey={survey} />
      }

    </>
  );
};

export default NewSurvey;
