import Snackbar from "@mui/material/Snackbar";
import PropTypes from "prop-types";
export default function MySnackBar({ open, message }) {
  return (
    <div>
      <Snackbar
        open={open}
        ContentProps={{
          style: {
            color: "white",
            background: "rgb(11, 152, 77)",
          },
        }}
        autoHideDuration={6000}
        message={message}
      />
    </div>
  );
}
MySnackBar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};
