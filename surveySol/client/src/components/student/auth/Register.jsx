import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Box,
  Typography,
  Button,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { SnackbarContext } from "../../../context/SnackbarContext";
import { useAuthDispatch } from "../../../context/AuthContext";
import FormField from "../../../components/FormField";
import constants from "../../../constants";
import { REQUEST_AUTH } from "../../../reducers/types";
import config from "../../../config";
import { ethers } from "ethers";
import Spinner from "../../Spinner";


import PortalContract from '../../../abis/portal.json'
import SurveyContract from '../../../abis/survey.json'
import { register } from "../../../actions/apiActions"

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



const Register = () => {
  const classes = useStyles();
  const dispatch = useAuthDispatch();
  const theme = useTheme();
  const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
  let currentYear = new Date().getFullYear();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // setLoading(true);


  }, []);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState(null);
  const [student, setStudent] = useState({
    walletID: "",
    skills: "",
    gender: "",
    empstatus: "",
    maritalstatus: "",
    nationality: "",

  });

  const [errors, updateErrors] = useState({
    walletID: "",
    skills: "",
    gender: "",
    empStatus: "",
    skills: "",
    gender: "",
    empstatus: "",
    maritalstatus: "",
    nationality: "",
  });


  const [isRegistered, setIsRegistered] = useState(true);
  const handleStudent = (e) => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      [e.target.name]: e.target.value
    }));
  };

  const isFormValid = () => {
    let formIsValid = true;
    updateErrors({
      walletID: "",
      skills: "",
      gender: "",
      empStatus: "",
      skills: "",
      gender: "",
      empstatus: "",
      maritalstatus: "",
      nationality: "",
    });

    // if (student.studentID.length !== 9) {
    //   updateErrors((prevErrors) => ({
    //     ...prevErrors,
    //     studentID: "* Please enter a valid student ID"
    //   }));
    //   formIsValid = false;
    // }
    // if (!student.name) {
    //   updateErrors((prevErrors) => ({
    //     ...prevErrors,
    //     name: "* Please enter your name"
    //   }));
    //   formIsValid = false;
    // }
    // if (!student.email) {
    //   formIsValid = false;
    //   updateErrors((prevErrors) => ({
    //     ...prevErrors,
    //     email: "* Email can't be Empty"
    //   }));
    // } else if (!student.email.includes(".vjti.ac.in")) {
    //   formIsValid = false;
    //   updateErrors((prevErrors) => ({
    //     ...prevErrors,
    //     email: "* Please use VJTI Email ID only"
    //   }));
    // }

    // if (!student.department) {
    //   updateErrors((prevErrors) => ({
    //     ...prevErrors,
    //     department: "* Please enter your department"
    //   }));
    //   formIsValid = false;
    // }


    return formIsValid;
  };

  const handleFormSubmit = async (event) => {
    setLoading(true);
    dispatch({ type: REQUEST_AUTH });
    event.preventDefault();

    console.log("===========================Palak")
    console.log(student);

    const res = await register({ dispatch, body: student })
    if (res.status === 201) {
      setFormData({ student, hash: res.data.hash });

      try {
        console.log("Done")

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const s = provider.getSigner();
        // const add = '0x404Ee28eF5fc24A10200A6596E72Fd680DE5B1A6';
        const admin = await config();

        let contract = new ethers.Contract(
          "0x404Ee28eF5fc24A10200A6596E72Fd680DE5B1A6",
          PortalContract.abi,
          admin
        );
        //  const contract = new ethers.Contract(add, PortalContract.abi, s);
        console.log(contract);


        const t = await contract.addUser(["male", "Web Developer"], [true, false], "0x9dC36499A0aB380eeaC69De651811B68beb0a783")
        //     history.push(`/${props.userType}/register`);
        console.log("done");
        setOpen(true)
        setLoading(false);
        history.push(`/student/applications`);
        setSeverity("success");
        setMessage("You have successfully registered.");


      } catch (e) {
        console.log(e);
      }

    } else {
      setSeverity("error");
      setMessage(res.error);
      setOpen(true);
    }


  };
  return loading == true ? <Spinner></Spinner> : (
    <>
      {/* <Dialog open={isRegistered}>
        <DialogTitle>Key Pair</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here's the public key that was generated for you through the VJChain
            Wallet. You can download your credentials file from your profile
            after you complete the regitration process. We store your Public key
            in our database for sending your rewards to you.
          </DialogContentText>
          <Typography variant="body1">Public Key</Typography>
          <Paper elevation={0} className={classes.key} square>
            <Typography variant="body2" style={{ wordWrap: "break-word" }}>
              {student.publicKey}
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsRegistered(false);
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog> */}

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
              <Typography variant="h5">User Onboarding</Typography>
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
                        value={student.skills}
                        onChange={handleStudent}
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
                        value={student.gender}
                        onChange={handleStudent}
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
                        value={student.empstatus}
                        onChange={handleStudent}
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
                        value={student.maritalstatus}
                        onChange={handleStudent}
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
                  onClick={handleFormSubmit}
                  size="large"
                  color="primary"
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Register
                </Button>
              </div>
            </form>

          </Paper>
        </Box>
      </React.Fragment>
    </>
  );
};

export default Register;
