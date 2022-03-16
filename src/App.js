import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

const App = (props) => 
	<BrowserRouter {...props}>
		<Routes />
	</BrowserRouter>
	;
export default App;
