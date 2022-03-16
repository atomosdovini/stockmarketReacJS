import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../../actions/auth';
import Container from '../../components/container/container';
import Logo from '../../components/logo/logo';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '../../components/button/button';
import CardActions from '@material-ui/core/CardActions';
// import { csrfToken } from "../../actions/auth";
import CSRFToken from "../../components/csrftoken/csrftoken";
import {} from "./styles.css";
const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);

    };

    if (requestSent) {
        return <Redirect to='/' />
    }

    return (
        <div style={{ minWidth: 290,
            paddingTop:'5%',maxWidth:'230px', marginRight:'auto',marginLeft:'auto',minHeight:"400px", }}
                        className='container'>
                    <Card   variant="outlined">
                    <Container styles='big-container'>
                    <Logo styles='logo'></Logo>
        <div >
            <h3  style={{textAlign:'center', marginBottom:'0px'}}>Problemas para entrar?</h3>
            <p style={{textAlign:'center', marginBottom:'30px', fontSize:'12px'}}>Insira o seu email e enviaremos um link para você voltar a acessar a sua conta.</p>

            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                <TextField id="outlined-basic"  
                        variant="outlined" 
                        label="E-mail"
                        size='small'
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <CardActions className='card-action'>
                <Button className="btn-reset" type='submit'>Enviar link para login</Button>
                <CSRFToken />
 
</CardActions>
            </form>
        </div>
        </Container>
        </Card>
        <Card style={{marginTop:20,textAlign:'center' }} variant="outlined"> 
                    <Container styles='big-container'>
                        <Link to='/'> Conecte-se</Link>

                    </Container>


            </Card>
        </div>
    );
};

export default connect(null, { reset_password })(ResetPassword);
