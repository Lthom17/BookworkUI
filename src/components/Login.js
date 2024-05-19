import { TextField, Box } from "@mui/material";
import { useAuth } from "../components/Context/UserContext";
import "../styles/Login.css";
import { useState } from "react";

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // TODO: VALIDATION
  // const [userNameError, setUsernameError] = useState('');
  // const [passwordError, setPasswordError] = useState('');

  const { handleLogin } = useAuth();

  function handleLoginSubmit(e) {
    e.preventDefault();

    handleLogin(userName, password);
  }

  return (
    <>
      <div className="page-label container">
        <h2 className="center-align">Login</h2>
      </div>

      <form className="login-form" onSubmit={handleLoginSubmit}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            label="Username"
            required
            value={userName}
            error={""}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              style: { backgroundColor: "white", marginBottom: "15px" },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            required
            value={password}
            error={""}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: "white",
                marginBottom: "15px",
                borderBottom: "none",
                padding: "10px",
              },
            }}
          />
        </Box>
        <div className="row">
          <button type="submit" className="btn submit right">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
