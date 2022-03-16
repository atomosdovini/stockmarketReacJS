import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { getCookie } from './getCookie';

export const fetchData = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await api.get(`/csrf_cookie/`,config);
        localStorage.setItem('X-CSRFToken', getCookie('csrftoken'));
    } catch (err) {
        var csrftoken = getCookie('csrftoken');
    }
    return csrftoken
   };

function CSRFToken() {
    var csrftoken = getCookie('csrftoken');

    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};
export default CSRFToken;
