import React, { useEffect, useState, useContext } from "react";
import PortalContract from '../../abis/portal.json'
import SurveyContract from '../../abis/survey.json';
import { ethers } from "ethers";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Paper,
} from "@material-ui/core";

import Spinner from "../../components/Spinner";
import { useAuthState, useAuthDispatch } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { SnackbarContext } from "../../context/SnackbarContext";
import Web3Modal from "web3modal";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh"
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
    marginTop: "15px",
    marginBottom: "20px"
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const { isAuthenticated, userType } = useAuthState();
  const dispatch = useAuthDispatch();
  const history = useHistory();
  const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(false);


  const [signer, setSigner] = useState("");

  const handleGenerate = async (event) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection);
    const add = '0x42Ab9DeB854F206e6943B7a6775A20e8bBFcC9B7';
    const s = provider.getSigner();
    const contract = new ethers.Contract(add, PortalContract.abi, s);
    console.log(contract);
    const tx = await contract.id();
    history.push(`/${props.userType}/register`);

  };
  const handleLogin = async (event) => {

  };


  return loading ? (
    <Spinner />
  ) : (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Paper elevation={3} className={classes.paper}>

        <form className={classes.form} noValidate>

          <div>

            <Button
              onClick={async (e) => {
                e.preventDefault();
                console.log("Done")
                const web3Modal = new Web3Modal();
                const connection = await web3Modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const s = provider.getSigner();
                const checkadd = await s.getAddress();
                console.log(checkadd);
                //    if (!checkLogin(checkadd)) {
                const sign = await s.signMessage("Welcome to SurveySol");
                //  }

                setSigner(s);

                history.push(`/student/register`);
              }}
              size="large"
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
            >
              Are you a new user? Get Onboarded
            </Button>
          </div>
          <br>
          </br>


          <div>
            <Button
              onClick={handleLogin}
              size="large"
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
            >
              Import existing
            </Button>
          </div>
        </form>
        {/* <Typography
          style={{ color: "#303F9E", fontSize: 15, marginBottom: "15px" }}
        >
          Don't have an account?
          <Link style={{ color: "#303F9E" }} to={`/${props.userType}/register`}>
            {" "}
            Sign Up
          </Link>
        </Typography> */}
      </Paper>
    </Box >
  );
};

export default Login;
