import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import App from './components/app';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import Dashboard from './components/dashboard';
import requireAuth from './components/requireAuthHOC';


const networkInterface = createNetworkInterface({
	uri: 'graphql',
	opts: {
		credentials: 'same-origin'
	}
});

const client = new ApolloClient({
	networkInterface, //sends along cookies with queries, so GraphQL can see currentUser
	dataIdFromObject: o => o.id //remember, this lets ApolloClient keep track of every record in our database, so it can tell React to rerender whenever one of them changes!
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
	    <Router history={hashHistory}>
			<Route path='/' component={App}>
				<Route path='login' component={LoginForm} />
				<Route path='signup' component={SignupForm} />
				<Route path='dashboard' component={requireAuth(Dashboard)} />
			</Route>
	    </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
