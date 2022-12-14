import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Paper,
  useMediaQuery
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { getApplicationDetails } from "../../actions/apiActions";
import { useAuthState } from "../../context/AuthContext";
import Spinner from "../Spinner";
import ApplicationItem from "./ApplicationItem";
import StatusChip from "./StatusChip";
import FormikContainer from "./detail/FormikContainer";
import UserView from "../form/Responding/UserView";
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh",
    padding: "20px"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100%",
    width: "100%",
    padding: theme.spacing(3)
  },
  grid: {
    minHeight: "70vh",
    marginTop: theme.spacing(2)
  },
  separator: {
    borderRightStyle: "solid",
    borderWidth: "1px",
    borderColor: "#D3D3D3"
  },
  item: {
    marginBottom: theme.spacing(2)
  },
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    marginBottom: theme.spacing(1)
  },
  label: {
    fontSize: "1.1rem",
    fontWeight: "500"
  }
}));

const ApplicationDetail = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useParams();
  const { token } = useAuthState();
  const Actions = props.actions;

  const [surveyData, setSurveyData] = useState({
    _id: "",
    studentID: "",
    facultyID: "",
    title: "",
    domainAchievement: "",
    links: [],
    files: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //setLoading(true);
    // getSurveyDetails({ id, token }).then((res) => {
    //   if (res.error) {
    //     setLoading(false);
    //   } else {
    //     setSurveyData(res.data);
    //     setLoading(false);
    //   }
    // });
  }, [history, id, token]);

  return loading ? (
    <Spinner />
  ) : (
    <UserView />
    // <FormikContainer />
    // <Box
    //   className={classes.root}
    //   display="flex"
    //   flexDirection="column"
    //   justifyContent="start"
    //   alignItems="center"
    // >
    //   <Paper elevation={isSmallScreen ? 0 : 3} className={classes.paper}>
    //     <Typography variant="h6">
    //       {"Survey".toLocaleUpperCase()}
    //     </Typography>

    //     <Grid
    //       item
    //       xs={12}
    //       md={6}
    //       className={!isSmallScreen ? classes.separator : ""}
    //       style={{ paddingRight: "30px" }}
    //     >
    //       <ApplicationItem
    //         label="Title of Survey"
    //         value={surveyData._id}
    //       />

    //       <Grid item xs={12} md={6} style={{ paddingRight: "30px" }}>
    //         <Box className={classes.item}>
    //           <Typography variant="h6">{surveyData.title}</Typography>
    //           <Divider variant="fullWidth" className={classes.divider} />
    //           <Typography variant="body1">
    //             {surveyData.description.length > 0
    //               ? surveyData.description
    //               : "No description provided"}
    //           </Typography>
    //         </Box>

    //         <Box style={{ marginBottom: "30px" }}>
    //           <ApplicationItem label="Links" value="" />
    //           {surveyData.links.map((link, index) => (
    //             <a
    //               href={link}
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               key={index}
    //             >
    //               {link}
    //             </a>
    //           ))}
    //         </Box>
    //         {surveyData.status === "Pending" && (
    //           <Actions
    //             position={isSmallScreen ? "center" : "start"}
    //             surveyData={surveyData}
    //             setLoading={setLoading}
    //             id={surveyData._id}
    //           />
    //         )}
    //       </Grid>
    //     </Grid>
    //   </Paper>
    // </Box>
  );
};

export default ApplicationDetail;
