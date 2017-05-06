import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from 'pages/App';

render(<App />, document.getElementById('app'));






/* Render template for router:
render(
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Homepage}></IndexRoute>
			<Route path="todos" component={Todos}></Route>
		</Route>
	</Router>, 
document.getElementById('app')); */