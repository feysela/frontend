
import {  Outlet } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Menu, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { setAuthHeader } from "../../serverRequest";
import { getUserId, setUserId } from "../../serverRequest";
import { TextField } from "@mui/material";
import MosqueOutlinedIcon from '@mui/icons-material/MosqueOutlined';
import './rootLayout.css';
import { useState } from 'react';
import { Link } from "react-router-dom";

export default function RootLayout() {
  const navigate = useNavigate();
  const userData = window.localStorage.getItem('quraan_app_user_data');
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const closeMenu = () => {
    setAnchorEl(null);
  }
  const [searchValue, SetSearchValue] = useState("");
  const handleChange = (event) => {
    SetSearchValue(event.target.value);
  };
  console.log("userData");
  console.log(userData);
  let userInfo = userData;

  return (
    <div >
      <AppBar position="static" sx={{ padding: 0, marginBottom: 0.75 }} elevation={0}>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label="logo" sx={{ display: { xs: 'none', md: 'flex' } }} >
            <MosqueOutlinedIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            Knowledge is freedom
          </Typography>
          <Box sx={{ display: { xs: 'nonew', md: 'flex' } }}>
            <TextField sx={{ width: 300 }} InputProps={{ sx: { height: 30, backgroundColor: "white" } }} placeholder="Search" onChange={handleChange} />
            <Button color="inherit" disableRipple disableTouchRipple component={Link} to="/">Home</Button>
            {userInfo === null || userInfo === "null" || userInfo === undefined ? <Button component={Link} color="inherit" to="login">Login</Button> :
              <Button component={Link} color="inherit" to="/" onClick={() => {
                setAuthHeader(null);
                window.localStorage.setItem('quraan_app_user_data', null);
                setUserId(null);
                navigate("/", { replace: true })

              }}>Logout</Button>}
            <Button color="inherit" disableRipple disableTouchRipple component={Link} to="help">Help</Button>
            <Button color="inherit" disableRipple disableTouchRipple component={Link} to="register">Register</Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size='large' edge="start" color='inherit'
              onClick={openMenu}
              aria-controls={Boolean(anchorEl) ? "hamburger-menu" : undefined}
              aria-haspopup='true'
              aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
              id="hamburger-menu">
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}
              onClose={closeMenu} sx={{ display: { xs: 'flex', md: 'none' } }}
              MenuListProps={
                { 'aria-labelledby': 'hamburger-menu' }
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >

              <MenuItem onClick={closeMenu} component={Link} to="/">Home</MenuItem>
              {userInfo === null || userInfo === "null" || userInfo === undefined ?
                <MenuItem component={Link} onClick={closeMenu} to="login">Login</MenuItem> :
                <MenuItem component={Link} to="/" onClick={() => {
                  closeMenu();
                  setAuthHeader(null);
                  window.localStorage.setItem('quraan_app_user_data', null);
                  setUserId(null);
                  navigate("/", { replace: true })

                }}>Logout</MenuItem>}
              <MenuItem onClick={closeMenu} component={Link} to="help">Help</MenuItem>
              <MenuItem onClick={closeMenu} component={Link} to="register">Register</MenuItem>

            </Menu>
            <IconButton size='large' edge='start' color='inherit' aria-label="logo" sx={{ display: { xs: 'flex', md: 'none' } }} >
              <MosqueOutlinedIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            Knowledge is freedom
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet context={[searchValue, SetSearchValue]} />
    </div>
  );
}
