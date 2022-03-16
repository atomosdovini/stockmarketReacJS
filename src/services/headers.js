const token = localStorage.getItem("access");

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT ' + token
};

export default headers;