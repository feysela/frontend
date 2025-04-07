
import { NavLink, Outlet } from "react-router-dom";
import BreadCrumbs from "../../components/Breadcrumbs";
import MenuIcon from '@mui/icons-material/Menu';
// import { useContext, useState } from "react";
// import UserContext  from "../../context/UserContextProvider";
import { AppBar, Toolbar, Typography, InputBase, IconButton, Button, Box, Menu, MenuItem, MenuList } from '@mui/material';
import { Margin, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { setAuthHeader } from "../../serverRequest";
import { getUserId, setUserId } from "../../serverRequest";
import { getRoles } from "../../serverRequest";
import { Stack, TextField } from "@mui/material";
import MosqueOutlinedIcon from '@mui/icons-material/MosqueOutlined';
import './rootLayout.css';
import { useState, MouseEvent } from 'react';
import { Link } from "react-router-dom";

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
});
export default function RootLayout() {
  const navigate = useNavigate();
  const userData = window.localStorage.getItem('quraan_app_user_data');
  const userId = getUserId();
  const [anchorEl, setAnchorEl] = useState(null);
  const pages = ["Home", "Logout", "Help", "Register"];
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
  const roles = getRoles();
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
/*

   <AppBar position="fixed" elevation={0} sx={{ width: "80%", top:0, left:"10%"}} >
        <Toolbar
          variant="dense" disableGutters sx={{ minHeight: 15, height: 15, padding: 0}}
        >
          <IconButton size='small' edge='start' color='inherit' aria-label="logo">
            <MosqueOutlinedIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Knowledge is freedom
          </Typography>
          <TextField
              sx={{
                width: 300
              }}
              InputProps={{ sx: { height: 30, backgroundColor: "white" } }}
              placeholder="Search"
            />

          {/* <div sx={{ display: 'flex', alignItems: 'center' }}>
            <SearchIcon sx={{ mr: 1 }} /> */
{/* <TextField
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search' }}
        /> */}
{/* <TextField
              sx={{
                width: 300
              }}
              InputProps={{ sx: { height: 25, backgroundColor: "white" } }}
              placeholder="Search"
            />
          </div> */}

{/* Navigation Links */ }
//     <Stack direction='row' spacing={2}>
//       <Button color="inherit">Home</Button>
//       <Button color="inherit">Logout</Button>
//       <Button color="inherit">Help</Button>
//       <Button color="inherit">Register</Button>
//     </Stack>

//   </Toolbar>
// </AppBar>








// <div className='root-layout'>
{/* <header> */ }
{/* <nav className="nav-bar"> */ }
{/* <NavLink className="nav-element" to="/">Logo</NavLink> */ }
{/* <input className="nav-element searchBar" type="text" placeholder="Search for courses" name="search" onChange={handleChange} /> */ }
{/* <TextField id="standard-search" variant="standard" label="Search field" type="search" size="small"  maxRows={1} className="nav-element searchBar" /> */ }

{/* <NavLink to="/">Home</NavLink>
          {userInfo===null ||userInfo==="null" ||userInfo===undefined ? <NavLink to="login">Login</NavLink> :
            <NavLink to="/" onClick={() => {  
              setAuthHeader(null);
            window.localStorage.setItem('quraan_app_user_data', null);
              setUserId(null);
              navigate("/", { replace: true })

            }}>Logout</NavLink>}
          <NavLink to="about">About</NavLink>
          <NavLink to="help">Help</NavLink>
          <NavLink to="register">Register</NavLink> */}
{/* <Button color="inherit">Home</Button>
        <Button color="inherit">Logout</Button>
        <Button color="inherit">Help</Button>
        <Button color="inherit">Register</Button> */}
{/* </nav> */ }
{/* <BreadCrumbs />
      </header>
      <main>
        <Outlet />
      </main> */}
{/* </div> */ }
