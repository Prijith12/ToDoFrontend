import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

function Header() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      setLoggedIn(true);
      setUserName(user.name);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    setAnchorEl(null);
    window.location.reload();
  };

  return (
    <div className='bg-gradient-to-br from-purple-300 to-indigo-600 flex justify-between items-end'>
      <h1 className="text-center text-white text-xl font-bold py-8">PriTechSolutions TODO</h1>
      <div className='mr-4 mb-4'>
        <AppBar position="static">
          <Toolbar>
            {isLoggedIn ? (
              <div>
                <Button color="inherit" startIcon={<AccountCircle />} onClick={handleMenuOpen}>
                  {userName}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button color="inherit" >
                <Link to="/login" className="text-white">SignIn</Link>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}

export default Header;
