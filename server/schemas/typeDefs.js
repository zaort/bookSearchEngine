const typeDefs = `
	type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
    bookCount: Int
	}
	type Book {
		bookId: ID!
		authors: [String]
		description: String
		title: String
		image: String
		link: String
	}
	type Auth {
		token: ID!
		user: User
	}
	input BookInput {
		bookId: ID!
		authors: [String]
		description: String
		title: String
		image: String
		link: String
	}
	type Query {
	me: User
	}
	type Mutation {
		loginUser(email: String!, password: String!): Auth
		signupUser(username: String!, email: String!, password: String!): Auth
		saveBook(bookData: BookInput!): User
		deleteBook(bookId: ID!): User
	}
`;
module.exports = typeDefs;