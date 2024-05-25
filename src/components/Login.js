import { TextField, Grid, Typography } from "@mui/material";
import { useAuth } from "../components/Context/UserContext";
import "../styles/Login.css";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";
import { useForm } from "react-hook-form";

function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    password: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const handleClickShowPassword = () => {
    setValues({ ...values });
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    console.log(event.target.value);
    setValues({ ...values });
    setShowPassword(false);
  
  };

  // TODO: VALIDATION

  const { handleLogin } = useAuth();

  function handleLoginSubmit(values) {
    handleLogin(values.userName, values.password);
    reset();
  }

  return (
    <div className="formContainer">
      <form className="login-form" onSubmit={handleSubmit(handleLoginSubmit)}>
        <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            margin: 0,
          }}
        >
          <Grid item sx={{ alignItems: "center" }}>
            <Typography variant="h3">Login</Typography>
          </Grid>

          <Grid item xs={12} sx={{ border: "none" }}>
            <TextField
              fullWidth
              label="Username"
              required
              {...register("userName")}
              //error={""}
              sx={{
                width: 300,
                paddingRight: 2,
                margin: 5,
                "& fieldset": { border: "none" },
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ border: "none", paddingLeft: 0 }}>
            <TextField
              fullWidth
              label="Password"
              required
             // error={""}
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange("password")}
              {...register("password")}
              sx={{
                width: 300,
                marginBottom: 15,
                "& fieldset": { border: "none" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? (
                        <Visibility sx={{ textDecoration: "underline" }} />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid sx={{ marginTop: -10 }}>
            <button type="submit" className="submit">
              Submit
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Login;
