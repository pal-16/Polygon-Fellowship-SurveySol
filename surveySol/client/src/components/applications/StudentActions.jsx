import React, { useContext } from "react";
import { Box, Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { SnackbarContext } from "../../context/SnackbarContext";
import { useAuthState } from "../../context/AuthContext";

const StudentActions = (props) => {
  const { token } = useAuthState();
  const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
  const history = useHistory();

  const handleDelete = () => {
    props.setLoading(true);

  };
  return (
    <Box display="flex" justifyContent={props.position}>
      <Button
        variant="contained"
        style={{ backgroundColor: "#f44336", color: "white" }}
        startIcon={<Delete />}
        onClick={handleDelete}
      >
        Delete
      </Button>
    </Box>
  );
};

export default StudentActions;
