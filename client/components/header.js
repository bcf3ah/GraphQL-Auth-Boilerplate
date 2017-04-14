import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import query from '../queries/currentUser';
import {Link} from 'react-router';
import logout from '../mutations/logout';

class Header extends Component {
	handleLogout(){
		this.props.mutate({
			refetchQueries: [{query}] //really query: query
		});
	}

	renderButtons(){
		const {loading, currentUser} = this.props.data;

		if(loading){return <div></div>};

		if(currentUser){
			return(
				<li>
					<a onClick={this.handleLogout.bind(this)}>Logout</a>
				</li>
			);
		} else {
			return(
				<div>
					<li>
						<Link to='/signup'>Signup</Link>
					</li>
					<li>
						<Link to='/login'>Login</Link>
					</li>
				</div>
			);
		}

	}
	render(){
		return(
			<nav>
				<div className='nav-wrapper blue'>
					<Link to='/' className='brand-logo'>Home</Link>
					<ul className='right'>
						{this.renderButtons()}
					</ul>
				</div>
			</nav>
		);
	}
};



export default graphql(logout)(
	graphql(query)(Header)
);