import React, {Fragment, useContext} from 'react';
import {Container} from '@mui/material';

import { AuthContext } from "../context/auth-context";

const HomePage = () => {
  const authCtx = useContext(AuthContext)
  return (
    <Container maxWidth="sm" spacing={2} style={{textAlign: 'center'}}>
      <h1>This is the homepage</h1>
      {authCtx.user ? (
        <div>Welcom {authCtx.user.email}</div>
      ) : (
        <div>Welcom to Home Page</div>
      )}
    </Container>
  );
}

export default HomePage;
