// use state pra pegar valor no componente
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import {
	TextField,
	Card,
	CardActions,
} from "@material-ui/core";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import {} from "./styles.css";
import Button from "../../components/button/button";
import Container from "../../components/container/container";
import Logo from "../../components/logo/logo";
import CSRFToken from "../../components/csrftoken/csrftoken";
import { api } from "../../services/api";

 




const useStyles = makeStyles({
	root: {},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 0,
	},
});

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const classes = useStyles();
	const { email, password } = formData;
	// para colocar o valor novo na variavel quando mudar o componnete
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		// axios pra logar do actions
		login(email, password);
		// csrfToken();
	};

	if (isAuthenticated) {
		// console.log(isAuthenticated);
		return <Redirect to="/recommendations" />;
	}

	return (
		<div>
			<div
				style={{
					minWidth: 290,
					paddingTop: "5%",
					maxWidth: "230px",
					marginRight: "auto",
					marginLeft: "auto",
					minHeight:"400px",
				}}
				className="container"
			>
				<form onSubmit={(e) => onSubmit(e)}>
					<Card variant="outlined">
						<Container styles="big-container">
							<Logo styles="logo"></Logo>

							<p
								style={{ textAlign: "center", marginBottom: "35px" }}
								color="secondary"
							>
								Insira suas credenciais para entrar
							</p>

							<div className="form-group">
								<TextField
									id="outlined-basic"
									variant="outlined"
									label="Email"
									className="form-control"
									type="email"
									placeholder="Email"
									name="email"
									value={email}
									size="small"
									onChange={(e) => onChange(e)}
									required
								/>
							</div>
							<div className="form-group">
								<TextField
									id="outlined-basic"
									variant="outlined"
									label="Senha"
									className="form-control"
									type="password"
									placeholder="Senha"
									name="password"
									value={password}
									size="small"
									onChange={(e) => onChange(e)}
									minLength="6"
									required
								/>
							</div>
							<div className='wrapper' >
							<CardActions className="card-action">
								<Button styles='primary' type="submit">
									Entrar
								</Button>
							</CardActions>

							<Container className='wrapper-reset' >
								<Link to="/reset-password">Esqueceu sua senha?</Link>
							</Container>
							</div>

						</Container>
					</Card>
					{/* <Card style={{ marginTop: 20 }} variant="outlined">
						<Container styles="big-container">
							Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
						</Container>
					</Card> */}
									<CSRFToken />

				</form>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
