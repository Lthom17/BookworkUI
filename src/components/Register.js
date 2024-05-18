import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import M from "materialize-css";
import "../styles/Register.css";
import "../styles/Login.css";
import { registerMember } from "../api/RegisterApi.js";
import { TextField, Grid, Button } from "@mui/material";
import { useForm } from "react-hook-form"
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility.js';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff.js';

export default function Register() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(
        {
            defaultValues: {
                userName: "",
                email: "",
                firstName: "",
                lastName: "",
                password: "",

        }}

    );

    const [showPassword, setShowPassword] = useState(false);

    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: event.target.value,
        });
    };


    const history = useLocation();

    const handleLoginSubmit = async (submitValues) => {
        console.log('submit', submitValues);
        const response = await registerMember(submitValues);

        if (response.status === 201) {
            console.log("success")
            M.toast({ html: 'Account Created, you may now login!', classes: 'rounded' });
            history.push("/login");
        } else if (response.status === 400) {
            const errors = await response.json();
            console.log(errors)
        } else if (response.status === 403) {
            console.log("Login failed.");
        } else {
            console.log("Unknown error.");
        }
    }


    return (
        <div>
            <div className="page-label">
                    <h2 className="center-align">Register</h2>
                </div>
            <form onSubmit={handleSubmit(handleLoginSubmit)} className="form">
                
                <Grid id="myContainer" container
                      spacing={3}
                      direction="column"
                      justifyContent="space-around"
                    alignItems="center"
                    sx={{
                        border: '1px solid #000',
                        borderRadius: 15,
                    }}
                
                >
                        <Grid item xs={6}>
                            <TextField
                                required
                            label="Username"
                            {...register("userName")}
                            />
                    </Grid>
                    <Grid item xs={6}>
                            <TextField
                                required
                            label="Email"
                            {...register("email")}
                            />
                    </Grid>
                    <Grid item xs={6}>
                            <TextField
                                required
                            label="First Name"
                            {...register("firstName")}
                            />
                    </Grid>
                    <Grid item xs={6}>
                            <TextField
                                required
                            label="Last Name"
                            {...register("lastName")}
                            />
                    </Grid>
                     <Grid item xs={6}>
                            <TextField
                            required
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            onChange={handlePasswordChange("password")}
                            {...register("password")}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
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
                            }}
                            />
                    </Grid>
                    <Button type="submit"
                        sx={{
                            backgroundColor: '#ffb74d',
                            color: 'black',
                            marginTop: 10
                        }}>Submit</Button>
                    </Grid>    
            </form>
            </div>
    )
};
