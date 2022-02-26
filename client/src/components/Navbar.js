import React, {Fragment, useContext} from 'react';
import {AppBar, Box, Toolbar, Typography, Button} from '@mui/material';
import {NavLink, useNavigate} from 'react-router-dom';

import {AuthContext} from '../context/auth-context';

const Navbar = (props) => {
  let navigate = useNavigate();
  const {user, logout} = useContext(AuthContext)
  const onLogout = () => {
    logout();
    navigate('/login')
  };

  console.log('user', user)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div">
            <NavLink to="/" style={{ textDecoration: "none", color: "#fff" }}>
              ReactAuth
            </NavLink>
          </Typography>
          <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
            {user ? (
              <Button
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  marginRight: "10px",
                }}
                onClick={onLogout}
              >
                Logo Out
              </Button>
            ) : (
              <Fragment>
                <NavLink
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    marginRight: "10px",
                  }}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Register
                </NavLink>
              </Fragment>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar
