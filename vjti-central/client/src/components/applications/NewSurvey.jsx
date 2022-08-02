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
  useMediaQuery,
} from "@material-ui/core";



import FormField from "../FormField";
import constants from "../../constants";

import { Link, useHistory } from "react-router-dom";
import { SnackbarContext } from "../../context/SnackbarContext";
import { useAuthDispatch } from "../../context/AuthContext";
import { REQUEST_AUTH } from "../../reducers/types";
import { createSurvey } from "../../actions/apiActions"
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
  useEffect(() => {
    setLoading(true);


  }, []);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState(null);
  const [survey, setsurvey] = useState({
    userID: "pf2",
    title: "",
    description: "",
    reward: "",
    occupation: "",
    gender: "",
    field: [{ question: 'what is your name', options: ["palak", "jayati"] }]
  });

  const [errors, updateErrors] = useState({
    userID: "",
    title: "",
    description: "",
    reward: "",
    occupation: "",
    gender: "",
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
      occupation: "",
      gender: "",
    });


    return formIsValid;
  };

  const handleFormSubmit = (event) => {
    dispatch({ type: REQUEST_AUTH });
    event.preventDefault();
    if (isFormValid()) {

      createSurvey({ dispatch, body: survey }).then(
        (res) => {

          if (res.status === 201) {
            setFormData({
              survey,
              hash: res.data.hash
            });
            console.log("done");
            history.push(`/student/applications`);
            setSeverity("success");
            setMessage("Created survey");

          } else {
            setSeverity("error");
            setMessage(res.error);
            setOpen(true);
          }
        }
      );
    }
  };
  return (
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
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      variant="outlined"
                      required
                      className={classes.formControl}
                      error={errors.occupation.length !== 0}
                    >
                      <InputLabel id="occupation-label">Occupation</InputLabel>
                      <Select
                        labelId="occupation-label"
                        id="occupation"
                        name="occupation"
                        value={survey.occupation}
                        onChange={handlesurvey}
                        label="Occupation"
                      >
                        {constants.OCCUPATION.map((degree) => (
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
                      required
                      className={classes.formControl}
                      error={errors.gender.length !== 0}
                    >
                      <InputLabel id="gender-label">
                        Gender
                      </InputLabel>
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

                <Button
                  onClick={handleFormSubmit}
                  size="large"
                  color="primary"
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Submit
                </Button>
              </div>
            </form>

          </Paper>
        </Box>
      </React.Fragment>
    </>
  );
};

export default NewSurvey;

