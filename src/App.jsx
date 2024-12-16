import ToDoList from "./Componenets/ToDoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { ToastProvider } from "./Contexts/ToastContext";
const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgb(20, 20, 109)",
            height: "100vh",
          }}
        >
          <ToDoList />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
