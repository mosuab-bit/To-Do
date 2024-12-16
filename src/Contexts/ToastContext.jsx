import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import MySnackBar from "../Componenets/MySnackBar";

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Done Successfully");
  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <ToastContext.Provider value={showHideToast}>
      <MySnackBar open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useToast = () => {
  return useContext(ToastContext);
};
