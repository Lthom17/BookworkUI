import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Register.css";
import "../styles/Login.css";
import { registerMember } from "../api/RegisterApi.js";
import { TextField, Grid, Button, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";

const options = {
  shouldForwardProp: (prop) => prop !== "fontColor",
};
const StyledTextField = styled(
  TextField,
  options
)(({ fontColor }) => ({
  input: {
    color: fontColor,
  },
}));

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    password: "",
  });

  const handleClickShowPassword = () => {
    setValues({ ...values });
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values });
    setShowPassword(false);
  };

  const history = useLocation();

  const handleLoginSubmit = async (submitValues) => {
    console.log("submit", submitValues);
    const response = await registerMember(submitValues);

    if (response.status === 201) {
      console.log("success");
      // M.toast({ html: 'Account Created, you may now login!', classes: 'rounded' });
      history.push("/login");
    } else if (response.status === 400) {
      const errors = await response.json();
      console.log(errors);
    } else if (response.status === 403) {
      console.log("Login failed.");
    } else {
      console.log("Unknown error.");
    }
  };

  return (
    <div className="bookContainer">
      <form className="form" onSubmit={handleSubmit(handleLoginSubmit)}>
        <div className="header">
          <h2>Register</h2>
        </div>
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
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Username"
              {...register("userName")}
              sx={{
                marginTop: 2,
                width: 300,
                "& fieldset": { border: "none" },
                "& input": { color: "#000" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Email"
              fullWidth
              {...register("email")}
              sx={{
                marginTop: 2,
                width: 300,
                "& fieldset": { border: "none" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="First Name"
              {...register("firstName")}
              sx={{
                marginTop: 2,
                width: 300,
                "& fieldset": { border: "none" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Last Name"
              {...register("lastName")}
              sx={{
                marginTop: 2,
                width: 300,
                "& fieldset": { border: "none" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Password"
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange("password")}
              {...register("password")}
              sx={{
                marginTop: 2,
                width: 300,
                "& fieldset": { border: "none" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ textDecoration: "underline" }}
                  >
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Button
            type="submit"
            sx={{
              margin: 10,
              width: 100,
              height: 46,
              backgroundColor: "#ffb74d",
              color: "black",
              marginLeft: 5,

              "&:hover": {
                backgroundColor: "#c9fbff",
              },
            }}
          >
            Submit
          </Button>
        </Grid>
      </form>
    </div>
  );
}
