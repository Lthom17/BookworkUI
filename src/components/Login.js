import { TextField, Grid, Typography } from "@mui/material";
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
    <div className="container">
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <Grid
          container
          spacing={3}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            margin: 0,
          }}
        >
          <Typography variant="h2">Login</Typography>

          <Grid item xs={12} sx={{ border: "none" }}>
            <TextField
              fullWidth
              label="Username"
              required
              value={userName}
              error={""}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                width: 300,
                paddingLeft: 0,
                paddingRight: 2,
                marginBottom: 5,
                "& fieldset": { border: "none" },
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ border: "none" }}>
            <TextField
              fullWidth
              label="Password"
              required
              value={password}
              error={""}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                width: 300,
                paddingLeft: 0,
                paddingRight: 2,
                marginBottom: 15,
                "& fieldset": { border: "none" },
              }}
            />
          </Grid>
          <div>
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
        </Grid>
      </form>
    </div>
  );
}

export default Login;
