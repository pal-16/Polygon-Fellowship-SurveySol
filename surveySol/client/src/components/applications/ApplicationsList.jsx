import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Button,
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  useMediaQuery
} from "@material-ui/core";
import {
  AccessTimeOutlined,
  CheckCircle,
  ClearOutlined,
  Add
} from "@material-ui/icons";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import Spinner from "../Spinner";
import { useAuthState } from "../../context/AuthContext";
import StatusChip from "./StatusChip";
import { getSurveys } from "../../actions/apiActions";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
    padding: "20px"
  },
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    width: "100%"
  },
  titleLink: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  root: {
    "&$selected": {
      backgroundColor: theme.palette.primary.main,
      color: "white"
    },
    "&$selected&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white"
    }
  },
  selected: {}
}));

const ApplicationsList = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { userID, token, userType } = useAuthState();
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    setLoading(true);
    getSurveys({}).then((res) => {
      if (res.error) {
        setLoading(false);
      } else {
        console.log(res.data);
        console.log(res.data.surveys);
        setApplications(res.data.surveys);
        setFilteredApplications(res.data.surveys);
        setLoading(false);
      }
    });
  }, [token, userID, userType]);

  useEffect(() => {

  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Box
      className={classes.container}
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
    >
      <Grid
        container
        spacing={2}
        style={{ width: "100%", marginBottom: "16px" }}
      >
        <Grid
          item
          xs={12}
          md={4}
          style={{ textAlign: isSmallScreen ? "center" : "left" }}
        >
          <Typography variant="h6">
            {"Surveys".toLocaleUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} style={{ textAlign: "center" }}>

          <Typography variant="h6">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                history.push("/student/applications/new");
              }}
              //  onClick={window.vjcoin.coinTransfer}
              startIcon={<Add />}
            >
              Create New Survey
            </Button>
          </Typography>

        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          style={{ textAlign: isSmallScreen ? "center" : "right" }}
        >
          <ToggleButtonGroup
            value={statusFilter}
            exclusive
            size="small"
            onChange={(event, status) => setStatusFilter(status)}
          >
            <ToggleButton
              value="All"
              classes={{ selected: classes.selected, root: classes.root }}
            >
              All
            </ToggleButton>
            <ToggleButton
              value="Pending"
              classes={{ selected: classes.selected, root: classes.root }}
            >
              <AccessTimeOutlined />
            </ToggleButton>
            <ToggleButton
              value="Accepted"
              classes={{ selected: classes.selected, root: classes.root }}
            >
              <CheckCircle />
            </ToggleButton>
            <ToggleButton
              value="Rejected"
              classes={{ selected: classes.selected, root: classes.root }}
            >
              <ClearOutlined />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" className={classes.divider} />
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>
                <Typography variant="h6">Name of survey</Typography>
              </TableCell>
              {!isSmallScreen && (
                <TableCell style={{ textAlign: "center" }}>
                  <Typography variant="h6">Survey Description</Typography>
                </TableCell>
              )}
              <TableCell style={{ textAlign: "center" }}>
                <Typography variant="h6">Survey Criteria</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications.map((application) => (
              <TableRow key={application._id}>
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  <Link
                    to={`/student/applications/${application._id}`}
                    className={classes.titleLink}
                  >
                    {application.title}
                  </Link>
                </TableCell>
                {!isSmallScreen && (
                  <TableCell
                    style={{ fontSize: "1.1rem", textAlign: "center" }}
                  >
                    {application.description}
                  </TableCell>
                )}
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {application.skills !== "" && <StatusChip status={application.skills} />}
                  {application.gender !== "" && <StatusChip status={application.gender} />}
                  {application.empstatus !== "" && <StatusChip status={application.empstatus} />}

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ApplicationsList;
