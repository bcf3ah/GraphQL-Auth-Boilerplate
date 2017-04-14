const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString
} = graphql;
const UserType = require('./types/userType');
const AuthService = require('../services/auth');//now can access signup and login functions

const mutations = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		signup: {
			type: UserType,
			args: {
				email: {type: GraphQLString},
				password: {type: GraphQLString}
			},
			resolve(parentValue, {email, password}, req){
				//here is where we delegate authentication logic to external helper functions in auth.js!!
				// AuthService.signup({
				// 	email: email,
				// 	password: password,
				// 	req: req
				// }) OR USING ES6....
				return AuthService.signup({email, password, req});//returns a promise, so need the return keyword so GQL will wait till promise is resolved
			}
		},
		logout: {
			type: UserType,
			resolve(parentValue, args, req){
				const user = req.user; //need to save the user from Passport's req.user, because GQL expects a UserType to be returned!
				req.logout(); //the passport logout function
				return user;
			}
		},
		login: {
			type: UserType,
			args: {
				email: {type: GraphQLString},
				password: {type: GraphQLString}
			},
			resolve(parentValue, {email, password}, req){
				return AuthService.login({email, password, req});//returns a promise, so need the return keyword so GQL will wait till promise is resolved
			}
		}

	}
});

module.exports = mutations;