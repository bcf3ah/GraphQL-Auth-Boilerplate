import React, {Component} from 'react';
import AuthForm from './authForm';
import {graphql} from 'react-apollo';
import signup from '../mutations/signup';
import currentUserQuery from '../queries/currentUser';
import {hashHistory} from 'react-router';

class SignupForm extends Component {
	constructor(props){
		super(props);
		this.state={errors: []};
	}

	componentWillUpdate(nextProps){
		//this.props is current props. nextProps is the props we'll have after rerendering
		if(!this.props.data.currentUser && nextProps.data.currentUser){
			hashHistory.push('/dashboard');
		}
	}
		
	onSignup({email, password}){ //so need to pass on object that contains an email and password property
		this.props.mutate({
			variables: {
				email: email,
				password: password
			},
			refetchQueries: [{query: currentUserQuery}]
		}).catch(res=>{
			const errors = res.graphQLErrors.map(error=>error.message); //creates an array of all the errors graphQL encounters if login is invalid, like 'invalid credentials'. We'll save this to the component's state, which we'll initialize as an empty array, then pass it down to AuthForm so it can disaply the errors if the user fucks things up somehow on login. So...
			this.setState({errors});
		});
	}

	render(){
		return (
			<div>
				<h3>Signup</h3>
				<AuthForm onSubmit={this.onSignup.bind(this)} errors={this.state.errors}/>
			</div>
		);
	}
};

export default graphql(currentUserQuery)(
	graphql(signup)(SignupForm)
);