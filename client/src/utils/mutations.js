import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
				email
			}
		}
	}
`;

export const CREATE_USER = gql`
	mutation userSignup($username: String!, $email: String!, $password: String!) {
		userSignup(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const SAVE_BOOK = gql`
	mutation saveBook($bookData: BookInput!) {
		saveBook(bookData: $bookData) {
			_id
			username
			email
			bookCount
			savedBooks {
				bookId
				authors
				description
				title
				image
				link
			}
		}
	}
`;

export const REMOVE_BOOK = gql`
	mutation removeBook($bookId: ID!) {
		removeBook(bookId: $bookId) {
			username
			savedBooks {
				bookId
				authors
				description
				title
				image
				link
			}
		}
	}
`;