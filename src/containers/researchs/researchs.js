// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import CSRFToken from '../../components/csrftoken/csrftoken';
// axios.defaults.withCredentials = true;

// const Researchs = props => {
//     const { styles, color } = props;
//     const [researchFormData, setResearchFormData] = useState({
//       name: '',
//       font: '',
//       active: true 
//     });
//     const [researchList, setResearchList] = useState([]);
//     const baseURL = "https://consense-djangoapi.herokuapp.com/research/";

//     const deleteResearch = id =>{
//       // delete research, depois apagar esta linha de baixo
//       const researchId = "2";
//       fetch(`${baseURL}${researchId}/`, {
//         method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
//         // mode: 'cors', // no-cors, *cors, same-origin
//         // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//         'Content-Type': 'application/json',
//         "X-CSRFToken": Cookies.get('csrftoken'),
//         'Authorization': 'JWT ' + localStorage.getItem('access')
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer',
//         connection: 'keep-alive', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     })
//     .then(response => response.json())
//     .then(data => {
//       // console.log(data);
//       }); 
//     };
//     const getResearch = id =>{
//       // get de so um research, depois apagar esta linha de baixo
//       const researchId = "2";
//       fetch(`${baseURL}${researchId}/`, {
//         method: 'GET', // *GET, POST, PUT, DELETE, etc.
//         // mode: 'cors', // no-cors, *cors, same-origin
//         // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//         'Content-Type': 'application/json',
//         "X-CSRFToken": Cookies.get('csrftoken'),
//         'Authorization': 'JWT ' + localStorage.getItem('access')
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer',
//         connection: 'keep-alive', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     })
//     .then(response => response.json())
//     .then(data => {
//       // console.log(data);
//       }); 
//     };
//     // handle submit requests to api
//     const onSubmitEdit = e => {
//       e.preventDefault();
//     const data = JSON.stringify({ researchFormData });
//     const researchId = "2";
//     fetch(`${baseURL}${researchId}/`, {
//       method: 'PUT', // *GET, POST, PUT, DELETE, etc.
//       // mode: 'cors', // no-cors, *cors, same-origin
//       // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//       'Content-Type': 'application/json',
//       "X-CSRFToken": Cookies.get('csrftoken'),
//       'Authorization': 'JWT ' + localStorage.getItem('access')
//       },
//       body: data,
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer',
//       connection: 'keep-alive', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//   })
//   .then(response => response.json())
//   .then(data => {
//     // console.log(data);
//     }); 
//     };

//     const onSubmit = e => {
//         e.preventDefault();
//         // add research
//         const data = JSON.stringify({ researchFormData });
//         fetch(`${baseURL}`, {
//           method: 'POST', // *GET, POST, PUT, DELETE, etc.
//           // mode: 'cors', // no-cors, *cors, same-origin
//           // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//           credentials: 'same-origin', // include, *same-origin, omit
//           headers: {
//           'Content-Type': 'application/json',
//           "X-CSRFToken": Cookies.get('csrftoken'),
//           'Authorization': 'JWT ' + localStorage.getItem('access')
//           },
//           body: data,
//           redirect: 'follow', // manual, *follow, error
//           referrerPolicy: 'no-referrer',
//           connection: 'keep-alive', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       })
//       .then(response => response.json())
//       .then(data => {
//         // console.log(data);
//         }); 
//         };
//     const onChange = (e) => {
//         setResearchFormData({ ...researchFormData, [e.target.name]: e.target.value });
//       };

//     useEffect(() => {    
//       // get all researchs  
//       fetch(`${baseURL}`, {
//         method: 'GET', // *GET, POST, PUT, DELETE, etc.
//         // mode: 'cors', // no-cors, *cors, same-origin
//         // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//         'Content-Type': 'application/json',
//         "X-CSRFToken": Cookies.get('csrftoken'),
//         'Authorization': 'JWT ' + localStorage.getItem('access')
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer',
//         connection: 'keep-alive', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     })
//     .then(response => response.json())
//     .then(data => {
//       // console.log(data.results);
//       }); 
//     }, [])
//     return (
//         <div> 
//               <div  id="form-wrapper">
//                  <form onSubmit={e => onSubmit(e)}  id="formAddResearch">
//                  <CSRFToken />
//                     <div className="flex-wrapper">
//                         <div style={{flex: 6}}>
//                             <input onChange={e => onChange(e)} className="form-control" id="name" type="text" name="name" placeholder="Add Instituição..." />
//                             <input onChange={e => onChange(e)} className="form-control" id="font" type="text" name="font" placeholder="Add Fonte.." />
//                          </div>
//                          <div style={{flex: 1}}>
//                             <input id="submit" className="btn btn-warning" type="submit" name="Add" />
//                           </div>
//                       </div>
//                 </form>

//                 <div>
//                 <h1>Edit</h1>
//                 <form onSubmit={e => onSubmitEdit(e)}  id="formEditResearch">
//                  <CSRFToken />
//                     <div className="flex-wrapper">
//                         <div style={{flex: 6}}>
//                             <input onChange={e => onChange(e)} className="form-control" id="nameEdit" type="text" name="name" placeholder="Add Instituição..." />
//                             <input onChange={e => onChange(e)} className="form-control" id="fontEdit" type="text" name="font" placeholder="Add Fonte.." />
//                          </div>
//                          <div style={{flex: 1}}>
//                             <input id="submitEdit" className="btn btn-warning" type="submit" name="Add" />
//                           </div>
//                       </div>
//                 </form>

//                 </div>

//               </div>
//         </div>
//     )
// }


// export default Researchs;