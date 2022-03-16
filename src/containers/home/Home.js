import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className='container'>
            <Link class='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
        </div>
);

export default Home;
