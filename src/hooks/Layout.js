import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import {} from './styles.css'
const Layout = ({ checkAuthenticated, load_user, children }) => {
    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);
    const initialResearchState = {
        id: null,
        name: "",
        font: "",
        active: true
    };
    const [inputText, setInputTest] = useState("");
    const [researchs, setResearchs] = useState(initialResearchState);
    return (

        <div>
            {children}
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);