import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";

import { AuthContext } from "../context/auth-context";
import { useForm } from "../utils/hooks";
import { USER_LOGIN } from "../queries";

const Login = (props) => {
  const [errors, setErrors] = useState([]);
  const authCtx = useContext(AuthContext);
  let navigate = useNavigate();
  const loginUserCallback = () => {
    loginUser();
  };

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginUser] = useMutation(USER_LOGIN, {
    variables: { loginInput: values },
    update(client, { data: { loginUser: userData } }) {
      authCtx.login(userData);
      navigate("/");
    },
    onError({ graphQLError }) {
      setErrors(graphQLError);
    },
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Login</h3>
      <p>Login to account bellow</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField type="email" label="Email" name="email" onChange={onChange} />
        <TextField type="password" label="Password" name="password" onChange={onChange} />
      </Stack>
      {errors.map((err) => (
        <Alert key={err} severity="error">
          {err.message}
        </Alert>
      ))}
      <Button variant="contained" onClick={onSubmit}>
        Login
      </Button>
    </Container>
  );
};

export default Login;
