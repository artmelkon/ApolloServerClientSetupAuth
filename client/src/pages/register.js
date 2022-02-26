import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";
import { Folder, FolderOpen } from "@mui/icons-material";

import { AuthContext } from "../context/auth-context";
import { useForm } from "../utils/hooks";
import { USER_REGISTER } from "../queries";

const Register = (props) => {
  const [errors, setErrors] = useState([]);
  const authCtx = useContext(AuthContext);
  let navigate = useNavigate();
  const registerUserCallback = () => {
    // console.log("Callback hit");
    registerUser();
  };
  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser] = useMutation(USER_REGISTER, {
    variables: { registerInput: values },
    update(client, { data: { registerUser: userData } }) {
      authCtx.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Register</h3>
      <p>Create an account bellow</p>
      <Folder color="action" />
      <FolderOpen color="success" />
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="Username" name="username" onChange={onChange} />
        <TextField label="Email" name="email" onChange={onChange} />
        <TextField label="Password" name="password" onChange={onChange} />
        <TextField
          label="Confirm password"
          name="confirmPassword"
          onChange={onChange}
        />
      </Stack>
      {errors.map((err) => (
        <Alert key={err} severity="error">
          {err.message}
        </Alert>
      ))}
      <Button variant="contained" onClick={onSubmit}>
        Register
      </Button>
    </Container>
  );
};

export default Register;
