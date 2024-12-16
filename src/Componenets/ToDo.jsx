import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import PropTypes from "prop-types";

function ToDo({ todo, handleCheck, showDelete, showUpdate }) {
  function handleChecked() {
    handleCheck(todo.id);
  }

  function handleDeleteBtn() {
    showDelete(todo);
  }

  function handleShowUpdateDialog() {
    showUpdate(todo);
  }

  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
                onClick={handleChecked}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
                onClick={handleShowUpdateDialog}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>

              <IconButton
                className="iconButton"
                onClick={handleDeleteBtn}
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
ToDo.propTypes = {
  todo: PropTypes.object.isRequired,
  handleCheck: PropTypes.func.isRequired,
  showDelete: PropTypes.func.isRequired,
  showUpdate: PropTypes.func.isRequired,
};
export default ToDo;
