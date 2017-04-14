const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require('./userType');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
  	dummyField: {type: GraphQLID},//GQL requires at least one field type to run!
  	currentUser: {
  		type: UserType,
  		resolve(parentValue, args, req){
  			//if it can return req.user from passport, we know we're signed in correctly. Otherwise it will return undefined or null
  			return req.user;
  		}
  	}
  }
});

module.exports = RootQueryType;
