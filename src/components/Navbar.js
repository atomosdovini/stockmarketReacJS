import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { browserHistory } from 'react-router'; 
// import Button from './button/button';
import {} from './navbar.css'

const Navbar = ({ logout, isAuthenticated }) => {
    const [redirect, setRedirect] = useState(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
    };
    const logoutHandler =() => {
        logout();
        handleClose();
    };
    const loginHandler = () => {
        browserHistory.push('/');
        window.location.reload();
    }

    const signUpHandler = () => {
        browserHistory.push('/signup');
        window.location.reload();
    }

    const guestLinks = () => (
        <Fragment>
            <li className='nav-item'>
                <MenuItem onClick={logout_user}>Sair</MenuItem>
            </li>   
        </Fragment>
    );

    const authLinks = () => (
        <li className='nav-item'>
            <MenuItem onClick={logout_user}>Sair</MenuItem>
        </li>
    );
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
        <Fragment>
<div>
    <div style={{width:10,}}>
      <Button variant="contained" onClick={handleClick} style={{
          height:15,
          marginLeft:-15,
        }}>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          {isAuthenticated ? authLinks() : guestLinks()}
      </Menu>
    </div>
    </div>
    
            {redirect ? <Redirect to='/' /> : <Fragment></Fragment>}
        </Fragment>


    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);
