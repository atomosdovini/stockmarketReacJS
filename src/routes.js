import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// importar paginas do app
import Login from "./containers/login/Login";
import Signup from "./containers/signup/Signup";
import { Recommendations } from "./containers/recommendations/recommendations";
import { ImportExportFiles } from "./containers/import-export-files/import-export-files";
import { Settings } from "./containers/settings/settings";
import { Stocks } from "./containers/stocks/stocks";
import { StockDetails } from "./containers/stockDetails/stocksDetails";
import Activate from "./containers/activate/Activate";
import ResetPassword from "./containers/resetpassword/ResetPassword";
import ResetPasswordConfirm from "./containers/resetpassword/ResetPasswordConfirm";
import store from "./store";
import Layout from "./hooks/Layout";
import { LogsPage } from "./containers/logs/logsPage";
import NotFound from "./containers/notfound/NotFound";
import { PrivateRoute } from "./privateRoute";



const Routes = () => (
			<Provider store={store}>
				<Layout>
					<Switch>
					
						<PrivateRoute exact path="/signup" component={Signup} />
						<PrivateRoute exact path="/logs" component={LogsPage} />
						<PrivateRoute exact path="/recommendations" component={Recommendations} />
						<PrivateRoute exact path="/settings" component={Settings} />
						<PrivateRoute exact path="/import-export-files" component={ImportExportFiles} />
						<PrivateRoute exact path="/stocks" component={Stocks} />
						<PrivateRoute path="/stocks/:ticket" component={StockDetails} />						
						<Route exact path="/" component={Login} />
						<Route exact path="/reset-password" component={ResetPassword} />
						<Route exact path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirm} />
						<Route exact path="/activate/:uid/:token" component={Activate} />
						<Route component={NotFound}/>
					</Switch>
				</Layout>
			</Provider>
);

export default Routes;
