import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Register.css";
import "../styles/Login.css";
import { registerMember } from "../api/RegisterApi.js";
import { TextField, Grid, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";
import { joiResolver } from "@hookform/resolvers/joi";
import { schema } from '../validation/formValidation.js'



export default function Register() {
  const { register, handleSubmit, formState } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      userName: null,
      email: null,
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const { errors } = formState;

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
              error={errors.userName}
              sx={{
                marginTop: 2,
                width: 300,
                "& fieldset": { border: "none" },
                "& input": { color: "#000" },
              }}
            />
            {errors?.userName && (
              <p style={{ fontSize: 10, color: "#d32f2f" }}>
                {errors?.userName?.message}
              </p>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Email"
              fullWidth
              error={errors.email}
              {...register("email")}
              sx={{
                marginTop: 2,
                width: 300,
                "& fieldset": { border: "none" },
              }}
            />
            {errors?.email && (
              <p
                style={{ fontSize: 10, color: "#d32f2f" }}
              >{`${errors?.email?.message}`}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="First Name"
              error={errors.firstName}
              {...register("firstName")}
              sx={{
                marginTop: 2,
                width: 300,
                "& fieldset": { border: "none" },
              }}
            />
            {errors?.firstName && (
              <p
                style={{ fontSize: 10, color: "#d32f2f" }}
              >{`${errors?.firstName?.message}`}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Last Name"
              error={errors.lastName}
              {...register("lastName")}
              sx={{
                marginTop: 2,
                width: 300,
                "& fieldset": { border: "none" },
              }}
            />
            {errors?.lastName && (
              <p
                style={{ fontSize: 10, color: "#d32f2f" }}
              >{`${errors?.lastName?.message}`}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            {/* Password should be 8 characters long, should have 1 upper case and 1
            lower case, 1 number and 1 special character */}
            <TextField
              required
              label="Password"
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange("password")}
              error={errors.password}
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
            {errors?.password && (
              <p
                style={{ fontSize: 10, color: "#d32f2f" }}
              >{`${errors?.password?.message}`}</p>
            )}
          </Grid>
          <Button
            type="submit"
            sx={{
              margin: "40px 0",
              width: 80,
              height: 40,
              backgroundColor: "#ffb74d",
              color: "black",
              "&:hover": {
                backgroundColor: "#2ab7a9",
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
