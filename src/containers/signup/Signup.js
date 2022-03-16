import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import Card from '@material-ui/core/Card';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Container from '../../components/container/container';
import TextField from '@material-ui/core/TextField';
import Button from '../../components/button/button';
import CardActions from '@material-ui/core/CardActions';
import { Header } from '../../components/Header/Header.js'
import { Sidebar } from '../../components/Sidebar/Sidebar.js';
import { message } from 'antd';
import { Layout } from 'antd';



const Signup = ({ signup }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, email, password, re_password);
            setAccountCreated(true);
        }
    };

    if (accountCreated) {
        // console.log(accountCreated)
        message.success(`Conta criada com Sucesso, verifique seu e-mail!`);
        return <Redirect to='/recommendations'/>
    
 }

    return (
<>
<Header />
<Layout 
      style={{
        width: "100%",
        maxWidth: "100%"
      }}>
     <Sidebar selectedKey={'4'} />
     <Layout style={{ background: "#ffffff"}}>


        <div style={{ minWidth: 290,
paddingTop:'1%',maxWidth:'230px', marginRight:'auto',marginLeft:'auto',minHeight:"400px", }}
            className='container'>

        <Card   variant="outlined">
        <Container styles='big-container'>
            <p style={{textAlign:'center', marginBottom:'35px',margin:'35px'}}>Cadastre um usuário para o sistema</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                <TextField id="outlined-basic"  
                        variant="outlined" 
                        label="Nome" 
                        size="small"
                        className='form-control'
                        type='text'
                        placeholder='First Name*'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                <TextField id="outlined-basic"  
                        variant="outlined" 
                        label="Sobrenome" 
                        size="small"
                        className='form-control'
                        type='text'
                        placeholder='Last Name*'
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                <TextField id="outlined-basic"  
                        variant="outlined" 
                        label="E-mail" 
                        size="small"
                        className='form-control'
                        type='email'
                        placeholder='Email*'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                <TextField id="outlined-basic"  
                        variant="outlined" 
                        label="Senha" 
                        size="small"   
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                <TextField id="outlined-basic"  
                        variant="outlined" 
                        label="Confirme sua senha" 
                        size="small"                        
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <CardActions className='card-action'>
                <Button styles="filed" type='submit'>Cadastrar usuário</Button>

                </CardActions>
            </form>
            </Container>
            </Card>
       
            <Card style={{marginTop:20,textAlign:'center',boxShadow:'unset', }} > 
                         <Link to='/recommendations'> Cancelar/Voltar</Link>

            </Card>
        </div>
        </Layout>
        </Layout>
        </> );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);













